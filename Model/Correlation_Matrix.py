# D. import required libraries
import pandas as pd
import numpy as np
import re

# D. remove pairs of correlations to themselves
def remove_redundant_pairs(df):
    # D. diagonal and lower triangular pairs of matrix
    drop_pairs = set()
    cols = df.columns
    for i in range(0, df.shape[1]):
        for j in range(0, i + 1):
            drop_pairs.add((cols[i], cols[j]))
    return drop_pairs

# D. find and return the top correlations
def get_top_correlations(df, n):
    # D. get all correlations in absolute form
    au_corr = df.corr().abs().unstack()
    # D. call for and drop redundant pairs
    drop_labels = remove_redundant_pairs(df)
    au_corr = au_corr.drop(labels = drop_labels).sort_values(ascending = False)
    return get_win_correlations(au_corr, n)

# D. specify the target correlation attribute and return list of most correlations
def get_win_correlations(au_corr, n):
    # z. abs not working when gettign data from mysql , had to add {"_"}
    corr_target = abs(au_corr["Act_W_%"])
    corr_list = []
    for i in range(n-1):
        corr_list.append(str(corr_target[i:i+1]))
    return corr_list

# D. have to do this instead of strictly removing n values off end
#    (stupid issue with corr and python)
def remove_values(list):
    pattern = '[0-9]'
    list = [re.sub(pattern, '', r) for r in list]
    return list

### MAIN CODE ############################
#year = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
#xlsx =  pd.ExcelFile('NCAAstats.xls')
def CorrMatrix(year, df,number):
    values = get_top_correlations(df, number)

    # D. remove numbers from list
    #values = remove_values(values)
    # D. remove extra information data
    for v in range(len(values)):
        # make a changer where it removes numbers and if there is a 'white space' removes it as well
        values[v] = values[v][:-23]
        x = re.findall('\s', values[v][-1])
        while x:
            if x:
                values[v] = values[v][:-1]
                # doudle checking for white space 
                x = re.findall('\s',values[v][-1])
        #TODO: check in mysql when time comes 
        x = re.findall('Opp_Pass_Att_/_Sac',values[v])
        if x and  (v == 0):
            values[v] = "{}k".format(values[v])
    return(values)
    
    
    




