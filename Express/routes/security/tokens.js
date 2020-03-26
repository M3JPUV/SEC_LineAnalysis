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
    var Token = object.Token;
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
    //L. hash the password
        Eresults = sequelize.query(`SELECT DISTINCT t.token FROM TOKENS AS t WHERE t.token = '${Token}' AND t.used = 1 AND t.ip = '${req.connection.remoteAddress}';`, {raw: true, type: sequelize.QueryTypes.SELECT}).then(data => { 
                                token = null;
                                data.forEach( (row) => {
                                token = row.token;});
                                if (token != null){
                                   return res.status(200).json("Token Approved");
                                }
                                else{
                                   return res.status(404).json("Incorrect token, please re-login");
                                }
                                    }).catch(err => {
                                        console.log(err); 
                                        return res.status(400).json("Unsuccesful token, please re-login");
                                        });
                                            //L. catch errors
});
    
module.exports = router;
