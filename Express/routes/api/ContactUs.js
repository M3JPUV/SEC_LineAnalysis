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
    var Email = object.Email;
    var Subject = object.Subject;
    var Message = object.Message;
    var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
    host: "138.47.204.103",
    port: 3306,
    dialect: 'mysql',
    //Dont allow logging
    logging: true
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
        Eresults = sequelize.query(`INSERT INTO Contact (Email, Subject, Message) VALUES ('${Email}', '${Subject}', '${Message}');`).then(send => { 
                                return res.status(200).json("Succesful Message");
                                    }).catch(err => {
                                        console.log(err); 
                                        return res.status(500).json("Unsuccesful SignUp");
                                        });
                                            //L. catch errors
});
    
module.exports = router;
