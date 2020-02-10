express = require('express');
//L. require express
router = express.Router();
//L. require router
Sequelize = require('sequelize');
//L. require sequelize
const bodyParser = require('body-parser');

var JSONparser = bodyParser.json();

router.post('/', JSONparser, (req, res) => {
    console.log(req.body);
    //L. Debugging purposes
    var myJsonObject = JSON.stringify(req.body);
    //console.log(myJsonObject);
    var object = JSON.parse(myJsonObject);
    var Fname = object.FirstName;
    var Lname = object.LastName;
    var email = object.Email;
    var password = object.Password;
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
    //L. Attempt to find if the email is valid
        Eresults = sequelize.query(`INSERT INTO Users (FirstName, LastName, Email, Status, Basic, Advanced, Pro, Password) VALUES ('${Fname}', '${Lname}', '${email}', '1', '1', '0', '0', '${password}');`).then(send => { 
                                return res.status(200).json("Succesful Signup");
                                    }).catch(err => {
                                        console.log(err); 
                                        return res.status(400).json("Unsuccesful SignUp");
                                        });
                                            //L. catch errors
});
    
module.exports = router;
