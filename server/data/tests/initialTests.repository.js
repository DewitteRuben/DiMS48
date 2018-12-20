const initialTests = require('./initialTests.json');
const Test = require('../../models/defaultModels').Test;

const getDatabaseModel = function getDatabaseModel() {
    return Test;
};

const getTests = function getTests() {
    const tests = [];

    initialTests.forEach((test) => tests.push(new Test(test)));

    return tests;
};

module.exports = {
    getDatabaseModel,
    getTests,
};
