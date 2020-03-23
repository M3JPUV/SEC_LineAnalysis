Numer_of_features=12;
# import required libraries
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
#feature reducten Random Forest
from sklearn.ensemble import RandomForestRegressor

import seaborn as sns


train = pd.read_csv('SEConly_stats.xlsx_-_2005.csv')
df=train.drop(['Team','Conf'], axis=1)

'''TEST CODE
model = RandomForestRegressor(random_state=1, max_depth=10)

model.fit(df,df["Act W %"])
features = df.columns
importances = model.feature_importances_
indices = np.argsort(importances)[-Numer_of_features:]
list_of_features = [];
for i in (indices):
    list_of_features.append(features[i]);
    print(features[i])
print(list_of_features);
'''
'''TEST CODE
#for show of a graph
plt.title('Feature Importances')
plt.barh(range(len(indices)), importances[indices], color='b', align='center')
plt.yticks(range(len(indices)), [features[i] for i in indices])
plt.xlabel('Relative Importance')
plt.show()
'''
#print(df.columns[0])

# D. create the correlation matrix model for one year
def correlation_matrix(df):
    from matplotlib import pyplot as plt
    from matplotlib import cm as cm

    #df = df[list_of_features]
    #print(df.corr())
    
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
    plt.title('2005 Feature Correlation')
    # D. create labels and format for each
    labels=df.columns[0:df.shape[1]]
    ax1.set_xticklabels(labels,fontsize=6,rotation=90)
    ax1.set_yticklabels(labels,fontsize=6)
    # D. add colorbar and add ticks for values (from -1 to 1)
    fig.colorbar(cax, ticks=[-1.0,-.75,-.50,-.25,0,.25,.50,.75,1])
    plt.show()

correlation_matrix(df)



