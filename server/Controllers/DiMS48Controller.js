const DiMS48Models = require('../models/DiMS48Models');

function getImages(){
  return new Promise(function(s,f){
    let query = DiMS48Models.Images.find();
    query.exec(function(err, data){
      if(err)f(err);
      s(data);
    })
  })
}

function getInstructions(part){
  return new Promise(function(s,f){
    let query = DiMS48Models.Instructions.find(); // TODO: get instructions for part
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

module.exports = {
  getImages,
  getInstructions
}
