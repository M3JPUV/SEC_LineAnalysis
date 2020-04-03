#steps
#1) get data from mySQL( atm data sheet)
#1.5) get each conf and team too loop
       #1.5) note cnat do by tem data is too close to one other 
'''
    print(data['Conf'].unique());
    data = data.loc[data['Conf'] == 'SEC'];
    print(len(data['Team'].unique()));
'''
#2) reduce by RF(NCAA)
#3) get top 20 from secltion (conf)
#4) get weights from MLE(can only take 12) (team)
#5) get out from 4 realy for model : dict?
DEBUG =False;
#______________________________________________________________
import random
#6)
year=['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
weights_from_each_year = {};
for X in range(len(year)):
    #1)
    import pandas as pd
    xls = pd.ExcelFile('NCAAstats.xls');
    data = pd.read_excel(xls, year[X]);
    #pd.read_csv('NCAAstats05.csv');
    #pd.read_excel(xls, 'Sheet1');
    if DEBUG:
        #if full pd list is need uncommet
        #pd.set_option("display.max_rows", None, "display.max_columns", None);
        print("year[X]:",year[X]);
    #2){works}
    #data prep
    #drops names from data 
    data_for_RF = data.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3','Pyth Rank', 'Opp Pyth Rank'], axis=1)
    from Feature_Reducing_Random_Forest import *;
    top_40_list_of_features_from_RF = FRRR(40,data_for_RF,data_for_RF["Act W %"]);


    if DEBUG :
        print('top_40_list_of_features_from_RF\n',top_40_list_of_features_from_RF);
        print('len(data[Conf].unique())',len(data['Conf'].unique()))

    #1.5.1) goes conf by conf 
    for i in range(len(data['Conf'].unique())):
        #gets only conf
        data_for_BE = data.loc[data['Conf'] == (data['Conf'].unique()[i])];

        #TODOtest
        if data_for_BE.shape[0] <= 9 :
            if DEBUG:
                print('skipped');
            continue;


        # key for the dic to find later
        KEY  = year[X] + data['Conf'].unique()[i];
        #3){works}
        #data prep.
        # drops names from data
        data_for_BE = data_for_BE.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank'], axis=1)


        if DEBUG :
            print('data_for_BE.shape',data_for_BE.shape);
            print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
            print('KEY',KEY);
            print('len(top_40_list_of_features_from_RF)\n',len(top_40_list_of_features_from_RF));
            print('data_for_BE[top_40_list_of_features_from_RF]\n',data_for_BE[top_40_list_of_features_from_RF]);
            print("data_for_BE[top_40_list_of_features_from_RF].shape\n",data_for_BE[top_40_list_of_features_from_RF].shape);

        #notes; need 10{?} in rows to be good maybe (does not like 4 or below)
        from Feature_Secltion_Backward_Elimination import *;
        # so the FSBL dos not remove 6 at a time
        temp=[];
        temp=top_40_list_of_features_from_RF.copy();
        top_12_list_of_features_from_BE = FSBL(data_for_BE[top_40_list_of_features_from_RF],data_for_BE["Act W %"],9,temp);
        #print(top_12_list_of_features_from_BE,'\n');
        data_for_MLW= data.loc[data['Conf'] == (data['Conf'].unique()[i])];
        # drops names from data
        data_for_MLW = data_for_MLW.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank'], axis=1)
        #4)
        # have to do by conf not team, :/ 
        from Maximum_Likelihood_Estimation_Weights import*;
        features_by_weight = MLEW(data_for_MLW[top_12_list_of_features_from_BE],data_for_MLW["Act W %"]);
        #print(features_by_weight);
        weights_from_each_year[KEY]= features_by_weight;
    #just in case this does not clear 
    top_40_list_of_features_from_RF.clear();
print(weights_from_each_year);
