#steps
#1) get data from mySQL( atm data sheet)
#2) reduce by RF(NCAA)
#3) get top 20 from secltion (conf)
#4) get weights from MLE(can only take 12) (team)
#5) get out from 4 realy for model : dict?
#6) getting to go year by year 
#______________________________________________________________

#6)
year=['2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018'];
weights_from_each_year = {};
for i in range(len(year)):
    print("year[i]:",year[i]);
    #1)
    import pandas as pd
    xls = pd.ExcelFile('NCAAstats.xls');
    data = pd.read_excel(xls, year[i]);
    #pd.read_csv('NCAAstats05.csv');
    #pd.read_excel(xls, 'Sheet1');

    #2){works}
    #data prep
    #drops names from data 
    data_for_RF = data.drop(['Team','Conf'], axis=1)

    from Feature_Reducing_Random_Forest import *;
    top_40_list_of_features_from_RF = FRRR(40,data_for_RF,data_for_RF["Act W %"]);
    #print(top_40_list_of_features_from_RF,'\n');

    #3){works}
    #data prep.
    #gets only conf
    data_for_BE = data.loc[data['Conf'] == 'SEC'];
    # drops names from data
    data_for_BE = data_for_BE.drop(['Team','Conf'], axis=1)
    from Feature_Secltion_Backward_Elimination import *;
    top_12_list_of_features_from_BE = FSBL(data_for_BE[top_40_list_of_features_from_RF],data_for_BE["Act W %"],12,top_40_list_of_features_from_RF);
    #print(top_12_list_of_features_from_BE,'\n');

    #4)
    #data prep
    #gets only a team 
    data_for_W = data.loc[data['Team'] == 'LSU'];
    #drops names
    data_for_W = data_for_W.drop(['Team','Conf'], axis=1)
    from Maximum_Likelihood_Estimation_Weights import*;
    features_by_weight = MLEW(data_for_W[top_12_list_of_features_from_BE],data_for_W["Act W %"]);
    print(features_by_weight);
    weights_from_each_year[year[i]]= features_by_weight;
print(weights_from_each_year);
