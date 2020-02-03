const express = require('express');

const Sequelize = require('sequelize');

const path = require('path');

const logger = require('./middleware/logger');

const databasePath1 = 'mysql://root:asdf@138.47.204.104:1433/DataBase1';

const sequelize = new Sequelize(databasePath1);

const app = express();

sequelize.authenticate().then(() => {
    console.log('Connection established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
}).finally(() => {
    sequelize.close();
});

//Database2
var sequelize2 = new Sequelize('database2', 'username', 'password', {
    host: "102.252.3499",
    port: 26844,
    dialect: 'mysql'
});

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


