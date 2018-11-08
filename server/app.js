var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const seeder = require('./seeders/seeder');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

const isProduction = process.env.NODE_ENV === 'production';

let mongoConfig;

if (isProduction) {
    mongoConfig = require('./config/mongo.production.config')
}else {
    mongoConfig = require('./config/mongo.development.config')
}

mongoose.connect(`${mongoConfig.prefix}${mongoConfig.user}${(mongoConfig.user !== '' && mongoConfig.password !== '') ? ':' : ""}${mongoConfig.password}@${mongoConfig.URI}:${mongoConfig.port}/${mongoConfig.databaseName}`,
    {useNewUrlParser: true});

seeder.checkAll(); //Checks wether seeding is needed and seeds accordingly

var app = express();

app.use(cors({credentials: true, origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
//     app.get('*', (request, response) => {
//         response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//     });
// }

module.exports = app;
