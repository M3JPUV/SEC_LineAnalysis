express = require('express');
//L. require express
router = express.Router();
//L. require router
Sequelize = require('sequelize');
//L. require sequelize
foundEmail = null;
foundPassword = null;
//L. Initialize global variables to null

router.get('/:email/:password', (req, res) => {
    var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
    host: "138.47.204.103",
    port: 3306,
    dialect: 'mysql'
    });
    //L. Database connection object
    sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
    }).finally(() => {
    sequelize.close();
    });
    //L. Authenticate database conenction
    email = req.params.email;
    password = req.params.password;
    //L. Attempt to find if the email is valid
        Eresults = sequelize.query(`SELECT DISTINCT u.Email, u.Password FROM Users AS u WHERE u.Email = "${email}" and u.Password = "${password}"`,{raw: true, type: sequelize.QueryTypes.SELECT}).then(data => {
            //L. Query for username and password
            foundEmail = null;
            foundPassword = null;
            //L. if you dont set these global variables to null, it never resets the variables
            data.forEach( (row) => {
                foundEmail = row.Email;
                foundPassword = row.Password;
            });
            //L. gets the data from the TextRow object
            //console.log(foundEmail);
            //console.log(foundPassword);
            //L. for debugging purposes
            if (foundEmail !== null && foundPassword !== null){
                res.status(200).json("Succesful Login");
                sequelize.close();
                //L. if the query results were not null, return successful login and return 200
            }
            else{
                res.status(400).json("Invalid email or password");
                sequelize.close();
                //L. if the query results were null, return unsucessful and return 400
            }
                    }).catch(err => console.log(err));
                    //L. catch errors
});
    
module.exports = router;
