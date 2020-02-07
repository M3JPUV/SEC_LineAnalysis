//L. runs express
const express = require('express');
//L. 'router' is used to route traffic to the specified API
const router = express.Router();
//L. database communicator framework
const Sequelize = require('sequelize');

//L. GET request for api (...:500/api/tests/)
router.get('/', (req, res) => {
    //L. creates database connection object in sequelize 
    var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
    host: "138.47.204.103",
    port: 3306,
    dialect: 'mysql'
    });
    //L. attemts to login
    sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
    }).finally(() => {
    sequelize.close();
    });
    //L. after succesful login
    try{
    //L. resulting queries
    sequelize.query("SELECT * FROM Users",{ type:           sequelize.QueryTypes.SELECT }).then(function(myTableRows) {
    console.log(myTableRows);
    //returns queries raw (successful code 200)
    return res.status(200).json(myTableRows);
    });
    } catch (err) {
    //L. returns error message (error code 400)
    return res.status(400).json("Error, table does not exist in SEC_LINE_ANALYSIS");
    };
});
//L. login API
router.get('/:email/:password', (req, res) => {
    //L. connect to database
    var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
    host: "138.47.204.103",
    port: 3306,
    dialect: 'mysql'
    });
    sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
    }).catch(err => {
    console.error('Unable to connect to the database:', err);
    }).finally(() => {
    sequelize.close();
    });
    //L. attempt to find if username and password match in the database
    try{
    //sequelize.query("SELECT * FROM Users",{ type:           sequelize.QueryTypes.SELECT }).then(function(myTableRows) {
    //console.log(myTableRows);
    //return res.status(200).json(myTableRows);
    //return res.status(201).json({msg: "success post for SEC_LINE_ANALYSIS"});
    //});

        console.log('Successful log in');
        console.log(`email: ${req.params.email}`);
        console.log(`password: ${req.params.password}`);
    return res.status(201).json({msg: "successful Login"});
    } catch (err) {
        return res.status(400).json("Error, Unable to log in");
    };
});

//L. Post
router.post('/', (req, res) => {
    return res.status(201).json({msg: "success post for SEC_LINE_ANALYSIS"});
});
//L. neccisary weird return thing
module.exports = router;
