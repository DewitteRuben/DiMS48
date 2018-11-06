const mongoose = require('mongoose');
const Images = require('../models/DiMS48Models').Images;
const getImages = require('./imagesSeeder').getImages;

const Instuction = require('../models/DiMS48Models').Instruction;
const instructionSeeder = require('../seeders/instructionsSeeder');

function checkImages() {
    let queryImages = Images.find();
    queryImages.exec(function (err, data) {
        if (data.length >= 1) return;
        getImages().save();
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
