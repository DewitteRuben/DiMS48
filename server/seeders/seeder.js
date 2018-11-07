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
    const queryImages = Image.find();
    queryImages.exec(function (err, data) {
        if (data.length === 0)
          getImages().forEach(img => img.save());
    })
}

function checkInstructions() {
    const queryInstructions = Instuction.find();
    queryInstructions.exec((err, data) => {
        if (data.length <= 0) {
            getInstructions().forEach((instruction) => instruction.save());
        }
    })
}

function checkOptions() {
    const queryOptions = Option.find();
    queryOptions.exec((err, data) => {
        if(data.length <= 0){
            optionSeeder.getOptions().forEach((option) => option.save());
        }
    })
}

function checkTests(){
  const queryTests = Test.find();
  queryTests.exec((err, data)=>{
    if (data.length <= 0){
      getTests().forEach(test=> test.save());
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
