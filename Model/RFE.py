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
pd.options.display.max_columns = None

from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold
from sklearn.feature_selection import RFECV
#Variables
DATA_FILE = 'SEConly_stats.xlsx_-_2005.csv'

#reads in excel files
rawData = pd.read_csv(DATA_FILE)
#Clean Data
cleanData =rawData.drop(['Team','Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank'], axis=1)
#Recursive Elimination
CorrelationMatrix = sys.stdin.read().rstrip("\n")
CorrelatedFeatures = sys.stdin.read().rstrip("\n")

X = data.drop("Act W %", axis=1)
target = data["Act W %"]

rfc = RandomForestClassifier(random_state=101)
#Estimator is the model instance
#Step is the number of features to be removed at a time
#CV is the Cross-Validation using stratifiedFFold Kset to 10
#Scoring is is the metric you want to optimize for
rfecv = RFECV(estimator=rfc, step=1, cv=StratifiedKFold(10), scoring='accuracy')
rfecv.fit(X, target)
#Output of running RFE
print('Optimal number of features: {}'.format(rfecv.n_features_))
