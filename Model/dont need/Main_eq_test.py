import pandas as pd
import numpy as np;
import math;

import xlwt 
from xlwt import Workbook 

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
#############################GETTING THE TEASM FOR 2019#################################################
# D. Remove Limit on Print Size
pd.set_option('display.max_rows', None, "display.max_rows", None)
xlsx =  pd.ExcelFile('NCAA_WinLoss.xlsx')

train = pd.read_excel(xlsx, "2019")

# D. Only take Week and Team Names
train = train[['Wk', 'Winner', 'Loser']]

# D. Strip Ranking off of Teams
train['Winner'] = train['Winner'].map(lambda x: x.lstrip('(1234567890) '))
train['Loser'] = train['Loser'].map(lambda x: x.lstrip('(1234567890) '))
#D. strip spaces
train['Winner'] = train['Winner'].map(lambda x: x.strip());
train['Loser'] = train['Loser'].map(lambda x: x.strip());
# D. Winner Teams (Replace wrong names)
train["Winner"]= train["Winner"].str.replace("louisiana state", "LSU", case = False)
train["Winner"]= train["Winner"].str.replace("nevada-las vegas", "UNLV", case = False)
train["Winner"]= train["Winner"].str.replace("southern methodist", "SMU", case = False)
train["Winner"]= train["Winner"].str.replace("central florida", "UCF", case = False)
train["Winner"]= train["Winner"].str.replace("hawaii", "Hawai'i", case = False)
train["Winner"]= train["Winner"].str.replace("brigham young", "BYU", case = False)
train["Winner"]= train["Winner"].str.replace("texas christian", "TCU", case = False)
train["Winner"]= train["Winner"].str.replace("alabama-birmingham", "UAB", case = False)
train["Winner"]= train["Winner"].str.replace("southern california", "USC", case = False)
train["Winner"]= train["Winner"].str.replace("texas-san antonio", "UTSA", case = False)
train["Winner"]= train["Winner"].str.replace("texas-el paso", "UTEP", case = False)
train["Winner"]= train["Winner"].str.replace("bowling green state", "Bowling Green", case = False)

# D. Loser Teams (Replace wrong names)
train["Loser"]= train["Loser"].str.replace("louisiana state", "LSU", case = False)
train["Loser"]= train["Loser"].str.replace("nevada-las vegas", "UNLV", case = False)
train["Loser"]= train["Loser"].str.replace("southern methodist", "SMU", case = False)
train["Loser"]= train["Loser"].str.replace("central florida", "UCF", case = False)
train["Loser"]= train["Loser"].str.replace("hawaii", "Hawai'i", case = False)
train["Loser"]= train["Loser"].str.replace("brigham young", "BYU", case = False)
train["Loser"]= train["Loser"].str.replace("texas christian", "TCU", case = False)
train["Loser"]= train["Loser"].str.replace("alabama-birmingham", "UAB", case = False)
train["Loser"]= train["Loser"].str.replace("southern california", "USC", case = False)
train["Loser"]= train["Loser"].str.replace("texas-san antonio", "UTSA", case = False)
train["Loser"]= train["Loser"].str.replace("texas-el paso", "UTEP", case = False)
train["Loser"]= train["Loser"].str.replace("bowling green state", "Bowling Green", case = False)
###############################################################################

#____________________________cm ________________________________________

from Temp_cm_to_log import Main_CM_to_logreg;
team_weights_cm,data_from_team_each_year_cm = Main_CM_to_logreg();
'''
#_______________________________FSBE_______________________________________________
from Temp_FRRF_to_FSBE_to_logreg import Main_FRRF_to_FSBE_to_logreg;
team_weights_fsbe,data_from_team_each_year_fsbe = Main_FRRF_to_FSBE_to_logreg();
#__________________________________________________________________________
'''
# D. Make the workbook and sheet
wb = Workbook()
sheet1 = wb.add_sheet('Sheet 1')

# D. Heading row
sheet1.write(0, 0, 'team_a')
sheet1.write(0, 1, 'prob_a')
sheet1.write(0, 2, 'team_a')
sheet1.write(0, 3, 'prob_a')
sheet1.write(0, 4, 'team_weights_cm[team_a]')
sheet1.write(0, 5, 'team_weights_cm[team_b]')
sheet1.write(0, 6, 'data_from_team_each_year[team_a]')
sheet1.write(0, 7, 'data_from_team_each_year[team_b]')

# D. Ensures no gaps in table due to skipped teams
i = 1
for index,row in train.iterrows():
    team_a=row['Winner']
    team_b=row['Loser']

    # for cm 
    try:
        # take , team name, team data  and weights  for cm 
        prob_a,prob_b = main_eq(team_a,team_b,team_weights_cm[team_a],data_from_team_each_year_cm[team_a],team_weights_cm[team_b],data_from_team_each_year_cm[team_b])
        #print('\nprob_a CM',team_a,prob_a,"%");
        #print('\nprob_b CM',team_b,prob_b,"%");

        # Row for each game
        sheet1.write(i, 0, team_a)
        sheet1.write(i, 1, prob_a)
        sheet1.write(i, 2, team_b)
        sheet1.write(i, 3, prob_b)
        sheet1.write(i, 4, str((list(team_weights_cm[team_a])[:8])))
        sheet1.write(i, 5, str((list(team_weights_cm[team_b])[:8])))
        sheet1.write(i, 6, str((list(data_from_team_each_year_cm[team_a])[:8])))
        sheet1.write(i, 7, str((list(data_from_team_each_year_cm[team_b])[:8])))
        i+=1
        
    except:
        #print("skipped cm eq ",team_a,team_b);
        continue

# Save workbook to file
wb.save('output.xls')

'''
    # for fsbe
    try:
        # take , team name, team data  and weights  for fsbe
        prob_a,prob_b = main_eq(team_a,team_b,team_weights_fsbe[team_a],data_from_team_each_year_fsbe[team_a],team_weights_fsbe[team_b],data_from_team_each_year_fsbe[team_b])
        print('\nprob_a FSBE',team_a,prob_a,"%");
        print('prob_b FSBE',team_b,prob_b,"%\n");
    except:
        print("skipped fsbe eq ",team_a,team_b);
'''

'''
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
#__________________________________________________________________________
# take , team name, team data  and weights 
prob_a,prob_b = main_eq(team_a,team_b,team_weights[team_a],data_from_team_each_year[team_a],team_weights[team_b],data_from_team_each_year[team_b])
print('prob_a FSBE',team_a,prob_a,"%");
print('prob_b FSBE',team_b,prob_b,"%");
'''
