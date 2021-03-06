# D. import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import re
import sys

#
OUTPUT_FILE = "Correlation.txt"
REDIRECTION = False

# D. change value to show visual plots and ALL data
EXTRA_DATA = False


# D. create the correlation matrix model for one year
def get_correlation_matrix(df, corr_year):
    from matplotlib import pyplot as plt
    from matplotlib import cm as cm

    # D. prints off all columns with their data
    print(df)

    # D. create the plot
    fig = plt.figure()
    ax1 = fig.add_subplot(1,1,1)
    cmap = cm.get_cmap('jet', 30)
    cax = ax1.imshow(df.corr(), interpolation="nearest", cmap=cmap)

    arr=[];
    for i in range(df.shape[1]):
        arr.append(i)
    # D. set the number of ticks
    ax1.set_xticks(arr)
    ax1.set_yticks(arr)
    # D. create grid based on ticks
    ax1.grid(linestyle=':',)
    # D. title of model
    plt.title('{} Feature Correlation'.format(corr_year))
    # D. create labels and format for each
    labels=df.columns[0:df.shape[1]]
    ax1.set_xticklabels(labels, fontsize=6, rotation=90)
    ax1.set_yticklabels(labels, fontsize=6)
    # D. add colorbar and add ticks for values (from -1 to 1)
    fig.colorbar(cax, ticks=[-1.0, -.75, -.50, -.25, 0, .25, .50, .75, 1])
    plt.show()

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
    corr_target = abs(au_corr["Act W %"])
    corr_list = []
    for i in range(n-1):
        corr_list.append(str(corr_target[i:i+1]))
    return corr_list

### MAIN CODE ############################
year = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
xlsx =  pd.ExcelFile('NCAAstats.xls')

for i in range(len(year)):
    train = pd.read_excel(xlsx, year[i])
    # D. drop columns that aren't needed or relevant
    df = train.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank', 'Opp Pyth Rank', ], axis = 1)

    #print(df.columns[0])

    print("\n\nTop Act Win % Correlations for {}".format(year[i]))
    values = get_top_correlations(df, 20)

    # D. remove extra information data
    for v in range(len(values)):
        # make a changer where it removes numbers and if there is a 'white space' removes it as well
        values[v] = values[v][:-23]
        x = re.findall('\s',values[v][-1]);
        while x:
            if x:
                values[v] = values[v][:-1]
                # doudle checking for white space 
                x = re.findall('\s',values[v][-1]
        #TODO: check in mysql when time comes 
        x = re.findall('Opp Pass Att / Sac',values[v])
        if x and  (v == 0):
            values[v] = "{}k".format(values[v])
        print(values[v])
        if REDIRECTION:
            sys.stdout.open(OUTPUT_FILE, "w")
    
    # D. visual data
    if (EXTRA_DATA == True):
        # D. shows all dataform data (shows snippet if not set)
        pd.set_option('display.width', 400)
        pd.set_option('display.max_columns', 80)
        pd.set_option('display.max_rows', 80)
        # D. plot the correlations
        get_correlation_matrix(df, corr_year = year[i])



