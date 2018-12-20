const defaultModels = require('../models/defaultModels');

const imageSeeder = require('./imagesSeeder');
const instructionSeeder = require('./instructionsSeeder');
const optionSeeder = require('./optionsSeeder');

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
};

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

const checkAndSeedOptions = function checkAndSeedOptions() {
    console.log('Checking Options');

    optionSeeder.isDatabaseSeeded()
        .then((isDatabaseSeeded) => {
            if (!isDatabaseSeeded) {
                console.log('Options need seeding');
                optionSeeder.seed();
            } else {
                console.log('Options don\'t need seeding');
            }
        });
};

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
    checkAndSeedOptions();
    checkTests();
}

module.exports = {
    checkAll
};