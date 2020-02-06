const express = require('express');

const path = require('path');

const logger = require('./middleware/logger');

const app = express();

//init middleware
app.use(logger);

//BodyParserMiddleware
app.use(express.json());
app.use(express.urlencoded({extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

app.use('/api/tests', require('./routes/api/tests'));

app.use('/api/login', require('./routes/api/login'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


