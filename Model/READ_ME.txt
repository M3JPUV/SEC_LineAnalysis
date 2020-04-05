update with what you did and what you code needs to run
-ZAB
workded on Backwards Elimination,Maximun Likelihodd Estimation, and Radom Forest
uses all NCAA data (by year)
Radom Forest is used as a feature reducer. needs: a number to pick how many feature to reduce too , a pandas list of all data , and the attribute we think is the most important{"Act W %"} from data .returns : a list (non-pandas)
Uses Conf data by year
Backwards Elimination is a feature selector need at list 9 teams to work right and can only pick the top 9 feature from the reducer. needs : pandas list of features from reducer from data , the attribute we think is the most important{"Act W %"} from data ,number of features you want from the selector, and the list of list of features from reducer. returns : a list (non-pandas)
Maximun Likelihodd Estimation is what gets the weights for the regrssion model. needs:pandas list of features from selector from data , the attribute we think is the most important{"Act W %"} from data.returns : a diction that matching the name to its value weight.