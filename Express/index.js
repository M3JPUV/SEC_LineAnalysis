//L. to run express
const express = require('express');
//L. for file paths
const path = require('path');
//L. Any middleware (i.e. any nodejs file to br run intermiddedly) nedds to be added like so
const logger = require('./middleware/logger');
//L. anything we do is called ''app'' that is ran in the express framework
const bodyParser = require('body-parser');
var cors = require('cors');

var urlencodedParser = bodyParser.urlencoded({extended: false});

const app = express();

//L. init middleware
app.use(logger);

//L. BodyParser (Used for json files)
app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.use(cors());

//L. default page when hitting our website (should be front end?)
app.use(express.static(path.join(__dirname, 'public')));

//L. each api hit that contains /api/... uses these files and this format to be used in out application

//L. placeholder
app.use('/api/members', require('./routes/api/members'));

//L. Check login token
app.use('/api/checkTokens', require('./routes/security/tokens'));

//L. Gamebox
app.use('/api/gamebox', require('./routes/api/gamebox'));

//L. Sign up
app.use('/api/signup', require('./routes/api/signup'));

//L. Contact Us
app.use('/api/ContactUs', require('./routes/api/ContactUs'));

//L. Get live game scores
app.use('/api/Scores', require('./routes/api/LiveScores'));

//L. all testing APIs go under this file name
app.use('/api/tests', require('./routes/api/tests'));

//L. Login API
app.use('/api/login', require('./routes/api/login'));

//L. Stores our port#
const PORT = process.env.PORT || 5000;
//L. Starts app and listens on the specified port number
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

