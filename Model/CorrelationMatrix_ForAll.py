# D. import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
#Output File
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
    return au_corr[0:n]


### MAIN CODE ############################
year = ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018']
xlsx =  pd.ExcelFile('NCAAstats.xlsx')

for i in range(len(year)):
    train = pd.read_excel(xlsx, year[i])
    # D. drop columns that aren't needed or relevant
    df = train.drop(['Team', 'Conf', 'Rk', 'Rk.1', 'Rk.2', 'Rk.3', 'Pyth Rank'], axis=1)

    #print(df.columns[0])

    print("Top Absolute Correlations for {}".format(year[i]))
    print("{}\n".format(get_top_correlations(df, 10)))
    if REDIRECTION:
        sys.stdout = open(OUTPUT_FILE, "w")
        print("Top Absolute Correlations for {}".format(year[i]))
        print("{}\n".format(get_top_correlations(df, 10)))


    # D. visual data
    if EXTRA_DATA:
        # D. shows all dataform data (shows snippet if not set)
        pd.set_option('display.width', 400)
        pd.set_option('display.max_columns', 80)
        pd.set_option('display.max_rows', 80)
        # D. plot the correlations
        get_correlation_matrix(df, corr_year = year[i])



