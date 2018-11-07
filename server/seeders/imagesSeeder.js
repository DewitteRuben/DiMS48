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

    let amountColours = getAmountOfColours(i);
    let set = getSet(i);
    imagesArr.push(makeImage(localSrc, idA, amountColours));
    imagesArr.push(makeImage(localSrc, idB, set));
  }
  return imagesArr;
}

module.exports = { getImages, amountOfImages: amountOfImages*2, getSet };

function makeImage(localSrc, id, extra){
  return new Image({
    _id: id,
    imgUrl: `${src}/${localSrc}/${id}.jpg`,
    extra: extra
  })
}

function getAmountOfColours(index){
  switch (index) {
    case 1: return '>=3'
    case 2: return '>=3'
    case 3: return '>=3'
    case 4: return '<=2'
    case 5: return '>=3'
    case 6: return '>=3'
    case 7: return '>=3'
    case 8: return '<=2'
    case 9: return '<=2'
    case 10: return '>=3'
    case 11: return '>=3'
    case 12: return '>=3'
    case 13: return '>=3'
    case 14: return '<=2'
    case 15: return '<=2'
    case 16: return '<=2'
    case 17: return '>=3'
    case 18: return '>=3'
    case 19: return '<=2'
    case 20: return '>=3'
    case 21: return '>=3'
    case 22: return '<=2'
    case 23: return '<=2'
    case 24: return '>=3'
    case 25: return '>=3'
    case 26: return '>=3'
    case 27: return '<=2'
    case 28: return '>=3'
    case 29: return '>=3'
    case 30: return '<=2'
    case 31: return '>=3'
    case 32: return '<=2'
    case 33: return '>=3'
    case 34: return '>=3'
    case 35: return '<=2'
    case 36: return '>=3'
    case 37: return '<=2'
    case 38: return '<=2'
    case 39: return '<=2'
    case 40: return '>=3'
    case 41: return '>=3'
    case 42: return '<=2'
    case 43: return '<=2'
    case 44: return '<=2'
    case 45: return '<=2'
    case 46: return '>=3'
    case 47: return '>=3'
    case 48: return '>=3'
    default: return ''
  }
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
