const mongoose = require('mongoose');
const defaultModels = require('../models/defaultModels');
const DiMS48Models = require('../models/DiMS48Models');

const Image = defaultModels.Image;
const getImages = require('./imagesSeeder').getImages;

const Instuction = DiMS48Models.Instruction;
const getInstructions = require('./instructionsSeeder').getInstructions;

const Option = require('../models/DiMS48Models').Option;
const optionSeeder = require('../seeders/optionsSeeder');

const Test = defaultModels.Test;
const getTests = require('./testsSeeder').getTests;

function checkImages() {
  console.log('Checking images');
    const queryImages = Image.find();
    queryImages.exec(function (err, data) {
        if (data.length === 0){
          console.log('Images need seeding');
          getImages().forEach(img => img.save());
          console.log('Images seeded');
        }
    })
}

function checkInstructions() {
    const queryInstructions = Instuction.find();
    console.log('Checking Instructions');
    queryInstructions.exec((err, data) => {
        if (data.length <= 0) {
            console.log('Instructions need seeding');
            getInstructions().forEach((instruction) => instruction.save());
            console.log('Instructions seeded');
        }
    })
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
    })
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
  })
}

function checkAll() {
    checkImages();
    checkInstructions();
    checkOptions();
    checkTests();
}

module.exports = {checkAll};
