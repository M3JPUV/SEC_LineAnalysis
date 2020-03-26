//L. import randomstring library
var randomstring = require("randomstring");
//L. import sequelize
Sequelize = require('sequelize');
//L. create read write files
var fs = require('fs');
//L. delete megatokens stored in server
//L. import randomstring library
var randomstring = require("randomstring");
//L. faster way of reading lines
var linereader = require('line-reader');

function cleanupAndCreateTokens() { 
fs.writeFile('tempTokens.txt', '', function (err) {
if (err) throw err;
console.log("Temp file contents deleted")});
//L. create megatokens and write them to file
var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
host: "138.47.204.103",
port: 3306,
dialect: 'mysql'
});
//L. Database connection object
sequelize.authenticate().then((async) => {

console.log('Connection established successfully.'); 
sequelize.query(`DELETE FROM TOKENS WHERE true=true;`).then(() => {
    for (i = 0; i < 100000; i++){
        var temp = randomstring.generate(1024);
        var temp2 = temp + "\n";
        fs.appendFileSync('tempTokens.txt', temp2, (err) => {if (err) throw err;});
    }
    console.log("Temp file created");
    linereader.eachLine('tempTokens.txt', function(line) {
    sequelize.query(`INSERT INTO TOKENS (token, used, ip) VALUES ('${line}', false, 0);`).then(send => {}).catch(err => {console.log(err);});

    }).catch(err => 
        {console.error('Unable to connect to the database:', err);})
})});

};

setInterval(cleanupAndCreateTokens, 7200000);
