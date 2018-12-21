const imageSeeder = require('./imagesSeeder');
const instructionSeeder = require('./instructionsSeeder');
const optionSeeder = require('./optionsSeeder');
const testSeeder = require('./testsSeeder');

const log4js = require('log4js');
const infoLogger = log4js.getLogger('info');

const checkAndSeedImages = function checkImages() {
    console.log('Checking Images');

    imageSeeder.isDatabaseSeeded()
        .then((isDatabaseSeeded) => {
            if (!isDatabaseSeeded) {
                console.log('Images need seeding');
                imageSeeder.seed();
                infoLogger.info("Seeded images");
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
                infoLogger.info("Seeded instructions");
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
                infoLogger.info("Seeded options");
            } else {
                console.log('Options don\'t need seeding');
            }
        });
};

const checkAndSeedTests = function checkAndSeedTests() {
    console.log('Checking Tests');

    testSeeder.isDatabaseSeeded()
    .then((isDatabaseSeeded) => {
        if(!isDatabaseSeeded){
            console.log('Tests need seeding');
            testSeeder.seed();
            infoLogger.info('Seeded tests');
        }else{
            console.log('Tests don\'t need seeding');
        }
    });
};

const checkAndSeedAll = function checkAndSeedAll() {
    checkAndSeedImages();
    checkAndSeedInstructions();
    checkAndSeedOptions();
    checkAndSeedTests();
};

module.exports = {
    checkAndSeedAll
};