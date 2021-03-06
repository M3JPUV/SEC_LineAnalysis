#####################
#3/27/2020
#Recursive Feature Elimination
#
#####################

#Resources
import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings('ignore')
#pd.options.display.max_columns = None

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.feature_selection import RFECV

#Estimator is the model instance
#Step is the number of features to be removed at a time
#CV is the Cross-Validation using stratifiedFFold Kset to 10
#Scoring is is the metric you want to optimize for

def RFE(df):
    X = df.drop('Act W %', axis=1)

    target = df['Act W %']######Original
    #print((target));

    #This changes the win percentage into binary input#
    target[target>=.625]=1
    target[target<.625]=0
    '''
    for w in range(len(target)):
        print(type(target[w]));
        if (float(target[w]) >= .625):
            target[w] = 1
        else:
            target[w] = 0
    '''
    rfc = RandomForestClassifier(random_state=101)
    rfecv = RFECV(estimator=rfc, step=1, min_features_to_select = 15, cv=2, scoring='accuracy')
    rfecv.fit(X, target)

    #print('Optimal number of features :', rfecv.n_features_)
    return(X.columns[rfecv.support_])
    #print('Best features :', X.columns[rfecv.support_])
    #print('Scores for each:', rfecv.estimator_.feature_importances_)
    #print('Original features :', X.columns)
    #print('Optimal number of features: {}'.format(rfecv.n_features_))
    #print(' Value:{}'.format( rfecv.estimator_.feature_importances_))

    #Plotting code
    #dset = pd.DataFrame()
    #dset['attr'] = X.columns
    #dset['importance'] = rfecv.estimator_.feature_importances_
    #dset['importance'].update(rfecv.estimator_.featureimportances)
    #dset = dset.sort_values(by='importance', ascending=False)


    #plt.figure(figsize=(16, 14))
    #plt.barh(y=dset['attr'], width=dset['importance'], color='#1976D2')
    #plt.title('RFECV - Feature Importances', fontsize=20, fontweight='bold', pad=20)
    #plt.xlabel('Importance', fontsize=14, labelpad=20)
    #plt.show()

def removeCorrelatedFeatures(df):
    correlated_features = set()
    correlation_matrix = df.drop('Act W %', axis=1).corr()

    for i in range(len(correlation_matrix.columns)):
        for j in range(i):
            if abs(correlation_matrix.iloc[i, j]) > 0.8:#if correlation greater than 0.8
                colname = correlation_matrix.columns[i]
                correlated_features.add(colname)
    return correlated_features
##########Main Driver############
#year = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
#xlsx =  pd.ExcelFile('NCAAstats.xls')

def RandForestClass(train):
#for i in range(len(year)):
    #train = pd.read_excel(xlsx, year[i])
    # D. drop columns that aren't needed or relevant

    #df = train.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank'], axis=1)
    df = train

    #print(df.columns[0])
    correlated_features = removeCorrelatedFeatures(df)
    df.drop(correlated_features, axis=1,errors='ignore')
    return(RFE(df))
