
# BIG NOTE: only import what you need else it pulls variles too
import pandas as pd;
#if full pd list is need uncommet
#pd.set_option("display.max_rows", None, "display.max_columns", None);
import numpy as np;
import random
DEBUG=False;
#suppers warnings 
import warnings
warnings.filterwarnings("ignore")
from statistics import mean
#_________________________DEF______________________________
#from:https://stackoverflow.com/questions/53620178/how-to-add-values-to-an-existing-dictionary-key-without-replacing-the-previous-v
# need so i can add things togther( ie team data to itsself)
def append_items_to_dict(d_in: dict, d_out: dict):
    for k, v in d_in.items():
        d_out.setdefault(k, []).append(v)

#___________________________________________________________
# going by year
def Main_FRRF_to_FSBE_to_logreg():
    year=['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
    data_from_team_each_year= {};
    s=[];
    #read file 
    xls = pd.ExcelFile('NCAAstats.xls');
    for X in range(len(year)):
        data = pd.read_excel(xls, year[X]);
        if DEBUG:
            print("year[X]:",year[X]);
        #data prep
        #drops names from data 
        data_for_RF = data.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3','Pyth Rank', 'Opp Pyth Rank'], axis=1)
        from Feature_Reducing_Random_Forest import FRRR;
        top_40_list_of_features_from_RF = FRRR(40,data_for_RF,data_for_RF["Act W %"]);


        if DEBUG :
            print('top_40_list_of_features_from_RF\n',top_40_list_of_features_from_RF);
            print('len(data[Conf].unique())',len(data['Conf'].unique()))

        # goes by Conf
        for i in range(len(data['Conf'].unique())):
            
            #gets only conf by :{data['Conf'].unique()[i]}
            data_for_BE = data.loc[data['Conf'] == (data['Conf'].unique()[i])];
            holder_for_teams = data_for_BE.copy();

            #For BE , needs at least 8 teams 
            if data_for_BE.shape[0] <=8 :
                if DEBUG:
                    print('data_for_BE.shape',data_for_BE.shape);
                    print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
                    print('skipped',skipped);
                s.append((data['Conf'].unique()[i]+year[X]+'{needs more teams}; '));
                continue;

            #data prep.
            # drops names from data
            #ata_for_BE = data_for_BE.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank'], axis=1)


            if DEBUG :
                print('data_for_BE.shape',data_for_BE.shape);
                print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
                print('skipped',skipped);
                print('len(top_40_list_of_features_from_RF)\n',len(top_40_list_of_features_from_RF));
                print('data_for_BE[top_40_list_of_features_from_RF]\n',data_for_BE[top_40_list_of_features_from_RF]);
                print("data_for_BE[top_40_list_of_features_from_RF].shape\n",data_for_BE[top_40_list_of_features_from_RF].shape);
                
            #data prep for FSBL for each team
            if "Act W %" in top_40_list_of_features_from_RF:
                #1)does not need "Act W %" in x , remove updates the list for you....
                top_40_list_of_features_from_RF.remove("Act W %");
            # so the FSBL dos not remove 6 at a time
            temp=[];
            temp=top_40_list_of_features_from_RF.copy();
            from Feature_Secltion_Backward_Elimination import FSBL;
            top_12_list_of_features_from_BE = FSBL(data_for_BE[top_40_list_of_features_from_RF],data_for_BE["Act W %"],8,temp);
            if DEBUG:
                print('top_40_list_of_features_from_RF\n',top_40_list_of_features_from_RF);
                print('top_12_list_of_features_from_BE: ',top_12_list_of_features_from_BE);
            
            #data prep for Table for each team
            if "Act W %" in top_40_list_of_features_from_RF:
                #1)does not need "Act W %" in x , remove updates the list for you....
                top_12_list_of_features_from_BE.remove("Act W %");

            
    #_________________THIS IS WEHRE THE CHANGES ARE________________________________
    # builds a table to read from later
            # have to add "Act W %" to the table need to call it later
            top_12_list_of_features_from_BE.append("Act W %");
            # getting team by team stats for the year.
            for j in range(len(holder_for_teams['Team'].unique())):
                # temp dic for addign things to them self( hopefully)
                temp={}
                Team_data = holder_for_teams.loc[holder_for_teams['Team'] == (holder_for_teams['Team'].unique()[j])];
                # key for the dic to find later
                KEY  = holder_for_teams['Team'].unique()[j];
                # the things saveing the data
                # only gets the data from feature selection
                temp[KEY] = Team_data[top_12_list_of_features_from_BE]
                append_items_to_dict(temp,data_from_team_each_year);


                if DEBUG:
                    #gives 3 years of data for testing
                    if year[X] == '2007':
                        print("data_from_team_each_year.keys()\n ",data_from_team_each_year.keys());
                        print("len(data_from_team_each_year.keys()): ",len(data_from_team_each_year.keys()));
                        # note: data_from_team_each_year['{team}'][0] , can get each year b/c its a {pandas.core.frame.DataFrame}
                        print("pd type",type(Team_data));
                        # the {0} goes by going year by year.
                        print('type',type(data_from_team_each_year['Air Force'][0]));
                        print("data_from_team_each_year['Air Force'][0].columns\n ",data_from_team_each_year['Air Force'][0].columns);
                      
            #just in case( resets each conf)
            top_12_list_of_features_from_BE.clear();
        #just in case this does not clear ( resets for each year)
        top_40_list_of_features_from_RF.clear();
    ######################___________________________CLEANING UP THE TABLE__________________________________####################################
    # have to do data clean up , get all data from each year and filling in data
    for keys in data_from_team_each_year.keys():
        # setting up for concating
        updaed_tablevalue=data_from_team_each_year[keys][0];
        for T in range(1,len(data_from_team_each_year[keys])):
            temp = data_from_team_each_year[keys][T];
            #print("T ,temp: ",T,temp.values[0]);
            # needs to be a pandas list for the append to work
            updaed_tablevalue = updaed_tablevalue.append(pd.Series(temp.values[0],index=temp.columns),ignore_index=True,sort=False); #= pd.concat([temp,updaed_tablevalue], axis=1, sort=False);
        data_from_team_each_year[keys] = updaed_tablevalue
        if DEBUG:
            print('key:',keys);
            print("after clean up  : data_from_team_each_year[keys]\n ",data_from_team_each_year[keys]);
            print("after clean up  : data_from_team_each_year[keys].colums\n ",data_from_team_each_year[keys].columns);
    #_________________
    # go in and add data per year by .columns ,  just add no need to check just add
    # this is for the year ,0 =2005 , 1 =2006 .....and so on . b/c its a pandas list
    iloc_year = [0]

    for X in range(len(year)):
        data = pd.read_excel(xls, year[X])
        for i in range(len(data['Conf'].unique())):
            # the indy is not in data_from_team_each_year at all so teams are "lost"( match power ranking later)
            if (data['Conf'].unique()[i]) == 'Indy':
                continue;
            data_for_C = data.loc[data['Conf'] == (data['Conf'].unique()[i])];
            for j in range(len(data_for_C['Team'].unique())):
                team=data_for_C['Team'].unique()[j]
                #all the data 
                Team_data = data_for_C.loc[data_for_C['Team'] == (team)];
                # gets a list of what we need to grab
                list_for_team = data_from_team_each_year[team].columns;
                # is not in list = NaN b/c pandas 
                cleaned_data = Team_data.reindex(columns=list_for_team);
                # need to change label to right thing in cleaned_data. ie change it ot the year not the team {number}
                cleaned_data.index = iloc_year;
                #updateing the dic
                data_from_team_each_year[team].update(cleaned_data);
        #this is so the year is keeps right
        iloc_year[0] +=1 ;
    ###############################_____________END OF CLEAING_________________#####################
    #dic for weights need for eqution
    team_weights = {};
    over_all_accuracy = [];
    # skipped team either never had a winnign year or played to good and had no loseing year.
    s=[];
    #low Accuracy teams
    #low_accuracy_teams=[];
    for team_for_log in data_from_team_each_year.keys():
        if DEBUG:
            print("team_for_log",team_for_log);
            #print("data_from_team_each_year[team_for_log]\n",data_from_team_each_year[team_for_log]);
            #print("data_from_team_each_year[team_for_log].loc[:, data_from_team_each_year[team_for_log].columns == Act W % ]\n",data_from_team_each_year[team_for_log].loc[:, data_from_team_each_year[team_for_log].columns == "Act W %" ]);
        # what to get Accuracy from all teams and get avg 
        # logreg
        from Log_reg import LR
        try:
            # bs is b's ie b1,b2,b3....
            b0,bs,Accuracy = LR(data_from_team_each_year[team_for_log].drop("Act W %",axis=1), data_from_team_each_year[team_for_log].loc[:, data_from_team_each_year[team_for_log].columns == "Act W %" ],team_for_log);
            # note weights does not have name , names are 'stored" here :data_from_team_each_year[team].columns
            if DEBUG:
                print("Accuracy",Accuracy);
                print("weights",b0);
                print("b1",bs);
                #exit();
            
            #low_accuracy_teams.append(team_for_log);
            #puts b0 and bs toghter.
            both = np.append(b0,bs)
            team_weights[team_for_log] = both;
             # keeps track of the models accuracy arcoss all teams 
            over_all_accuracy.append(Accuracy);
        except ValueError:
            s.append(team_for_log);
            
    #________________________________________________
    # teams that that have not had a 'good' year for the last 14 years
    if DEBUG:
        #and that did not have enough teams for the FSBE
        print("s",s);
        print("len",len(s));
        #print('low_accuracy_teams',low_accuracy_teams);
        #print('lenlow_accuracy_teams',len(low_accuracy_teams));
        print("mean(accuracy)",mean(over_all_accuracy));
        print("len(team_weights)",len(team_weights));
        print("team_weights",team_weights);
    print("mean(accuracy) FSBE",mean(over_all_accuracy));
    return team_weights,data_from_team_each_year
