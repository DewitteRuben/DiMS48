const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const seeder = require('./seeders/seeder');
const fileupload = require('express-fileupload');
const fs = require("fs");

const log4jsConfig = require('./config/logger/log4js.config');
if ( !fs.existsSync(log4jsConfig.LOG_DIR) ) {
  fs.mkdirSync(log4jsConfig.LOG_DIR);
}

const log4js = require('log4js');
log4js.configure(log4jsConfig.config);
const infoLogger = log4js.getLogger();

var apiRouter = require('./routes/api');

var app = express();

const isProduction = process.env.NODE_ENV === 'production';

seeder.checkAndSeedAll();

app.use(function(req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  infoLogger.info(ip.toString(), "requested", req.path, "using", req.method);
  next();
});

app.use(session({
  secret: 'howtotestapps',
  resave: true,
  saveUninitialized: false
}));

app.use(cors({
  credentials: true,
  origin: true
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(fileupload());

app.use('/api', apiRouter);

//if (isProduction) {
app.use(express.static('./build'));
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, './build', 'index.html'));
});
//}

module.exports = app;