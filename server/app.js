var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const seeder = require('./seeders/seeder');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

const isProduction = process.env.NODE_ENV === 'production';

let mongoConfig;

if (isProduction) {
    mongoConfig = require('./config/DiMS48/mongo.production.config');
}else {
    mongoConfig = require('./config/DiMS48/mongo.development.config');
}

// mongoose.connect(`${mongoConfig.prefix}${mongoConfig.user}${(mongoConfig.user !== '' && mongoConfig.password !== '') ? ':' : ""}${mongoConfig.password}@${mongoConfig.URI}:${mongoConfig.port}/${mongoConfig.databaseName}`,
//     {useNewUrlParser: true});

seeder.checkAll();

app.use(session({
  secret: 'howtotestapps',
  resave: true,
  saveUninitialized: false
}));

app.use(cors({credentials: true, origin: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '/images')));

app.use('/api', apiRouter);

//if (process.env.NODE_ENV === 'production') {
     app.use(express.static('./build'));
     app.get('*', (request, response) => {
         response.sendFile(path.join(__dirname, './build', 'index.html'));
     });
//}

module.exports = app;
