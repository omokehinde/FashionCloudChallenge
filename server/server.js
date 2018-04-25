const express = require('express');
const morgan = require('morgan');             // log requests to the console (express4)
const bodyParser = require('body-parser');    // pull information from HTML POST (express4)
const mongoose = require('mongoose');
const config = require('./config/database');

// init app
const app = express();

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

mongoose.connect(config.database);
let db = mongoose.connection;

// check for db errors
db.on('error', function (err) {
    console.log(err);
});

// check connection
db.once('open', function () {
    console.log('Connected to MongoDB');
});

// Route file
let cache = require('./routes/cache');

// APIs
app.get('/api/users/index', (req, res) => {
    res.json({ name: "Micheal Smith" });
});

app.use('/api/v1', cache);

app.listen(3030, () => {
    console.log('Express is now listening on port 3030... ');
});