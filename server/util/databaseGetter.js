const mongoose = require('mongoose');

let DiMSConfig;
let TestsConfig;

const isProduction = process.env.NODE_ENV === 'production';
const isTesting = process.env.NODE_ENV === 'test';

if (isProduction) {
    console.log("MONGO: USING PRODUCTION DATABASE");
    DiMSConfig = require('../config/DiMS48/mongo.production.config');
    TestsConfig = require('../config/Tests/mongo.production.config');
} else if (isTesting) {
    console.log("MONGO: USING TESTING DATABASE");
    DiMSConfig = require('../config/DiMS48/mongo.test.config');
    TestsConfig = require('../config/Tests/mongo.test.config');
}else {
    DiMSConfig = require('../config/DiMS48/mongo.development.config');
    TestsConfig = require('../config/Tests/mongo.development.config');
}

const DiMS48ConnectionString = `${DiMSConfig.prefix}${DiMSConfig.user}${(DiMSConfig.user !== '' && DiMSConfig.password !== '') ? ':' : ""}${DiMSConfig.password}@${DiMSConfig.URI}:${DiMSConfig.port}/${DiMSConfig.databaseName}`;
const testConnectionString = `${TestsConfig.prefix}${TestsConfig.user}${(TestsConfig.user !== '' && TestsConfig.password !== '') ? ':' : ""}${TestsConfig.password}@${TestsConfig.URI}:${TestsConfig.port}/${TestsConfig.databaseName}`;

const DiMS48Database = mongoose.createConnection(DiMS48ConnectionString, {
    useNewUrlParser: true
});
const TestDatabase = mongoose.createConnection(testConnectionString, {
    useNewUrlParser: true
});

module.exports = {
    DiMS48Database,
    TestDatabase
};