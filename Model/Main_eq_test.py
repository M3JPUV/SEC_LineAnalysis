import pandas as pd
import numpy as np;
import math;
# file will be given two pnadas list
#team_a,team_b,team_weights[team_a],data_from_team_each_year[team_a],team_weights[team_b],data_from_team_each_year[team_b]
def main_eq(team_a,team_b,team_a_weigths,team_a_data,team_b_weigths,team_b_data):

    #print("team_weights,data_from_team_each_year ",team_weights,data_from_team_each_year);
    # this is a test b/c "clean table is not right"
    # Wisconsin(team_A) vs South florida(team_B)
    #team_b='Wisconsin'
    #team_a='South Florida'
    # data prep get a mean for each row in data( and mathc colums)
    #.columns for columns names , .mean(axis=0) for mean of that columns mathcing axis
    
    #matching colums
    cla = team_a_data.columns
    clb = team_b_data.columns
    #print ('cla:',cla);
    #print('clb:',clb);
    #print(cla.union(clb));
    both = cla.intersection(clb)
    both = both.drop('Act W %');
    #_b = both 
    team_a_data_b=team_a_data[both];
    team_b_data_b=team_b_data[both];
    team_a_avg=[]
    team_b_avg=[]
    team_a_avg=team_a_data_b.mean(axis=0);
    team_b_avg=team_b_data_b.mean(axis=0);
    # getting tean_a x`{xa}, and team_b x` {xb}
    xa=[]
    xb=[]
    index_a=[]
    index_b=[]
    for i in range(len(both)):
        # gets the idex for np.array ie team weights
        index_a.append(team_a_data.columns.get_loc(both[i]));
        index_b.append(team_b_data.columns.get_loc(both[i]));
        # builds xa andb xb 
        xa.append(team_a_avg[both[i]] - team_b_avg[both[i]]);
        xb.append(team_b_avg[both[i]] - team_a_avg[both[i]]);
    # have the weights that match from both teams
    #_m = match
    team_a_weigths_m = team_a_weigths[index_a];
    team_b_weigths_m =team_b_weigths[index_b];
    #building u
    ua=team_a_weigths[0]
    ub=team_b_weigths[0]
    for i in range(len(both)):
        ua+= team_a_weigths_m[i]*xa[i];
        ub+= team_b_weigths_m[i]*xb[i];
    #team_A
    prob_a=1/(1+math.exp(-ua))
    #team_B
    prob_b=1/(1+math.exp(-ub))
    #print('prob_a',prob_a);
    #print('prob_b',prob_b);
    return prob_a,prob_b

#____________________________cm ________________________________________

from Temp_cm_to_log import Main_CM_to_logreg;
team_weights,data_from_team_each_year = Main_CM_to_logreg();
#_____________________________________________________________________
# for testing its manual
# have to remove team that are not in the list(sunbelt and indy) try: execpt 
team_a='Georgia Southern'
team_b='LSU'
#team_a='Wisconsin'
#team_b='South Florida'
# take , team name, team data  and weights 
prob_a,prob_b = main_eq(team_a,team_b,team_weights[team_a],data_from_team_each_year[team_a],team_weights[team_b],data_from_team_each_year[team_b])
print('prob_a CM',team_a,prob_a,"%");
print('prob_b CM',team_b,prob_b,"%");


#_______________________________FSBE_______________________________________________
from Temp_FRRF_to_FSBE_to_logreg import Main_FRRF_to_FSBE_to_logreg;
team_weights,data_from_team_each_year = Main_FRRF_to_FSBE_to_logreg();
#__________________________________________________________________________
# take , team name, team data  and weights 
prob_a,prob_b = main_eq(team_a,team_b,team_weights[team_a],data_from_team_each_year[team_a],team_weights[team_b],data_from_team_each_year[team_b])
print('prob_a FSBE',team_a,prob_a,"%");
print('prob_b FSBE',team_b,prob_b,"%");
