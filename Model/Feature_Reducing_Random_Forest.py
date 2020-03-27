# feature_reducing_random_forest
# taks in number of features wanted and a pandas list full list , and value of what we think is the most impreant 
    #and retuns a list in odrer from  highest to losest 
def FRRR(Numer_of_features,df, y):
    #Numer_of_features=12;
    # import required libraries
    import pandas as pd
    import numpy as np
    import matplotlib.pyplot as plt
    #feature reducten Random Forest
    from sklearn.ensemble import RandomForestRegressor
    #train = pd.read_csv('NCAAstats_05.csv')
    #df=train.drop(['Team','Conf'], axis=1)
    model = RandomForestRegressor(random_state=1, max_depth=10)
    df=pd.get_dummies(df)
    #print("y:\n",y);
    model.fit(df,y)
    features = df.columns
    importances = model.feature_importances_
    indices = np.argsort(importances)[-Numer_of_features:]
    list_of_features_full = [];
    for i in (indices):
        list_of_features_full.append(features[i]);
    #for show of a graph
    '''
    plt.title('Feature Importances')
    plt.barh(range(len(indices)), importances[indices], color='b', align='center')
    plt.yticks(range(len(indices)), [features[i] for i in indices])
    plt.xlabel('Relative Importance')
    plt.show()
    '''
    list_of_features_full.reverse();
    #print(list_of_features_full);
    return list_of_features_full;
