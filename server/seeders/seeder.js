const mongoose = require('mongoose');
const defaultModels = require('../models/defaultModels');
const DiMS48Models = require('../models/DiMS48Models');

const imageSeeder = require('./imagesSeeder');

const Instruction = DiMS48Models.Instruction;
const getInstructions = require('./instructionsSeeder').getInstructions;

const Option = require('../models/DiMS48Models').Option;
const optionSeeder = require('../seeders/optionsSeeder');

const Test = defaultModels.Test;
const getTests = require('./testsSeeder').getTests;

const checkImages = function checkImages() {
  console.log('Checking Images');
  imageSeeder.isDatabaseSeeded()
  .then((isDatabaseSeeded) => {
    if(!isDatabaseSeeded){
        console.log('Images need seeding');
        imageSeeder.seed();
    }else{
        console.log('Images don\'t need seeding');
    }
  });
}

function checkInstructions() {
    const queryInstructions = Instruction.find();
    console.log('Checking Instructions');
    queryInstructions.exec((err, data) => {
        if (data.length <= 0) {
            console.log('Instructions need seeding');
            getInstructions().forEach((instruction) => instruction.save());
            console.log('Instructions seeded');
        }
    });
}

function checkOptions() {
  console.log('Checking Options');
    const queryOptions = Option.find();
    queryOptions.exec((err, data) => {
        if(data.length <= 0){
            console.log('Options need seeding');
            optionSeeder.getOptions().forEach((option) => option.save());
            console.log('Options seeded');
        }
    });
}

function checkTests(){
  console.log('Checking tests');
  const queryTests = Test.find();
  queryTests.exec((err, data)=>{
    if(err)console.log(err);
    if (data.length <= 0){
      console.log('Tests need seeding');
      getTests().forEach(test=> test.save());
      console.log('Tests seeded');
    }
  });
}

function checkAll() {
    checkImages();
    checkInstructions();
    checkOptions();
    checkTests();
}

module.exports = {checkAll};
