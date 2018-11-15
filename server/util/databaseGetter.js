const mongoose = require('mongoose');

let DiMS48Config;
let TestsConfig;

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    DiMS48Config = require('../config/DiMS48/mongo.production.config');
    TestsConfig = require('../config/Tests/mongo.production.config');
}else {
    DiMS48Config = require('../config/DiMS48/mongo.development.config');
    TestsConfig = require('../config/Tests/mongo.development.config');
}

const DiMS48Database = mongoose.createConnection(`${DiMS48Config.prefix}${DiMS48Config.user}${(DiMS48Config.user !== '' && DiMS48Config.password !== '') ? ':' : ""}${DiMS48Config.password}@${DiMS48Config.URI}:${DiMS48Config.port}/${DiMS48Config.databaseName}`,
    {useNewUrlParser: true});
const TestDatabase = mongoose.createConnection(`${TestsConfig.prefix}${TestsConfig.user}${(TestsConfig.user !== '' && TestsConfig.password !== '') ? ':' : ""}${TestsConfig.password}@${TestsConfig.URI}:${TestsConfig.port}/${TestsConfig.databaseName}`,
    {useNewUrlParser: true});
console.log("ROBIN HERE:");
console.log(TestDatabase);

module.exports = {
    DiMS48Database,
    TestDatabase
};
