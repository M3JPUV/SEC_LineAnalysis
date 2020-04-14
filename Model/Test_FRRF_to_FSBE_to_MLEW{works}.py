
# BIG NOTE: only import what you need else it pulls variles too
import pandas as pd
import numpy as np;
import random
skipped='none';
DEBUG=False;
# going by year 
year=['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
weights_from_each_year = {};
#read file 
xls = pd.ExcelFile('NCAAstats.xls');
for X in range(len(year)):
    data = pd.read_excel(xls, year[X]);
    if DEBUG:
        #if full pd list is need uncommet
        #pd.set_option("display.max_rows", None, "display.max_columns", None);
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
        # key for the dic to find later
        KEY  = year[X] + data['Conf'].unique()[i];

        #gets only conf by :{data['Conf'].unique()[i]}
        data_for_BE = data.loc[data['Conf'] == (data['Conf'].unique()[i])];

        #For BE , needs at least 8 teams 
        if data_for_BE.shape[0] <=8 :
            if DEBUG:
                print('data_for_BE.shape',data_for_BE.shape);
                print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
                print('skipped',skipped);
                print('KEY',KEY);
            if skipped == 'none':
                skipped='';
            skipped += (KEY+'{needs more teams}; ');
            continue;

        #data prep.
        # drops names from data
        data_for_BE = data_for_BE.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank'], axis=1)


        if DEBUG :
            print('data_for_BE.shape',data_for_BE.shape);
            print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
            print('skipped',skipped);
            print('KEY',KEY);
            print('len(top_40_list_of_features_from_RF)\n',len(top_40_list_of_features_from_RF));
            print('data_for_BE[top_40_list_of_features_from_RF]\n',data_for_BE[top_40_list_of_features_from_RF]);
            print("data_for_BE[top_40_list_of_features_from_RF].shape\n",data_for_BE[top_40_list_of_features_from_RF].shape);
            
        # so the FSBL dos not remove 6 at a time
        temp=[];
        temp=top_40_list_of_features_from_RF.copy();
        
        from Feature_Secltion_Backward_Elimination import FSBL;
        top_12_list_of_features_from_BE = FSBL(data_for_BE[top_40_list_of_features_from_RF],data_for_BE["Act W %"],8,temp);
        if DEBUG:
            print('top_12_list_of_features_from_BE: ',top_12_list_of_features_from_BE);
        # have to do by conf 
        from Maximum_Likelihood_Estimation_Weights import MLEW;
        try:
            features_by_weight = MLEW(data_for_BE[top_12_list_of_features_from_BE],data_for_BE["Act W %"]);
        #b/c Singular matrix
        except np.linalg.LinAlgError as err:
            if 'Singular matrix' in str(err):
                if DEBUG:
                    print('skipped b/c Singular matrix');
                if skipped == 'none':
                    skipped='';
                skipped += (KEY+'{Singular matrix}; ');
                continue;
            else:
                raise
        weights_from_each_year[KEY]= features_by_weight;
    #just in case this does not clear 
    top_40_list_of_features_from_RF.clear();
# note : useing this {weights_from_each_year} call the congf anf team you need
print(weights_from_each_year);
print(skipped);
