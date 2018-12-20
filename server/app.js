var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const seeder = require('./seeders/seeder');
const fileupload = require('express-fileupload');

var apiRouter = require('./routes/api');

var app = express();

const isProduction = process.env.NODE_ENV === 'production';

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
app.use(fileupload());

app.use('/api', apiRouter);

//if (isProduction) {
     app.use(express.static('./build'));
     app.get('*', (request, response) => {
         response.sendFile(path.join(__dirname, './build', 'index.html'));
     });
//}

module.exports = app;
