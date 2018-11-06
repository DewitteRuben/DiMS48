const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');

function getImages(){
  return new Promise(function(s,f){
    let query = defaultModels.Image.find();
    query.exec(function(err, data){
      if(err)f(err);
      s(data);
    })
  })
}

function getInstructions(part){
  let whereClause = part === 'begin' ? {$or:[{_id: "phase1"},{_id: "phase2"}]} : {_id: "phase3"};
  return new Promise(function(s,f){
    let query = DiMS48Models.Instruction.find(whereClause);
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
