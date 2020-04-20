Update with what you did and what you code needs to run (for model).
#####################################################################################################################################################################################################################################
> ZAB
	- Worked on Equation,  Backwards Elimination, Maximum Likelihood Estimation, and Random Forest

Uses all NCAA data (by year)
	The Random Forest is used as a feature reducer. 
	- Needs: a number to pick how many feature to reduce too , a pandas list of all data , and the attribute we think is the most important{"Act W %"} from data .
	- Returns : a list (non-pandas)

Uses Conf data (by year)
	Backwards Elimination is a feature selector need at list 9 teams to work right and can only pick the top 9 feature from the reducer.
	- Needs : pandas list of features from reducer from data , the attribute we think is the most important{'Act W %'} from data ,number of features you want from the selector, and the list of list of features from reducer.
	- Returns : a list (non-pandas)
	Maximum Likelihood Estimation is what gets the weights for the regression model.
	- Needs:pandas list of features from selector from data , the attribute we think is the most important{'Act W %'} from data.
	- Returns : a diction that matching the name to its value weight.

#####################################################################################################################################################################################################################################
> AMA
	- Worked on Correlation Matrix to get the information extracted correctly (also removed bugs that incorrectly named attributes)

Uses all NCAA data besides Conf and Team (by year)
	The Correlation Matrix is being used as a feature reducer and selector.
	- Needs: a pandas list of all the data, the number of wanted output variables, and the year for the data
	- Returns: a list of the wanted variables (top n attributes in terms of correlation with {'Act W %'})

Note:	Correlation_Matrix.py is the version continuing on to work with the model.
	Correlation_Matrix_For_RFE.py is the version with the visual representation, print statements, and other debugging options. (Travis is using this version.)

#####################################################################################################################################################################################################################################