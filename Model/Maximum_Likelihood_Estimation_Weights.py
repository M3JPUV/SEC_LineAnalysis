#Maximum Likelihood Estimation weights 
#takes in list of fearutes and a team with the df["Act W %"] of that team as pandas list
    #to get weights on
from __future__ import print_function
from scipy import stats
import statsmodels.api as sm
from statsmodels.base.model import GenericLikelihoodModel
def MLEW(exog,endog):
    # re-gets list for names 
    #print("exog\n",exog); 
    #endog = df["Act W %"]
    exog = sm.add_constant(exog, prepend=True)
    '''
    print(exog.columns);
    print("endog.shape\n",endog.shape);
    print("exog.shape\n",exog.shape);
    print('endog\n',endog);
    print('exog\n',exog);
    '''

    sm_probit_canned = sm.Probit(endog, exog).fit()
    # pritns a nice looking table 
    #print(sm_probit_canned.summary());
    #prints all teh values , no fancy table 
    #print(sm_probit_canned.cov_params());
    #print(sm_probit_canned.params);
    #print(sm_probit_canned.params[0]);
    Dict_with_weights= {};
    for i in range(exog.shape[1]):
        #print(exog.columns[i]);
        #print(sm_probit_canned.params[0]);
        #name{exog[0]} #value:{weight}{sm_probit_canned.params[0]}
        Dict_with_weights[exog.columns[i]] = sm_probit_canned.params[i];
    #print(Dict_with_weights);
    return Dict_with_weights;

