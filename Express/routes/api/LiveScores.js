express = require('express');
//L. require express
router = express.Router();
//L. require router
Sequelize = require('sequelize');
//L. require sequelize
const bodyParser = require('body-parser');
//L. For hitting the sports API
const axios = require('axios');

var JSONparser = bodyParser.json();

router.get('/', JSONparser, (req, res) => {
   axios.get("http://api.collegefootballdata.com/games?year=2019&seasonType=regular").then(data => {
    var masterString = [];
    var MyJSON = [];
    MyJSON = JSON.stringify(data.data);
    var a = JSON.parse(MyJSON);
    var i = 0;
    for (i = 0; i < a.length; i++){
        var init = "Week";
        var week = a[i].week;
        var homeTeam = a[i].home_team;
        var vs = "vs";
        var awayTeam = a[i].away_team;
        var final = "FINAL:";
        var finalScore = "";
        if (parseInt(a[i].home_points) > parseInt(a[i].away_points)){
            finalScore = homeTeam + ": " + a[i].home_points + "-" + a[i].away_points;
        }
        else{
            finalScore = awayTeam + ": " + a[i].away_points + "-" + a[i].home_points;
        }
        var finalstring = init + " " + week + " | " + homeTeam + " "  + vs + " " + awayTeam + " " + final + " " + finalScore;
        masterString.push(finalstring);
        
    }
    return res.status(200).send(masterString);
    }).catch(err => {console.log(err)});
});


module.exports = router;
