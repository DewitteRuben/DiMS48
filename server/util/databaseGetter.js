const mongoose = require('mongoose');

let DiM48Config;
let TestsConfig;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    DiM48Config = require('../config/DiMS48/mongo.production.config');
    TestsConfig = require('../config/Tests/mongo.production.config');
}else {
    DiM48Config = require('../config/DiMS48/mongo.development.config');
    TestsConfig = require('../config/Tests/mongo.development.config');
}

const DiMS48Database = mongoose.connection.useDb(DiM48Config.databaseName);
const TestDatabase = mongoose.connection.useDb(TestsConfig.databaseName);

module.exports = {
    DiMS48Database,
    TestDatabase
};
