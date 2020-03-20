express = require('express');
//L. require express
router = express.Router();
//L. require router
Sequelize = require('sequelize');
//L. require sequelize
foundEmail = null;
foundPassword = null;
//L. Initialize global variables to null
const bodyParser = require('body-parser');

var passwordHash = require('password-hash');

var JSONparser = bodyParser.json();

router.post('/', JSONparser, (req, res) => {
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
    }).finally(() => {});
    //L. Authenticate database conenction
    var myJsonObject = JSON.stringify(req.body);
    //console.log(myJsonObject);
    var object = JSON.parse(myJsonObject);
    var email = object.Email;
    var password = object.Password;
    console.log(`Attempted login with email: ${email} and password: ${password}`);
    //L. Attempt to find if the email is valid
        Eresults = sequelize.query(`SELECT DISTINCT u.Email, u.Password FROM Users AS u WHERE u.Email = "${email}"`,{raw: true, type: sequelize.QueryTypes.SELECT}).then(data => {
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
                //check the hashed password
                if(passwordHash.verify(password, foundPassword)){
                    //200 successful login
                    //get token
                    sequelize.query(`SELECT DISTINCT token FROM TOKENS WHERE used = false LIMIT 1`, {raw: true, type: sequelize.QueryTypes.SELECT}).then(data => {
                    token = null;
                    data.forEach( (row) => {
                        token = row.token;});
                    //L. set token as used and add users ip (for identification)
                    sequelize.query(`UPDATE TOKENS SET used = true, ip = '${req.connection.remoteAddress}' WHERE token = "${token}"`, {raw: true, type: sequelize.QueryTypes.UPDATE}).then(data => {res.status(200).json(token);});
                    });
                } else{
                    //incorrect password = 401
                res.status(401).json();
                };
                //L. if the query results were not null, return successful login and return 200
            }
            else{
                    //email does not match our records = 402
                res.status(402).json();
                //L. if the query results were null, return unsucessful and return 400
            }
                    }).catch(err => console.log(err));
                    //L. catch errors
});
    
module.exports = router;
