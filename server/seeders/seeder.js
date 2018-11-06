const mongoose = require('mongoose');
const Images = require('../models/DiMS48Models').Images;
const getImages = require('./imagesSeeder').getImages;

function checkImages(){
  let queryImages = Images.find();
  queryImages.exec(function(err,data){
    if(data.length >= 1) return;
    getImages().save();
  })
}

function checkAll(){
  checkImages();
}

module.exports = { checkAll };
