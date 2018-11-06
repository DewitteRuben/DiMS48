const mongoose = require('mongoose');
const Image = require('../models/defaultModels').Image;
const getImages = require('./imagesSeeder').getImages;

const Instuction = require('../models/DiMS48Models').Instruction;
const instructionSeeder = require('../seeders/instructionsSeeder');

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
            console.log(instructionSeeder.getInstructions());
            instructionSeeder.getInstructions().forEach((instruction) => instruction.save());
        }
    })
}

function checkAll() {
    checkImages();
    checkInstructions();
}

module.exports = {checkAll};
