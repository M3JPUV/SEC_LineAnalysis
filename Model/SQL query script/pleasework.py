from sqlalchemy import create_engine

import pymysql

import pandas as pd

sqlEngine = create_engine('mysql+pymysql://root:coolmatt97@localhost')

dbConnection = sqlEngine.connect()

#Secify what year you want data from
#Specify what conference you want data from
YEAR = "`2005`"
CONFERENCE = "'ACC'"

data = pd.read_sql("SELECT * FROM stats." + YEAR + "where stats." + YEAR + ".Conf=" + CONFERENCE + " limit 100", dbConnection);
#frame = pd.read_sql("select * from stats." + YEAR, dbConnection);



#Used to grab data just for LSU
#x =  data.loc[data['Team'] == 'LSU'];

pd.set_option('display.expand_frame_repr', False)

print(data)

dbConnection.close()
