const DiMS48Models = require('../models/DiMS48Models');
const defaultModels = require('../models/defaultModels');
const imageAnswerValidators = require('../seeders/imagesSeeder');

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
  return makeGetter(DiMS48Models.Result, null);
}

function getResult(id){
  return makeGetter(DiMS48Models.Result, {_id: id});
}

function getUnfinishedTests(){
  return makeGetter(DiMS48Models.Result, { $where: "this.answersPhase3.length <= 0"})
}

function addResult(data){
  return new Promise((resolve, reject) => {
    data.answersPhase1 = {
      score: calculateScore('phase1', data.answersPhase1),
      answers: data.answersPhase1
    };
    data.answersPhase2 = {
      score: calculateScore('phase2', data.answersPhase2),
      answers: data.answersPhase2
    }
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

function calculateScore(phase, answers){
  switch (phase) {
    case 'phase1':
      const getAmountOfColours = imageAnswerValidators.getAmountOfColours;
      let amountRightAnswers = 0;
      answers.forEach(answer=>{
        let correctAnswer = getAmountOfColours(parseInt(answer._id.substring(1)));
        if(answer.answer === correctAnswer) amountRightAnswers++;
      })
      return (amountRightAnswers / Object.keys(imageAnswerValidators.amountOfColours).length) * 100;
      break;
    case 'phase2':
      const getSet = imageAnswerValidators.getSet;
      let amountRightAnswers = {abstract : 0, group: 0, unique: 0};
      answers.forEach(answer=>{
        let currentSet = getSet(parseInt(answer._id.substring(1)));
        if(answer.answer.substring(0,1) === 'A') {
          switch (currentSet) {
            case 'A':
              amountRightAnswers.abstract++;
              break;
            case 'U':
              amountRightAnswers.unique++;
              break;
            case 'G':
              amountRightAnswers.group++;
          }
        };
      })
      let amountAnswers = imageAnswerValidators.getAmountAnswers();
      return {
        abstractScore: amountRightAnswers.abstract / amountAnswers.abstract,
        groupedScore: amountRightAnswers.group / amountAnswers.group,
        uniqueScore: amountRightAnswers.unique / amountAnswers.unique
      }
  }
}

function appendResult(data){
    return new Promise((resolve, reject) => {
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
