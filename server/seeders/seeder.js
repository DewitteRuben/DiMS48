const mongoose = require('mongoose');
const defaultModels = require('../models/defaultModels');
const DiMS48Models = require('../models/DiMS48Models');

const imageSeeder = require('./imagesSeeder');
const instructionSeeder = require('./instructionsSeeder');

const Option = require('../models/DiMS48Models').Option;
const optionSeeder = require('../seeders/optionsSeeder');

const Test = defaultModels.Test;
const getTests = require('./testsSeeder').getTests;

const checkAndSeedImages = function checkImages() {
    console.log('Checking Images');
    imageSeeder.isDatabaseSeeded()
        .then((isDatabaseSeeded) => {
            if (!isDatabaseSeeded) {
                console.log('Images need seeding');
                imageSeeder.seed();
            } else {
                console.log('Images don\'t need seeding');
            }
        });
}

const checkAndSeedInstructions = function checkAndSeedInstructions() {
    console.log('Checking Instructions');

    instructionSeeder.isDatabaseSeeded()
        .then((isDatabaseSeeded) => {
            if (!isDatabaseSeeded) {
                console.log('Instructions need seeding');
                instructionSeeder.seed();
            } else {
                console.log('Instructions don\'t need seeding');
            }
        });
};

function checkOptions() {
    console.log('Checking Options');
    const queryOptions = Option.find();
    queryOptions.exec((err, data) => {
        if (data.length <= 0) {
            console.log('Options need seeding');
            optionSeeder.getOptions().forEach((option) => option.save());
            console.log('Options seeded');
        }
    });
}

function checkTests() {
    console.log('Checking tests');
    const queryTests = Test.find();
    queryTests.exec((err, data) => {
        if (err) console.log(err);
        if (data.length <= 0) {
            console.log('Tests need seeding');
            getTests().forEach(test => test.save());
            console.log('Tests seeded');
        }
    });
}

function checkAll() {
    checkAndSeedImages();
    checkAndSeedInstructions();
    checkOptions();
    checkTests();
}

module.exports = {
    checkAll
};