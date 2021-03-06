from sqlalchemy import create_engine
# BIG NOTE: only import what you need else it pulls variles too
import pandas as pd
import numpy as np
import random
#suppers warnings 
import warnings
warnings.filterwarnings("ignore")
from statistics import mean
###########NEEDED FOR DB2#######
import pymysql

DEBUG = False
# if full pd list is needed, uncomment next line
#pd.set_option("display.max_rows", None, "display.max_columns", None)

year = ['`2005`','`2006`','`2007`','`2008`','`2009`','`2010`','`2011`','`2012`','`2013`','`2014`','`2015`','`2016`','`2017`','`2018`']
data_from_team_each_year = {}

#skipped teams or conf 
s = []

#_________________________DEF______________________________
#from:https://stackoverflow.com/questions/53620178/how-to-add-values-to-an-existing-dictionary-key-without-replacing-the-previous-v
# need so i can add things togther(ie team data to itself)
def append_items_to_dict(d_in: dict, d_out: dict):
    for k, v in d_in.items():
        d_out.setdefault(k, []).append(v)
sqlEngine = create_engine('mysql+pymysql://model:Model@localhost/secteams')
dbConnection = sqlEngine.connect()

###_______________________________MAIN_______________________________________________
# read file  
#xls = pd.ExcelFile('NCAAstats.xls')
for X in range(len(year)):
    data = pd.read_sql("SELECT * FROM " + year[X] , dbConnection)
    data = data.replace({'N/A': 0})
    for i in range(len(data['Conf'].unique())):
         # key for the dic to find later
        KEY  = year[X] + data['Conf'].unique()[i]
        if DEBUG:
             print('KEY: ',KEY)
        #gets only conf
        data_for_CMC = data.loc[data['Conf'] == (data['Conf'].unique()[i])]
        holder_for_teams = data_for_CMC.copy()
        #data pep for CM, ##and need to drop ranking stats###
        data_for_CMC = data_for_CMC.drop(['Team', 'Conf', 'Pyth', 'Pyth_Rank', 'Adj_O', 'Rk_Adj_O', 'Adj_D', 'Rk_Adj_D', 'Opp_Adj_O', 'Rk_Opp_Adj_O', 'Opp_Adj_D', 'Rk_Opp_Adj_D', 'Opp_Pyth', 'Opp_Pyth_Rank', 'Rk_Off_Adj_Yards_/_Rush', 'Rk_Off_Adj_Yards_/_Pass', 'Rk_Off_Adj_Yards_/_Play', 'Rk_Def_Adj_Yards_/_Rush', 'Rk_Def_Adj_Yards_/_Pass', 'Rk_Def_Adj_Yards_/_Play'], axis=1, errors='ignore')
        
        # CM for conf by year
        from Correlation_Matrix import CorrMatrix
        # note: need one more then you think ( so want 20 give 21)
        top_20_list_of_features_from_CMC = CorrMatrix(year[X], data_for_CMC, 41)

        #data prep for CMC for each team
        if "Act_W_%" in top_20_list_of_features_from_CMC:
            #1)does not need "Act_W_%" in x , remove updates the list for you....
            top_20_list_of_features_from_CMC.remove("Act_W_%")

        if DEBUG :
            print('data_for_CM.shape: ', data_for_CMC.shape)
            print('data[Conf].unique()[i]): ',data['Conf'].unique()[i])
        #then by team

#_________________THIS IS WHERE THE CHANGES ARE________________________________
# builds a table to read from later
        # have to add "Act_W_%" to the table need to call it later
        top_20_list_of_features_from_CMC.append("Act_W_%")
        # getting team by team stats for the year.
        for j in range(len(holder_for_teams['Team'].unique())):
            # temp dic for adding things to them self(hopefully)
            temp = {}
            Team_data = holder_for_teams.loc[holder_for_teams['Team'] == (holder_for_teams['Team'].unique()[j])]
            # key for the dic to find later
            KEY  = holder_for_teams['Team'].unique()[j]
            # the things saving the data
            # only gets the data from feature selection
            temp[KEY] = Team_data[top_20_list_of_features_from_CMC]
            append_items_to_dict(temp,data_from_team_each_year)
        #just to be safe to clear list
        top_20_list_of_features_from_CMC.clear()
        

######################___________________________CLEANING UP THE TABLE__________________________________####################################
# have to do data clean up , get all data from each year and filling in data
for keys in data_from_team_each_year.keys():
    # setting up for concating
    updated_tablevalue=data_from_team_each_year[keys][0]
    for T in range(1,len(data_from_team_each_year[keys])):
        temp = data_from_team_each_year[keys][T]
        #print("T, temp: ", T, temp.values[0])
        # needs to be a pandas list for the append to work
        updated_tablevalue = updated_tablevalue.append(pd.Series(temp.values[0], index=temp.columns), ignore_index=True, sort=False) #= pd.concat([temp, updated_tablevalue], axis=1, sort=False)
    data_from_team_each_year[keys] = updated_tablevalue

    if DEBUG:
        print('key:',keys)
        print("after clean up  : data_from_team_each_year[keys]\n ",data_from_team_each_year[keys])
        print("after clean up  : data_from_team_each_year[keys].colums\n ",data_from_team_each_year[keys].columns)

