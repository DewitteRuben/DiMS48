const initialOptions = require('./initialOptions.json');
const Option = require('../../../models/DiMS48Models').Option;

const getDatabaseModel = function getDatabaseModel(){
    return Option;
};

const getOptions = function getOptions(){
    const options = [];

    initialOptions.forEach(option => {
        options.push(new Option(option));
    });

    return options;
};

module.exports = {
    getDatabaseModel,
    getOptions,
};