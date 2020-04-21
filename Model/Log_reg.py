#logreg
DEBUG =False;
import pandas as pd
import numpy as np;
import pickle;
import os.path;
def LR(X,y,model_name):
    #y should be "Act W %" needs to be 0 or 1
    #X should be  Features
    # replaces NaN with 0
    #from:https://stackoverflow.com/questions/13295735/how-can-i-replace-all-the-nan-values-with-zeros-in-a-column-of-a-pandas-datafram
    X = X.fillna(0);

    #2)but needs y to be 1 or 0 .... i think
    # need to have mean for each team
    mean = y.mean(axis=0);
    std = y.std();
    """
    print("y",y);z
    print("mean",mean);
    print("std",std); 
    """
    # idea : if .5 or higher '1' {won the sesien}
    #.625 is then winning more then 5 conf games an avg.
    y[y>=.625]=1;
    # else '0'{lost}
    y[y<.625]=0;
    # splits the data into train(75%) and test(25%)
    train_per = X.shape[0]
    #print(train_per);
    X_train= X.iloc[:round(train_per*.75)];
    X_test=X.iloc[-round(train_per*.25):];
    y_train=y.iloc[:round(train_per*.75)];
    y_test=y.iloc[-round(train_per*.25):];

    if DEBUG:
        print("X_train:\n",X_train);
        print("X_test:\n",X_test);
        print("y_train:\n",y_train);
        print("y_test:\n",y_test);
    # import the class
    from sklearn.linear_model import LogisticRegression
    # import the metrics class
    from sklearn import metrics
    # set up and train the model
    # instantiate the model (using the default parameters)
    logreg = LogisticRegression(max_iter=200)
    # fit the model with data
    logreg.fit(X_train,y_train)
    '''
    # makes a file name
    filename = '{}.sav'.format(model_name);
    # save the model to disk
    pickle.dump(logreg, open(filename, 'wb'))
    '''
        
    """
    #notes 
    # Step 4: Evaluate the model : learn with one we ready need.
    p_pred = logreg.predict_proba(x_test)
    y_pred = logreg.predict(x_test)
    score_ = logreg.score(x, y)
    conf_m = confusion_matrix(y, y_pred)
    report = classification_report(y, y_pred)
    """
    #
    p_pred = logreg.predict_proba(X_test)
    y_pred=logreg.predict(X_test)
    if DEBUG:
        print(" p_pred", p_pred);
        print("y_pred", y_pred);
    #TODO set up way to get weights and names
    weights_b1 =logreg.coef_[0];
    b0=logreg.intercept_;
    
    Accuracy=metrics.accuracy_score(y_test, y_pred);
    if DEBUG:
        print("logreg.score(X_test, Y_test)",logreg.score(X_test, y_test));
        print("logreg.classes_",logreg.classes_);
        print("model.intercept_: ",logreg.intercept_)
        """
        intercept: logreg.intercept_  is b0
        predicted weights are just coefficients  ie b1,b2.....
        """
        print("len(model.coef_: ",len(logreg.coef_[0]));
        print("model.coef_: ",logreg.coef_[0]);
        # needs to see which teams are on this y_pred.
        print("y_pred",y_pred);
        print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
    return b0,weights_b1,Accuracy;
    #________________________________________________
''' make its own file for when to call the model
        if os.path.isfile(filename):
            logreg = pickle.load(open(filename, 'rb'))
        else:
            # instantiate the model (using the default parameters)
            logreg = LogisticRegression(max_iter=200)
            # fit the model with data
            logreg.fit(X_train,y_train)
            # save the model to disk
            pickle.dump(logreg, open(filename, 'wb'))
    '''
