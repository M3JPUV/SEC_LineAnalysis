express = require('express');
//L. require express
router = express.Router();
//L. require router
Sequelize = require('sequelize');
//L. require sequelize
const bodyParser = require('body-parser');

var JSONparser = bodyParser.json();

router.get('/', JSONparser, (req, res) => {
    var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
    host: "138.47.204.103",
    port: 3306,
    dialect: 'mysql',
    //Dont allow logging
    logging: false
    });
    //L. Database connection object
    sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
    }).finally(() => {});
    //L. Authenticate database conenction
        Eresults = sequelize.query(`SELECT DISTINCT g.awayTeam, g.VSorAT, g.homeTeam, g.PwinT FROM tempgames AS g WHERE true=true`,{raw: true, type: sequelize.QueryTypes.SELECT}).then(data => {
            //L. Query for username and password
            var aArr =[];
            var vArr = [];
            var hArr = [];
            var pArr = [];
            var aTeam = null;
            var VSorAT = null;
            var hTeam = null;
            var PwinT = null;
            //L. if you dont set these global variables to null, it never resets the variables
            data.forEach( (row) => {
                aTeam = row.awayTeam;
                VSorAT = row.VSorAT;
                hTeam = row.homeTeam;
                PwinT = row.PwinT;
                aArr.push(aTeam);
                vArr.push(VSorAT);
                hArr.push(hTeam);
                pArr.push(PwinT);
            });

            var JSONobj = [];
            for (i=0; i < aArr.length; i++){
                var myJSON = {
                    'awayTeam': aArr[i],
                    'VSorAT': vArr[i],
                    'homeTeam':hArr[i],
                    'PwinT':pArr[i],
                     }
                console.log(aArr);
                console.log(myJSON);
                JSONobj.push(myJSON);
             }
            
            
            res.status(200).json(JSONobj);
            }).catch(err => console.log(err));

});
    
module.exports = router;
