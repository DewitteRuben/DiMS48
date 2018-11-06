const mongoose = require('mongoose');
let Image = require('../models/defaultModels.js').Image;
let Images = require('../models/DiMS48Models.js').Images;

let src = './assets/images' // TODO: Change to right dir
let amountOfImages = 48;

function getImages(){
  let imagesArr = [];

  for(let i=1; i<=amountOfImages; i++){
    let idA = `A${i}`;
    let idB = `B${i}`;
    let localSrc = `set${i}`;

    imagesArr.push(makeImage(localSrc, idA));
    imagesArr.push(makeImage(localSrc, idB));
  }

  return new Images({
    images: imagesArr
  })
}

module.exports = { getImages }

function makeImage(localSrc, id){
  return new Image({
    id: id,
    imgUrl: `${src}/${localSrc}/${id}.jpg`
  })
}
