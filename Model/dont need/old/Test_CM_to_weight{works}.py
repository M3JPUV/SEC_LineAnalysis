DEBUG=False;
year=['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
weights_from_each_year = {};
skipped='none';
import pandas as pd
import numpy as np;
# read file  
xls = pd.ExcelFile('NCAAstats.xls');
for X in range(len(year)):
    data = pd.read_excel(xls, year[X]);
    for i in range(len(data['Conf'].unique())):
         # key for the dic to find later
        KEY  = year[X] + data['Conf'].unique()[i];
        if DEBUG:
             print('KEY: ',KEY);
        #data pep for CM
        data_for_CM = data.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3','Pyth Rank', 'Opp Pyth Rank'], axis=1)
        #gets only conf
        data_for_CM = data_for_CM.loc[data['Conf'] == (data['Conf'].unique()[i])];
        # CM for conf by year 
        from Correlation_Matrix import CorrMatrix;
        # note: need one more then you think ( so want 20 give 21)
        top_20_list_of_features_from_CM = CorrMatrix(year[X],data_for_CM,21);
        #TODO for weights and BE needs to be at leat 9 teams
        if data_for_CM.shape[0] <= 1 :
            if DEBUG:
                print('skipped');
            if skipped == 'none':
                    skipped='';
            skipped += (KEY+'{needs more teams}; ');
            continue;

        if DEBUG :
            print('data_for_CM.shape: ',data_for_CM.shape);
            print('data[Conf].unique()[i]): ',data['Conf'].unique()[i]);
            print('len(top_40_list_of_features_from_RF): ',len(top_20_list_of_features_from_CM));
            print('data_for_CM[top_20_list_of_features_from_CM]\n',data_for_CM[top_20_list_of_features_from_CM]);
            print("data_for_CM[top_20_list_of_features_from_CM].shape: ",data_for_CM[top_20_list_of_features_from_CM].shape);
        # data prep for weights : below is done  when funtion is called
        #data_for_MLW = data_for_w.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank'], axis=1)
        # have to do by conf
        from Maximum_Likelihood_Estimation_Weights import MLEW;
        # so the MLW dos not remove things one  at a time
        temp=[];
        temp=top_20_list_of_features_from_CM.copy();
        # gets weights has to be conf b/c of singlur matrix
        try :
            features_by_weight = MLEW(data_for_CM[temp],data_for_CM["Act W %"]);
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
        if DEBUG:
            print(features_by_weight);
        weights_from_each_year[KEY]= features_by_weight;
    #just in case this does not clear 
    top_20_list_of_features_from_CM.clear();
# note : useing this {weights_from_each_year} call the congf anf team you need
print(weights_from_each_year);
print(skipped);
