const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

router.get('/', (req, res) => {
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

try{
    sequelize.query("SELECT * FROM Users",{ type: sequelize.QueryTypes.SELECT }).then(function(myTableRows) {
    console.log(myTableRows);
    return res.status(200).json(myTableRows);
});
} catch (err) {
    return res.status(400).json("Error, table does not exist in SEC_LINE_ANALYSIS");
    };
});

router.post('/', (req, res) => {


    return res.status(201).json({msg: "success post for SEC_LINE_ANALYSIS"});
});
    
module.exports = router;
