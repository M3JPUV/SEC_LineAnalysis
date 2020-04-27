from sqlalchemy import create_engine

import pymysql

import pandas as pd

sqlEngine = create_engine('mysql+pymysql://root:asdf@localhost/secteams')

dbConnection = sqlEngine.connect()

#Secify what year you want data from
#Specify what conference you want data from
YEAR = "`2005`"
CONFERENCE = "'ACC'"
#sqlEngine.execute('USE secteams;', dbConnection);
data = pd.read_sql("SELECT * FROM " + YEAR + "where " + YEAR + ".Conf=" + CONFERENCE + " limit 100", dbConnection);



#Used to grab data just for LSU
#x =  data.loc[data['Team'] == 'LSU'];

pd.set_option('display.expand_frame_repr', False)
'''
# data is a dataframe , will make runnign all other files easier 
TODO: 

# need to main pull data from here  and then save into my smysql for each team
# it is saveing the last 14 years of data(ie the numbers) for there top # of features , that can be pulled
# log pulles that data and on run log reg on all teams amd saves the weigths from that into a table in mysql( would be nice to have sameish loction)
# then eq get weright and names to get ouput for new eq
'''

print(data)

dbConnection.close()
