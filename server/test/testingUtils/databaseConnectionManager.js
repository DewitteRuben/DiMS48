const mongoose = require('mongoose');
const mongoConfig = require('../../config/mongo.test.config');

const hasUserAndPassword = (mongoConfig.user !== '' && mongoConfig.password !== '');
const connectionString = `${mongoConfig.prefix}${mongoConfig.user}${(hasUserAndPassword) ? ':' : ""}${mongoConfig.password}${(hasUserAndPassword) ? '@' : ""}${mongoConfig.URI}:${mongoConfig.port}/${mongoConfig.databaseName}`;

let amountRequested = 0;

const databaseConnectionManager = function connectDatabase(){
    mongoose.connect(connectionString, {useNewUrlParser: true});
    amountRequested += 1;
};

const disconnectDatabase = function disconnectDatabase(){
    amountRequested -= 1;
    if(amountRequested <= 0){
        mongoose.connection.close();
    }
};

module.exports = {
    connectDatabase: databaseConnectionManager,
    disconnectDatabase,
};
