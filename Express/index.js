const express = require('express');

//const Sequelize = require('sequelize');

const path = require('path');

const logger = require('./middleware/logger');

//const databasePath1 = 'mysql://remoteuser:asdf@138.47.204.103:3306/DataBase1';

//const sequelize = new Sequelize(databasePath1);

const app = express();


//Database2
//var sequelize = new Sequelize('DataBase1', 'remoteuser', 'asdf', {
   // host: "138.47.204.103",
   // port: 3306,
   // dialect: 'mysql'
//});

//sequelize.authenticate().then(() => {
 //   console.log('Connection established successfully.');
//}).catch(err => {
 //   console.error('Unable to connect to the database:', err);
//}).finally(() => {
 //   sequelize.close();
//});

//init middleware
//app.use(logger);

//BodyParserMiddleware
app.use(express.json());
app.use(express.urlencoded({extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

app.use('/api/tests', require('./routes/api/tests'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


