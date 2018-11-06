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

function getInstructions(){
  return new Promise(function(s,f){
    let query = DiMS48Models.Instructions.find();
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
