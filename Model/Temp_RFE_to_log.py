import pandas as pd
import numpy as np;
#suppers warnings 
import warnings
from statistics import mean
warnings.filterwarnings("ignore")
DEBUG=False;
#_________________________DEF______________________________
#from:https://stackoverflow.com/questions/53620178/how-to-add-values-to-an-existing-dictionary-key-without-replacing-the-previous-v
# need so i can add things togther( ie team data to itsself)
def append_items_to_dict(d_in: dict, d_out: dict):
    for k, v in d_in.items():
        d_out.setdefault(k, []).append(v)

###_______________________________MAIN_______________________________________________
def Main_RFE_to_logreg():
    year=['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
    data_from_team_each_year= {};
    #skipped teams or conf 
    s=[];
    xls = pd.ExcelFile('NCAAstats.xls');
    for X in range(len(year)):
        data = pd.read_excel(xls, year[X]);
        for i in range(len(data['Conf'].unique())):
             # key for the dic to find later
            KEY  = year[X] + data['Conf'].unique()[i];
            if DEBUG:
                 print('KEY: ',KEY);
            #gets only conf
            data_for_CMC = data.loc[data['Conf'] == (data['Conf'].unique()[i])];
            holder_for_teams = data_for_CMC.copy();
            #data pep for CM, ##and need to drop ranking stats###
            data_for_CMC = data_for_CMC.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3','Pyth Rank', 'Opp Pyth Rank'], axis=1)
            # CM for conf by year
            #print(data_for_CMC)
            from RFE import RandForestClass;
            # note: need one more then you think ( so want 20 give 21)
            top_20_list_of_features_from_CMC = RandForestClass(data_for_CMC);
            #print(top_20_list_of_features_from_CMC);
            top_20_list_of_features_from_CMC = list(top_20_list_of_features_from_CMC)
            #print(top_20_list_of_features_from_CMC);
            #data prep for CMC for each team
            if "Act W %" in top_20_list_of_features_from_CMC:
                #1)does not need "Act W %" in x , remove updates the list for you....
                top_20_list_of_features_from_CMC.remove("Act W %");
            if DEBUG :
                print('data_for_CM.shape: ',data_for_CMC.shape);
                print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
            #then by team
    #_________________THIS IS WEHRE THE CHANGES ARE________________________________
    # builds a table to read from later
            # have to add "Act W %" to the table need to call it later
            top_20_list_of_features_from_CMC.append("Act W %");
            # getting team by team stats for the year.
            for j in range(len(holder_for_teams['Team'].unique())):
                # temp dic for addign things to them self( hopefully)
                temp={}
                Team_data = holder_for_teams.loc[holder_for_teams['Team'] == (holder_for_teams['Team'].unique()[j])];
                # key for the dic to find later
                KEY  = holder_for_teams['Team'].unique()[j];
                # the things saveing the data
                # only gets the data from feature selection
                temp[KEY] = Team_data[top_20_list_of_features_from_CMC]
                append_items_to_dict(temp,data_from_team_each_year);
            #just to be safe to clear list
            top_20_list_of_features_from_CMC.clear();
    ############___________________________________________________________________________________________##########################
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
    # go in and add data per year by .columns ,  just add no need to check just add
    # this is for the year ,0 =2005 , 1 =2006 .....and so on . b/c its a pandas list
    iloc_year = [0]

    for X in range(len(year)):
        data = pd.read_excel(xls, year[X])
        for i in range(len(data['Conf'].unique())):
            # the indy is not in data_from_team_each_year at all so teams are "lost"( match power ranking  later)
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
                print("conf",b0);
                print("bs's",bs);
                print("both?",np.append(b0,bs));
            #low_accuracy_teams.append(team_for_log);
            #puts b0 and bs toghter.
            both = np.append(b0,bs)
            team_weights[team_for_log] = both;
            # keeps track of the models accuracy arcoss all teams 
            over_all_accuracy.append(Accuracy);
            #print(Accuracy,weights);
        except ValueError:
            s.append(team_for_log);
            
    #________________________________________________
    if DEBUG:
        # teams that that have not had a 'good' year for the last 14 years 
        print("s",s);
        print("len",len(s));
        #print('low_accuracy_teams',low_accuracy_teams);
        #print('lenlow_accuracy_teams',len(low_accuracy_teams));
        print("mean(accuracy)",mean(over_all_accuracy));
        print("len(team_weights)",len(team_weights));
        print("team_weights",team_weights);
    print("mean(accuracy) CM",mean(over_all_accuracy));
    return team_weights,data_from_team_each_year

Main_RFE_to_logreg()
