//L. to run express
const express = require('express');
//L. for file paths
const path = require('path');
//L. Any middleware (i.e. any nodejs file to br run intermiddedly) nedds to be added like so
const logger = require('./middleware/logger');
//L. For handling templates
const EH = require('express-handlebars')
//L. anything we do is called ''app'' that is ran in the express framework
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({extended: false});

const app = express();

//L. init middleware
app.use(logger);

//For Handlebars


//L. BodyParser (Used for json files)
app.use(express.json());
app.use(express.urlencoded({extended: false }));

//L. default page when hitting our website (should be front end?)
app.use(express.static(path.join(__dirname, 'public')));

//L. each api hit that contains /api/... uses these files and this format to be used in out application

//L. placeholder
app.use('/api/members', require('./routes/api/members'));

//L. Sign up
app.use('/api/signup', require('./routes/api/signup'));

//L. all testing APIs go under this file name
app.use('/api/tests', require('./routes/api/tests'));

//L. Login API
app.use('/api/login', require('./routes/api/login'));

//L. Stores our port#
const PORT = process.env.PORT || 5000;
//L. Starts app and listens on the specified port number
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