# go in and add data per year by .columns ,  just add no need to check just add
# pandas list -> 0 = 2005, 1 = 2006, ...
iloc_year = [0]

for X in range(len(year)):
    data = pd.read_sql("SELECT * FROM " + year[X], dbConnection)
    data = data.replace({'N/A' : 0})

    for i in range(len(data['Conf'].unique())):
        # the indy is not in data_from_team_each_year at all so teams are "lost"(match power ranking later)
        if (data['Conf'].unique()[i]) == 'Indy':
            continue

        data_for_C = data.loc[data['Conf'] == (data['Conf'].unique()[i])]
        for j in range(len(data_for_C['Team'].unique())):
            team=data_for_C['Team'].unique()[j]
            #all the data 
            Team_data = data_for_C.loc[data_for_C['Team'] == (team)]
            # gets a list of what we need to grab
            list_for_team = data_from_team_each_year[team].columns
            # is not in list = NaN b/c pandas 
            cleaned_data = Team_data.reindex(columns = list_for_team)
            # need to change label to right thing in cleaned_data. ie change it ot the year not the team {number}
            cleaned_data.index = iloc_year
            # updating the dict
            data_from_team_each_year[team].update(cleaned_data)
    # this is so the year is kept right
    iloc_year[0] += 1

###############################_____________END OF CLEAnING_________________#####################
#dict for weights need for eqution
team_weights = {}
over_all_accuracy = []

# skipped team either never had a winnign year or played to good and had no loseing year.
s = []

# low Accuracy teams
# low_accuracy_teams = [];

for team_for_log in data_from_team_each_year.keys():
    if DEBUG:
        print("team_for_log",team_for_log)
        #print("data_from_team_each_year[team_for_log]\n",data_from_team_each_year[team_for_log]);
        #print("data_from_team_each_year[team_for_log].loc[:, data_from_team_each_year[team_for_log].columns == Act_W_% ]\n",data_from_team_each_year[team_for_log].loc[:, data_from_team_each_year[team_for_log].columns == "Act_W_%" ]);
    # what to get Accuracy from all teams and get avg 
    # logreg
    from Log_reg import LR
    try:
        # bs is b's ie b1, b2, b3....
        b0, bs, Accuracy = LR(data_from_team_each_year[team_for_log].drop("Act_W_%", axis=1), data_from_team_each_year[team_for_log].loc[:, data_from_team_each_year[team_for_log].columns == "Act_W_%" ],team_for_log)
        # note weights does not have name , names are 'stored" here :data_from_team_each_year[team].columns
        if DEBUG:
            print("Accuracy", Accuracy)
            print("conf", b0)
            print("bs's", bs)
            print("both?", np.append(b0,bs))
            exit()
        #low_accuracy_teams.append(team_for_log);
        #puts b0 and bs toghter.
        both = np.append(b0, bs)
        team_weights[team_for_log] = both
        # keeps track of the models accuracy across all teams 
        over_all_accuracy.append(Accuracy)
        #print(Accuracy,weights);
    except ValueError:
        s.append(team_for_log)
        
#________________________________________________
# teams that that have not had a 'good' year for the last 14 years
if DEBUG: 
    print("s", s)
    print("len", len(s))
    #print('low_accuracy_teams',low_accuracy_teams);
    #print('lenlow_accuracy_teams',len(low_accuracy_teams));

    from statistics import mean
    print("mean(accuracy)", mean(over_all_accuracy))
    print("len(team_weights)", len(team_weights))
    print("team_weights", team_weights)

#################this is for team data #################
'''
# establishing the connection
conn = pymysql.connect(user='model', password='Model', host='localhost')
# Creating a cursor object using the cursor() method
cursor = conn.cursor()
# making data base 
cursor.execute("DROP DATABASE IF EXISTS Team_data")
cursor.execute("CREATE DATABASE Team_data")
'''


#cursor.execute("use Team_data");
# Preparing SQL query to INSERT a record into the database.( settign up the table)
for key in data_from_team_each_year.keys():
    temp_key = key.replace(" ", "_")
    sqlEngine= create_engine('mysql+pymysql://model:Model@localhost/team_data')
    dbConnection= sqlEngine.connect()
    frame=data_from_team_each_year[key].to_sql(temp_key, dbConnection, if_exists = 'replace')
dbConnection.close()
#note: now all things are lower case and u need a {`} to grap one item in mysql,ex: select `Act_W_%` from uab;
#################this is for team weights #################
'''
#establishing the connection
conn = pymysql.connect(user = 'model', password = 'Model', host = 'localhost')
#Creating a cursor object using the cursor() method
cursor = conn.cursor()
# makeing data base 
cursor.execute("DROP DATABASE IF EXISTS Team_weights")
cursor.execute("CREATE DATABASE Team_weights")
'''
#cursor.execute("use Team_weights");
# Preparing SQL query to INSERT a record into the database.( settign up the table)
for key in team_weights.keys():
    temp_key = key.replace(" ", "_")
    sqlEngine = create_engine('mysql+pymysql://model:Model@localhost/team_weights')
    dbConnection = sqlEngine.connect()
    temp_pandas_list = pd.DataFrame(team_weights[key])
    frame = temp_pandas_list.to_sql(temp_key, dbConnection, if_exists = 'replace')
dbConnection.close()




