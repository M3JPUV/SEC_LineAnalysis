import pandas as pd
import numpy as np

# D. Remove Limit on Print Size
pd.set_option('display.max_rows', None, "display.max_rows", None)
xlsx =  pd.ExcelFile('NCAA_WinLoss.xls')

train = pd.read_excel(xlsx, "2019")

# D. Only take Week and Team Names
train = train[['Wk', 'Winner', 'Loser']]

# D. Strip Ranking off of Teams
train['Winner'] = train['Winner'].map(lambda x: x.lstrip('(1234567890) '))
train['Loser'] = train['Loser'].map(lambda x: x.lstrip('(1234567890) '))


# D. Winner Teams (Replace wrong names)
train["Winner"]= train["Winner"].str.replace("louisiana state", "LSU", case = False)
train["Winner"]= train["Winner"].str.replace("nevada-las vegas", "UNLV", case = False)
train["Winner"]= train["Winner"].str.replace("southern methodist", "SMU", case = False)
train["Winner"]= train["Winner"].str.replace("central florida", "UCF", case = False)
train["Winner"]= train["Winner"].str.replace("hawaii", "Hawai'i", case = False)
train["Winner"]= train["Winner"].str.replace("brigham young", "BYU", case = False)
train["Winner"]= train["Winner"].str.replace("texas christian", "TCU", case = False)
train["Winner"]= train["Winner"].str.replace("alabama birmingham", "UAB", case = False)
train["Winner"]= train["Winner"].str.replace("southern california", "USC", case = False)
train["Winner"]= train["Winner"].str.replace("texas-san antonio", "UTSA", case = False)
train["Winner"]= train["Winner"].str.replace("texas-el paso", "UTEP", case = False)

# D. Loser Teams (Replace wrong names)
train["Loser"]= train["Loser"].str.replace("louisiana state", "LSU", case = False)
train["Loser"]= train["Loser"].str.replace("nevada-las vegas", "UNLV", case = False)
train["Loser"]= train["Loser"].str.replace("southern methodist", "SMU", case = False)
train["Loser"]= train["Loser"].str.replace("central florida", "UCF", case = False)
train["Loser"]= train["Loser"].str.replace("hawaii", "Hawai'i", case = False)
train["Loser"]= train["Loser"].str.replace("brigham young", "BYU", case = False)
train["Loser"]= train["Loser"].str.replace("texas christian", "TCU", case = False)
train["Loser"]= train["Loser"].str.replace("alabama birmingham", "UAB", case = False)
train["Loser"]= train["Loser"].str.replace("southern california", "USC", case = False)
train["Loser"]= train["Loser"].str.replace("texas-san antonio", "UTSA", case = False)
train["Loser"]= train["Loser"].str.replace("texas-el paso", "UTEP", case = False)



# D. Print Statements
for index, row in train.iterrows():
    #if row['Wk'] == 2:
    #if (row['Winner'] == "UNLV" or row['Loser'] == "UNLV"):
    print(row['Wk'], row['Winner'], row['Loser'])
 
