import pandas as pd
import numpy as np;
from Main_FRRF_to_FSBE_to_logreg import Main_FRRF_to_FSBE_to_logreg;
import math;
team_weights,data_from_team_each_year = Main_FRRF_to_FSBE_to_logreg();
#print("team_weights,data_from_team_each_year ",team_weights,data_from_team_each_year);
# this is a test b/c "clean table is not right"
# Wisconsin(team_A) vs South florida(team_B)
team_b='Wisconsin'
team_a='South Florida'
# data prep get a mean for each row in data( and mathc colums)
#.columns for columns names , .mean(axis=0) for mean of that columns mathcing axis

#matching colums
cla = data_from_team_each_year[team_a].columns
clb = data_from_team_each_year[team_b].columns
#print ('cla:',cla);
#print('clb:',clb);
#print(cla.union(clb));
both = cla.intersection(clb)
both = both.drop('Act W %');
team_a_data=data_from_team_each_year[team_a][both];
team_b_data=data_from_team_each_year[team_b][both];
team_a_avg=[]
team_b_avg=[]
team_a_avg=team_a_data.mean(axis=0);
team_b_avg=team_b_data.mean(axis=0);
# getting tean_a x`{xa}, and team_b x` {xb}
xa=[]
xb=[]
index_a=[]
index_b=[]
for i in range(len(both)):
    # gets the idex for np.array ie team weights
    index_a.append(data_from_team_each_year[team_a].columns.get_loc(both[i]));
    index_b.append(data_from_team_each_year[team_b].columns.get_loc(both[i]));
    # builds xa andb xb 
    xa.append(team_a_avg[both[i]] - team_b_avg[both[i]]);
    xb.append(team_b_avg[both[i]] - team_a_avg[both[i]]);
# have the weights that match from both teams 
team_a_weigths = team_weights[team_a][index_a];
team_b_weigths = team_weights[team_b][index_b];
#building u
ua=team_weights[team_a][0]
ub=team_weights[team_b][0]
for i in range(len(both)):
    ua+= team_a_weigths[i]*xa[i];
    ub+= team_b_weigths[i]*xb[i];
#team_A
prob_a=1/(1+math.exp(-ua))
#team_B
prob_b=1/(1+math.exp(-ub))
print('prob_a',prob_a);
print('prob_b',prob_b);
