#feature secltion Backward Elimination Technique
# taks in  a pandas list of features lookig at and the depnt. val.{ in the second parater},
        #and number of feature looking at , with a list all top feature from RF( the reduce step)
            #and retuns a list in odrer from  highest to losest 
#note: matters the order the input list is in
# and needs whole NCAA for data to not be so close,
DEBUG =False;
def FSBL(x,y,Numer_of_features,list_of_features):    
    #slpits data into training and test data
    from sklearn.model_selection import train_test_split 
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size = 0.3, random_state = 0) 
    # trainning/testing the model
    from sklearn.linear_model import LinearRegression
    lm = LinearRegression() 
    lm.fit(x_train, y_train) 
    pred = lm.predict(x_test) 
    import statsmodels.api as sm 
    # add a column of ones as integer data type --> 119 teams, x.shape[0]
    # models needs a number coulumn to work so added one
    import numpy as np;
    x = np.append(arr = np.ones((x.shape[0], 1)).astype(int),values = x, axis = 1) 
    #needs a list of features to pick so make a list
    arr=[];
    for i in range(Numer_of_features):
        arr.append(i);
    if DEBUG:
        print(Numer_of_features);
        print('x.shap:\n',x.shape);
        print('x:\n',x);
    '''
    #needs things in a list for them to work
    tempa=[];
    '''
    #index of number to remove;
    index_h = None ;
    #list of fetures by remove
    list_of_features_importance = [];
    for j in range(Numer_of_features):
        #the elimination technique: choose a Significance level usually 0.05, if p>0.05 
        # for the highest values parameter, remove that value
        x_opt = x[:, arr]
        ols = sm.OLS(endog = y, exog = x_opt).fit()
        #needs things in a list for them to work
        tempa=[];
        for i in range(len(ols.pvalues)):
            tempa.append(ols.pvalues[i]);
        index_n = tempa.index(max(ols.pvalues));
        #removed number max number {max(ols.pvalues)} from input list
        del arr[index_n];
        if DEBUG:
            print("ols.pvalues",ols.pvalues,"\n");
            print("index_n",index_n,"\n");
            print("arr",arr,"\n");
        # adds feature that was removed to list
        list_of_features_importance.append(list_of_features[index_n]);
        #print(list_of_features[index_n]);
        #remove that ferute from the list ???
        del list_of_features[index_n];
        tempa.clear();
    #list_of_features_importance.append(list_of_features[arr[0]]);# this is needed for weights, should be "Act W %"
    #list_of_features_importance.reverse(); 
    return list_of_features_importance;
