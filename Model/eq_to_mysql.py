import pandas as pd
import numpy as np
import math

DEBUG = False

# file will be given two pandas lists
#team_a,team_b,team_weights[team_a],data_from_team_each_year[team_a],team_weights[team_b],data_from_team_each_year[team_b]
def main_eq(team_a, team_b, team_a_weights, team_a_data, team_b_weights, team_b_data):

    #print("team_weights,data_from_team_each_year ",team_weights,data_from_team_each_year)
    # this is a test b/c "clean table is not right"
    # Wisconsin(team_A) vs South florida(team_B)
    #team_b = 'Wisconsin'
    #team_a  ='South Florida'
    # data prep get a mean for each row in data( and match columns)
    #.columns for columns names , .mean(axis=0) for mean of that columns matching axis
    
    #matching columns
    cla = team_a_data.columns
    clb = team_b_data.columns

    if DEBUG ==True : 
        print ('cla:',cla)
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
            
    # have the weights that match from both teams       THESE ARE UNUSED z.thanks
    #_m = matched
    team_a_weights_m = team_a_weights.loc[index_a,:]
    team_b_weights_m = team_b_weights.loc[index_b,:]

    #building u
    ua = team_a_weights['0'].iloc[0] 
    ub = team_b_weights['0'].iloc[0]
    
    for i in range(1,len(both)):
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

#############################GETTING THE TEAMS FOR 2019#################################################
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
train['Winner'] = train['Winner'].map(lambda x: x.strip())
train['Loser'] = train['Loser'].map(lambda x: x.strip())
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
train["Winner"]= train["Winner"].str.replace("(OH)","Ohio")
train["Winner"]= train["Winner"].str.replace("(FL)","Florida")
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
train["Loser"]= train["Loser"].str.replace("(OH)","Ohio")
train["Loser"]= train["Loser"].str.replace("(FL)","Florida")
train["Loser"]= train["Loser"].str.replace("bowling green state", "Bowling Green", case = False)

# z. take team name, team data  and weights  for fsbe
train['Winner'] = train['Winner'].map(lambda x:x.replace(" ", "_"))
train['Loser'] = train['Loser'].map(lambda x:x.replace(" ", "_"))
###############################################################################
"""
#____________________________CM ________________________________________
from Temp_cm_to_log import Main_CM_to_logreg
team_weights_cm, data_from_team_each_year_cm = Main_CM_to_logreg()
"""
'''
#_______________________________FSBE_______________________________________________
from Temp_FRRF_to_FSBE_to_logreg import Main_FRRF_to_FSBE_to_logreg
team_weights_fsbe,data_from_team_each_year_fsbe = Main_FRRF_to_FSBE_to_logreg()

'''
# use team_data
# show tables
# select * from air_force
# select * from akron
data_from_team_each_year_fsbe = {}
team_weights_fsbe = {}
import mysql.connector
from mysql.connector import Error
from sqlalchemy import create_engine
import pymysql

# for data
try:
    connection = mysql.connector.connect(host = 'localhost',
                                         database = 'team_data',
                                         user = 'model',
                                         password = 'Model',
                                         auth_plugin = 'mysql_native_password')

    sql_select_Query = "show tables"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    tables = cursor.fetchall()
    # from ('air_force',) to air_force
    tables = [item for t in tables for item in t]

except Error as e:
    print("Error reading data from MySQL table", e)

finally:
    if (connection.is_connected()):
        connection.close()
        cursor.close()
        if DEBUG:
            print("MySQL connection is closed for team_data")

sqlEngine = create_engine('mysql+pymysql://model:Model@localhost/team_data')
dbConnection = sqlEngine.connect()

for X in tables:
    # need it for names like hawai'i.
    data = pd.read_sql("SELECT * FROM `" + X + "`" , dbConnection)
    data_from_team_each_year_fsbe[X] = data

#_____________________________________________________________________________________
# for weights 
try:
    connection = mysql.connector.connect(host = 'localhost',
                                         database = 'team_weights',
                                         user = 'model',
                                         password = 'Model',
                                         auth_plugin = 'mysql_native_password')

    sql_select_Query = "show tables"
    cursor = connection.cursor()
    cursor.execute(sql_select_Query)
    tables = cursor.fetchall()
    # from ('air_force',) to air_force
    tables = [item for t in tables for item in t]

except Error as e:
    print("Error reading data from MySQL table", e)

finally:
    if (connection.is_connected()):
        connection.close()
        cursor.close()
        if DEBUG:
            print("MySQL connection is closed for team_weights")

sqlEngine_w = create_engine('mysql+pymysql://model:Model@localhost/team_weights')
dbConnection_w = sqlEngine_w.connect()

