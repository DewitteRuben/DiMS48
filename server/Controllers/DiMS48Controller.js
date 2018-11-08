const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');

const scoreCalculator = require('../util/scoreCalculator');

function makeGetter(model, whereClause){
  return new Promise(function(s,f){
    let query = model.find(whereClause);
    query.exec(function(err,data){
      if(err)f(err);
      s(data);
    })
  })
}

function getTests(){
  return makeGetter(defaultModels.Test, null);
}

function getImages(){
  return makeGetter(defaultModels.Image, null);
}

function getInstructions(part){
  let whereClause = part === 'begin' ? {$or:[{_id: "phase1"},{_id: "interference"},{_id: "phase2"}]} : {_id: "phase3"};
  return makeGetter(DiMS48Models.Instruction, whereClause);
}

function getOptions(part){
  let whereClause = part === 'begin' ? {$or:[{_id: "phase1Options"},{_id: "phase2Options"}]} : {_id: "phase2Options"};
  return makeGetter(DiMS48Models.Option, whereClause);
}

function getResults(){
  return new Promise(function(s,f){
    makeGetter(DiMS48Models.Result, null).then(results=>{
      results.forEach(result=>{
        if(result.answersPhase3.answers.length <= 0) result.answersPhase3.scores = null;
      })
      s(results);
    }).catch(err=>f(err))
  })
}

function getResult(id){
  return makeGetter(DiMS48Models.Result, {_id: id});
}

function getUnfinishedTests(){
  return makeGetter(DiMS48Models.Result, { $where: "this.answersPhase3.answers.length <= 0"})
}

function addResult(data){
  return new Promise((resolve, reject) => {
    data['answersPhase1'] = {
      score: scoreCalculator.calculateScorePhase1(data.answersPhase1),
      answers: data.answersPhase1
    };
    data['answersPhase2'] = {
      scores: scoreCalculator.calculateScorePhase2(data.answersPhase2),
      answers: data.answersPhase2
    }
    data['answersPhase3'] = {
      scores: {
        abstractScore: 0,
        groupedScore: 0,
        uniqueScore: 0
      },
      answers: []
    };
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

function appendResult(data){
    return new Promise((resolve, reject) => {
      data['answersPhase3'] = {
        scores: scoreCalculator.calculateScore('phase2', data.answersPhase3),
        answers: data.answersPhase3
      };
      console.log(data.answersPhase3);
      DiMS48Models.Result.findByIdAndUpdate(data._id, {answersPhase3: data.answersPhase3}, (err, data) => {
           if(err){
               reject(err);
           }else{
               resolve();
           }
        })
    })
}

module.exports = {
  getTests,
  getImages,
  getInstructions,
  getOptions,
  getResults,
  getUnfinishedTests,
  getResult,
  addResult,
  appendResult,
};
