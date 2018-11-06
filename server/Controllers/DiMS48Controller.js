const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');

function getTests(){
  return new Promise(function(s,f){
    let query = defaultModels.Test.find();
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

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

function getOptions(part){
  let whereClause = part === 'begin' ? {$or:[{_id: "phase1Options"},{_id: "phase2Options"}]} : {_id: "phase2Options"};
  return new Promise(function(s,f){
    let query = DiMS48Models.Option.find(whereClause);
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

function getResults(){
  return new Promise(function(s,f){
    let query = DiMS48Models.Result.find();
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

function getResult(id){
  return new Promise(function(s,f){
    let query = DiMS48Models.Result.find({_id: id});
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

function getUnfinishedTests(){
  return new Promise(function(s,f){
    let query = DiMS48Models.Result.find({ $where: "this.answersPhase3.length <= 0"});
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

function addResult(data){
  return new Promise((resolve, reject) => {
    const newResult = new DiMS48Models.Result(data);
    newResult.save((err, data) => {
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  })
}

module.exports = {
  getTests,
  getImages,
  getInstructions,
  getOptions,
  getResults,
  getResult,
  getUnfinishedTests,
  getResult,
  addResult
};