for X in tables:
    weights = pd.read_sql("SELECT * FROM `"+ X +"`" , dbConnection_w)
    team_weights_fsbe[X] = weights

####################################################################


'''

print()
print(team_weights_fsbe.keys())
print(train['Winner'])
print(train['Loser'])
'''

####################################################################
#______________________________________________________________
mydb = mysql.connector.connect(host = "localhost", user = "model", passwd = "Model", database = "win_per_2019", auth_plugin = 'mysql_native_password')
mycursor = mydb.cursor()

# drop databases
sql= "DROP TABLE IF EXISTS `2019`"
mycursor.execute(sql)
mydb.commit()

# make it
sql="CREATE TABLE `2019` (p_win_t int(11), wt varchar(20), home varchar(20), away varchar(20), top_features varchar(200))"
mycursor.execute(sql)
mydb.commit()
DEBUG = False
#print(team_weights_fsbe.keys)
#print(data_from_team_each_year_fsbe)
#exit()

for index,row in train.iterrows():
    team_a = row['Winner']
    team_b = row['Loser']

    if DEBUG:
        print(team_a)
        print(team_b)
        #print(team_weights_fsbe.keys())
        #print(data_from_team_each_year_fsbe.keys())
        print(team_weights_fsbe[team_a])
        print(data_from_team_each_year_fsbe[team_a])
        print(type(team_weights_fsbe[team_b]))
        print(data_from_team_each_year_fsbe[team_b])

    """
    # for cm 
    try:
        # take , team name, team data  and weights  for cm 
        prob_a,prob_b = main_eq(team_a,team_b,team_weights_cm[team_a],data_from_team_each_year_cm[team_a],team_weights_cm[team_b],data_from_team_each_year_cm[team_b])
        print('\nprob_a CM',team_a,prob_a,"%")
        print('prob_b CM',team_b,prob_b,"%\n")
    except:
        print("skipped cm eq ",team_a,team_b)
    """
    # for fsbe
    try:
        # all lower case and add lines 
        prob_a,prob_b,both = main_eq(team_a,team_b,team_weights_fsbe[team_a].drop(["index"], axis=1),data_from_team_each_year_fsbe[team_a].drop(["index"], axis=1),team_weights_fsbe[team_b].drop(["index"], axis=1),data_from_team_each_year_fsbe[team_b].drop(["index"], axis=1))
        
        if DEBUG :
            print('\nprob_a FSBE', team_a, prob_a, "%")
            print('prob_b FSBE', team_b, prob_b, "%\n")

            # put things for frontend needs
        #p_win_t, WT, away, home, [list of both]
        sql = "INSERT INTO `2019` (p_win_t,wt,home,away,top_features) VALUES (%s,%s,%s,%s,%s)"
        both = '-'.join(map(str, both[:8]))
        both = '"' + both + '"'

        if DEBUG:
            print(both)
            print(type(int(prob_b*100)), type(team_a), type(team_b), type(team_a), type(str(list(both)[:8])))
            print((int(prob_a*100), str(team_a), str(team_b), str(team_a), str((both)[:8])))

        if prob_a > prob_b:
            if prob_a < .10:
                prob_a =.15
            if prob_a >= .98:
                prob_a =.98
            val = (int(prob_a*100), str(team_a), str(team_b), str(team_a), both)
        else:
            if prob_b < .10:
                prob_b =.15
            if prob_b >= .98:
                prob_b =.98
            val = (int(prob_b*100), str(team_b), str(team_a), str(team_b), both)

        mycursor.execute(sql, val)
        mydb.commit()
        if DEBUG:
            print(mycursor.rowcount, "record inserted.")
    except:
        #print("skipped fsbe eq ", team_a," ", team_b)
        continue

'''
#_____________________________________________________________________
# for testing its manual
# have to remove team that are not in the list(sunbelt and indy) try: execpt 
team_a = 'Georgia Southern'
team_b = 'LSU'
#team_a = 'Wisconsin'
#team_b = 'South Florida'
# take , team name, team data  and weights 
prob_a,prob_b = main_eq(team_a, team_b, team_weights[team_a], data_from_team_each_year[team_a], team_weights[team_b], data_from_team_each_year[team_b])
print('prob_a CM', team_a, prob_a, "%")
print('prob_b CM', team_b, prob_b, "%")
#__________________________________________________________________________
# take , team name, team data  and weights 
prob_a,prob_b = main_eq(team_a, team_b, team_weights[team_a], data_from_team_each_year[team_a], team_weights[team_b], data_from_team_each_year[team_b])
print('prob_a FSBE', team_a, prob_a, "%")
print('prob_b FSBE', team_b, prob_b, "%")
'''
