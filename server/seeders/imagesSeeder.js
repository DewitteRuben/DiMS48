const mongoose = require('mongoose');
let Image = require('../models/defaultModels.js').Image;

let src = './assets/images' // TODO: Change to right dir
let amountOfImages = 48;

function getImages(){
  let imagesArr = [];

  for(let i=1; i<=amountOfImages; i++){
    let idA = `A${i}`;
    let idB = `B${i}`;
    let localSrc = `set${i}`;

    let set = getSet(i);
    imagesArr.push(makeImage(localSrc, idA));
    imagesArr.push(makeImage(localSrc, idB));
  }
  return imagesArr;
}

module.exports = { getImages, amountOfImages: amountOfImages*2 };

function makeImage(localSrc, id, set){
  return new Image({
    _id: id,
    imgUrl: `${src}/${localSrc}/${id}.jpg`,
    set: set
  })
}

function getSet(index){
  switch (index) {
    case 1: return 'G'
    case 2: return 'A'
    case 3: return 'G'
    case 4: return 'G'
    case 5: return 'U'
    case 6: return 'G'
    case 7: return 'A'
    case 8: return 'U'
    case 9: return 'A'
    case 10: return 'G'
    case 11: return 'U'
    case 12: return 'A'
    case 13: return 'G'
    case 14: return 'A'
    case 15: return 'U'
    case 16: return 'U'
    case 17: return 'A'
    case 18: return 'U'
    case 19: return 'A'
    case 20: return 'G'
    case 21: return 'U'
    case 22: return 'G'
    case 23: return 'A'
    case 24: return 'G'
    case 25: return 'A'
    case 26: return 'G'
    case 27: return 'A'
    case 28: return 'G'
    case 29: return 'G'
    case 30: return 'U'
    case 31: return 'U'
    case 32: return 'G'
    case 33: return 'A'
    case 34: return 'G'
    case 35: return 'U'
    case 36: return 'A'
    case 37: return 'A'
    case 38: return 'U'
    case 39: return 'A'
    case 40: return 'U'
    case 41: return 'U'
    case 42: return 'U'
    case 43: return 'G'
    case 44: return 'A'
    case 45: return 'G'
    case 46: return 'U'
    case 47: return 'U'
    case 48: return 'G'
    default: return ''
  }
}
