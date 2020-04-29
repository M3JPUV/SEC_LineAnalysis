#take in 2 teams
#both 
# take in a list in "order"
# so eq needs team_a, team_b, team_a_weights, team_a_data, team_b_weights, team_b_data
# main change to the file would be in:
'''
#building u
xa & xb are the x` 
.iloc gets the right weights matching the x value 
reload that value to be from the 'value' from the inputlist  
for i in range(1,len(both)):
        if {item is not in same order from mysql replace with itex weight of where its a}
        ua+= team_a_weights['0'].iloc[i]*xa[i];
        ub+= team_b_weights['0'].iloc[i]*xb[i];
'''

import mysql.connector;
from mysql.connector import Error;
from sqlalchemy import create_engine;
import pymysql;
import pandas as pd;
import numpy as np;
import math;
from decimal import Decimal ;
import  re;
import sys;
import json;
DEBUG = False;

def eq(team_a, team_b, team_a_weights, team_a_data, team_b_weights, team_b_data, input_list):
    # to do
    cla = team_a_data.columns
    clb = team_b_data.columns

    if DEBUG: 
        print('cla:', cla)
        print('clb:', clb)
        print(cla.intersection(clb))

    # union is all 
    #print(cla.union(clb))
    # intersection is only what they have the same
    both = cla.intersection(clb)
    both = both.drop('Act_W_%', errors = 'ignore')

    # _b = both 
    team_a_data_b = team_a_data[both]
    team_b_data_b = team_b_data[both]
    team_a_avg = []
    team_b_avg = []
    team_a_avg = team_a_data_b.mean(axis = 0)
    team_b_avg = team_b_data_b.mean(axis = 0)

    # getting team_a x`{xa}, and team_b x` {xb}
    xa = []
    xb = []
    index_a = []
    index_b = []
    for i in range(len(both)):
        # gets the index for np.array ie team weights so it can get the right numbers 
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
            
    # have the weights that match from both teams 
    #_m = matched
    team_a_weights_m = team_a_weights.loc[index_a,:]
    team_b_weights_m = team_b_weights.loc[index_b,:]

    #building u
    ua = team_a_weights['0'].iloc[0] 
    ub = team_b_weights['0'].iloc[0]

    # setting  up temp new weights for 1st 8 index of list
        # go index by index and if different get weight and save ?
    # new part of eq 'model'
    new_weights_a = [];
    new_weights_b = [];
    if DEBUG:
        print('input_list:\n', input_list)
        print('both:\n', both)
        print('len_input_list:\n', len(input_list))
        print('len_both:\n', len(both))
    # dont want to get the index 0 , and need a number
    not_the_same = None
    # see what is different and saves it
    if input_list:
        not_the_same = 0
        for i in range(len(input_list)):
            if input_list[i] != both [i]:
                not_the_same += 1
                if DEBUG:
                    print('input',input_list[i])
                    print('both',both[i])
                new_weights_a.append(team_a_weights_m['0'].iloc[i])
                new_weights_b.append(team_b_weights_m['0'].iloc[i])
                
    for i in range(1,len(both)):
        if not_the_same:
            if  i <= not_the_same:
                if DEBUG:
                    print(i, 'new_weights_a[i-1]', new_weights_a[i-1])
                    print(i, 'new_weights_b[i-1]', new_weights_b[i-1])
                    print(i, 'xa[i]', xa[i])
                    print(i, 'xb[i]', xb[i])
                ua += new_weights_a[i-1] * xa[i] 
                ub += new_weights_b[i-1] * xb[i]
                #TODO: littler helper : #1.3#{small but changes the output (dont think i need it, can add it if need)
                '''
                #not need anymore;
                if helper == team_a:
                else:
                    ua += new_weights_a[i-1] * xa[i] 
                    ub += new_weights_b[i-1] * xb[i]
                '''
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
    return prob_a, prob_b, both[:12]

def Getdata(team_name):
    sqlEngine = create_engine('mysql+pymysql://model:Model@localhost/team_data');
    dbConnection = sqlEngine.connect()
    data = pd.read_sql("SELECT * FROM `" + team_name + "`" , dbConnection)
    return data.drop(["index"], axis=1)

def Getweights(team_name):
    sqlEngine_w = create_engine('mysql+pymysql://model:Model@localhost/team_weights');
    dbConnection_w = sqlEngine_w.connect()
    weights = pd.read_sql("SELECT * FROM `" + team_name + "`" , dbConnection_w)
    return weights.drop(["index"], axis=1)

def usermodel(team_a, team_b,list_of_both):
    team_a_data = Getdata(team_a)
    team_b_data = Getdata(team_b)
    team_a_weights = Getweights(team_a)
    team_b_weights = Getweights(team_b)

    # cant use : from eq_to_mysql import main_eq
    # strings to list, from mysql
    if list_of_both: 
        list_of_both = list_of_both.split(',')
    prob_a, prob_b, both = eq(team_a, team_b, team_a_weights, team_a_data, team_b_weights, team_b_data, list_of_both)
    #TODO: numbers could be really close so need to need % better
    if prob_a > prob_b:
        '''
        if prob_a < .10:
            prob_a =.15
        if prob_a >= .98:
            prob_a =.98
        '''
        wp = Decimal(prob_a - prob_b)
        #print(wp);
        # number to {*}, gets the number of 0 before any number besides 0
        ntm = re.search("[1-9]", str(wp))
        #print(ntm);
        # get the right number of zero's 
        #print(10**ntm.start())
        if wp < 0:
            wp =.1
        return(int(wp*(10**ntm.start())), str(team_a), str(team_b), str(team_a), both)
    else:
        '''
        if prob_b < .10:
            prob_b =.15
        if prob_b >= .98:
            prob_b =.98
        '''
        # win per 
        wp = Decimal(prob_b - prob_a);
        #print(wp)
        # number to {*}, gets the number of 0 before any number besides 0
        ntm = re.search("[1-9]", str(wp))
        # get the right number of zero's 
        #print(10**ntm.start())
        if wp < 0:
            wp =.1
        return(int(wp*(10**ntm.start())), str(team_b), str(team_a), str(team_b), both)
##TODO : testing 
def main (list_of_both,team_a,team_b):
    percentage,win_team,home,away,top_features = usermodel(team_a, team_b,list_of_both);
    top_features = list(top_features);
    #json = dis , val names are keys
    dictionary ={
        "percentage": percentage,
        "win_team": win_team,
        "home": home,
        "away": away,
        "top_features": str(top_features)[1:-1]
    }

    json_object = json.dumps(dictionary, indent = 6)
    #print(type(json_object));

    # print to temp
    f = open("temp.json", "w")
    f.write(json_object)
    f.close()

    return(json_object);

#input is mysql string input list 
#need to have from stdin ?? z. c 
'''
list_of_both = 'Passer_Rating,Rush_TDs_/_Gm'
team_a = 'LSU'
team_b = 'Georgia_Southern'
'''


list_of_both = sys.argv[1]
team_a = sys.argv[2]
team_b = sys.argv[3]
json_object = main(list_of_both,team_a,team_b);
#print(type(json_object));
print(json_object);




