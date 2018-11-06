const mongoose = require('mongoose');
const Images = require('../models/DiMS48Models').Images;
const getImages = require('./imagesSeeder').getImages;

const Instuctions = require('../models/DiMS48Models').Instructions;
const instructionSeeder = require('../seeders/instructionsSeeder');

function checkImages() {
    let queryImages = Images.find();
    queryImages.exec(function (err, data) {
        if (data.length >= 1) return;
        getImages().save();
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
