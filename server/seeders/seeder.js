const mongoose = require('mongoose');
const Image = require('../models/defaultModels').Image;
const getImages = require('./imagesSeeder').getImages;

const Instuction = require('../models/DiMS48Models').Instruction;
const instructionSeeder = require('../seeders/instructionsSeeder');

const Option = require('../models/DiMS48Models').Option;
const optionSeeder = require('../seeders/optionsSeeder');

function checkImages() {
    let queryImages = Image.find();
    queryImages.exec(function (err, data) {
        if (data.length === 0)
          getImages().forEach(img => img.save());
    })
}

function checkInstructions() {
    const queryInstructions = Instuction.find();
    queryInstructions.exec((err, data) => {
        if (data.length <= 0) {
            instructionSeeder.getInstructions().forEach((instruction) => instruction.save());
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

function checkAll() {
    checkImages();
    checkInstructions();
    checkOptions();
}

module.exports = {checkAll};
