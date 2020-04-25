#take in 2 teams
#both 
# take in a list in "order"
# so eq needs team_a,team_b,team_a_weigths,team_a_data,team_b_weigths,team_b_data
# mmain change to teh file would be in :
'''
#building u
xa & xb are the x` 
.iloc gets the right weigths matching the x value 
reload that value to be from the 'value' from the inputlist  
for i in range(1,len(both)):
        if {item is not in same order from mysql replace with itex weight of where its a}
        ua+= team_a_weigths['0'].iloc[i]*xa[i];
        ub+= team_b_weigths['0'].iloc[i]*xb[i];
'''

import mysql.connector;
from mysql.connector import Error;
from sqlalchemy import create_engine;
import pymysql;
import pandas as pd;
import numpy as np;
import math;

def eq(team_a, team_b, team_a_weights, team_a_data, team_b_weights, team_b_data,input_list):
    # to do
    cla = team_a_data.columns
    clb = team_b_data.columns

    if DEBUG ==True : 
        print('cla:',cla)
        print('clb:',clb)
        print(cla.intersection(clb))

    # union is all 
    #print(cla.union(clb))
    # intersection is only what they have the same
    both = cla.intersection(clb)
    both = both.drop('Act W %',errors='ignore')

    #_b = both 
    team_a_data_b = team_a_data[both]
    team_b_data_b = team_b_data[both]
    team_a_avg = []
    team_b_avg = []
    team_a_avg = team_a_data_b.mean(axis = 0)
    team_b_avg = team_b_data_b.mean(axis = 0)

    # getting tean_a x`{xa}, and team_b x` {xb}
    xa = []
    xb = []
    index_a = []
    index_b = []
    for i in range(len(both)):
        # gets the index for np.array ie team weights
        index_a.append(team_a_data.columns.get_loc(both[i]))
        index_b.append(team_b_data.columns.get_loc(both[i]))

        # builds xa andb xb 
        xa.append(team_a_avg[both[i]] - team_b_avg[both[i]])
        xb.append(team_b_avg[both[i]] - team_a_avg[both[i]])

        if DEBUG and  i == 10 :
            print(index_a)
            print(index_b)
            print(xa)
            print(xb)
            
    # have the weights that match from both teams       THESE ARE UNUSED Z.thanks 
    #_m = matched
    team_a_weights_m = team_a_weights.loc[index_a,:]
    team_b_weights_m = team_b_weights.loc[index_b,:]

    #building u
    ua = team_a_weights['0'].iloc[0] 
    ub = team_b_weights['0'].iloc[0]

    # setting  up temp new weights for 1st 8 index of list
        # go index by index and if different get weight and save ?
    # new part of eq 'model'
    new_weights_a=[];
    new_weights_b=[];
    # dont want to get the index 0 
    for i in range(len(input_list)):
        if input_list[i] != both [i]:
            new_weights_a.append(team_a_weights_m['0'].iloc[i]);
            new_weights_b.append(team_b_weights_m['0'].iloc[i]);
            
    
    for i in range(1,len(both)):
        if i <= 8;
            ua += new_weights_a[i-1] * xa[i];
            ub += new_weights_b[i-1] * xb[i];
        else:
            # _m goes here again thanks Z.
            ua += team_a_weights_m['0'].iloc[i] * xa[i]
            ub += team_b_weights_m['0'].iloc[i] * xb[i]

    #team_A
    prob_a = 1 / (1 + math.exp(-ua))
    #team_B
    prob_b = 1 / (1 + math.exp(-ub))
    #print('prob_a', prob_a)
    #print('prob_b', prob_b)
    return prob_a, prob_b, both

def Getdata(team_name):
    #TODO : get from mysql and drop index
    sqlEngine = create_engine('mysql+pymysql://model:Model@localhost/team_data');
    dbConnection = sqlEngine.connect();
    data = pd.read_sql("SELECT * FROM `" + team_name + "`" , dbConnection);
    return data.drop(["index"],axis=1);

def Getweights(team_name):
    #TODO : get from mysql and drop index
    sqlEngine_w = create_engine('mysql+pymysql://model:Model@localhost/team_weights');
    dbConnection_w = sqlEngine_w.connect();
    weights = pd.read_sql("SELECT * FROM `"+ team_name +"`" , dbConnection_w);
    return weights.drop(["index"],axis=1);

def usermodel(team_a,team_b,list_of_both):
    team_a_data=Getdata(team_a);
    team_b_data=Getdata(team_b);
    team_a_weights=Getweights(team_a);
    team_b_weights=(team_b);
    # cant use : from eq_to_mysql import main_eq;
    # strings to list, from mysql 
    list_of_both = list_of_both.split('-').replace(" ","_");
    prob_a, prob_b, both = eq(team_a, team_b, team_a_weights, team_a_data, team_b_weights, team_b_data,list_of_both)
    if prob_a > prob_b:
        if prob_a < .10:
            prob_a =.15
        if prob_a >= .98:
            prob_a =.98
        return(int(prob_a*100), str(team_a), str(team_b), str(team_a), both)
    else:
        if prob_b < .10:
            prob_b =.15
        if prob_b >= .98:
            prob_b =.98
        return(int(prob_b*100), str(team_b), str(team_a), str(team_b), both)
##TODO : testing 
list_of_both = "Opp Avg FP - Pass Yards / Att - Avg FP - Passer Rating - % of Yards from Rush - Pyth - Opp % of Poss w/ 20+ Yard TD - Rush TDs / Gm";
team_a='LSU';
team_b='Texas';
print(usermodel(team_a,team_b,list_of_both));
