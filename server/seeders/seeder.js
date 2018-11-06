const mongoose = require('mongoose');
const Image = require('../models/defaultModels').Image;
const getImages = require('./imagesSeeder').getImages;

const Instuctions = require('../models/DiMS48Models').Instructions;
const instructionSeeder = require('../seeders/instructionsSeeder');

function checkImages() {
    let queryImages = Image.find();
    queryImages.exec(function (err, data) {
        if (data.length === 0)
          getImages().forEach(img => img.save());
    })
}

function checkInstructions() {
    const queryInstructions = Instuctions.find();
    queryInstructions.exec((err, data) => {
        if (data.length <= 0) {
            instructionSeeder.getInstructions().save();
        }
    })
}

function checkAll() {
    checkImages();
    checkInstructions();
}

module.exports = {checkAll};
