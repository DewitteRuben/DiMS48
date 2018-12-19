let DiMS48Models;
let defaultModels;

const scoreCalculator = require('../util/scoreCalculator');

const pdfGenerator = require('../util/fileGenerators/pdfGenerator/');
const excelGenerator = require('../util/fileGenerators/excelGenerator').makeExcel;
const excelGeneratorAll = require('../util/fileGenerators/excelGeneratorAll').makeExcel;

const imageSeeder = require('../seeders/imagesSeeder');

const locals = require('../locales/nl-BE.json');

  //TODO abstract error to seperate file?
  const invalidIdError = {
    name: 'CastError',
    description: 'Invalid Id Supplied'
  };

function makeGetter(model, whereClause, idNeeded, extraFields) {
  return new Promise(function (resolve, reject) {
    let fields = idNeeded ? {
      __v: 0
    } : {
      __v: 0,
      _id: 0
    };

    if (extraFields) {
      Object.keys(extraFields).forEach(key => {
        fields[key] = extraFields[key];
      });
    }

    let query = model.find(whereClause, fields).lean();

    query.exec(function (err, data) {
      if (err) reject(err);
      resolve(data);
    });
  })
}

function getTests() {
  return makeGetter(defaultModels.Test, null, true);
}

function getImages() {
  return makeGetter(defaultModels.Image, null, true);
}

//TODO SUPPORT FOR PART3
function getInstructions(part) {
  let whereClause = part === 'begin' ? {
    $or: [{
      _id: "phase1"
    }, {
      _id: "interference"
    }, {
      _id: "phase2"
    }, {
      _id: "end"
    }]
  } : {
    _id: "phase3"
  };
  return makeGetter(DiMS48Models.Instruction, null, true);
}

function getOptions(part) {
  let whereClause = part === 'begin' ? {
    $or: [{
      _id: "phase1"
    }, {
      _id: "phase2"
    }]
  } : {
    _id: "phase2"
  };
  return makeGetter(DiMS48Models.Option, null, true);
}

function getResults() {
  return new Promise(function (resolve, reject) {
    makeGetter(DiMS48Models.Result, null, true, {
        'phase1.answers': 0,
        'phase2.answers': 0
      }).then(results => {
        results.map(removeAnswersPhase3);
        results.map(convertGenderKeyToName);
        resolve(results);
      }).catch(err => {
        reject(err);
      });
  });
}

function removeAnswersPhase3(result) {
  if (result.phase3 !== null) {
    delete result.phase3.answers;
  }

  return result;
}

function convertGenderKeyToName(result){
  result.clientInfo.gender = genderKey2Name(result.clientInfo.gender);
  return result;
}

function getResult(id) {
  return makeGetter(DiMS48Models.Result, {
    '_id': id
  }, true)
  .then(result => {
    if(result.length <= 0){
      throw invalidIdError;
    }

    if(Array.isArray(result)){
      result = result[0];
    }

    if(result.clientInfo && result.clientInfo.gender){
      result.clientInfo.gender = genderKey2Name(result.clientInfo.gender);
    }

    return result;
  });
}

function addResult(data) {
  return new Promise((resolve, reject) => {
    data.timestamp = new Date();

    if (data.clientInfo && data.clientInfo.gender) {
      data.clientInfo.gender = data.clientInfo.gender.toLowerCase();
    }

    data['phase1'] = {
      score: scoreCalculator.calculateScorePhase1(data.phase1),
      answers: addCorrectAnswersPhase1(data.phase1)
    };

    data['phase2'] = {
      scores: scoreCalculator.calculateScorePhase2(data.phase2),
      answers: addCorrectAnswersPhase2(data.phase2)
    };

    data['phase3'] = null;

    const newResult = new DiMS48Models.Result(data);

    newResult.save((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
}

function appendResult(data) {
  return new Promise((resolve, reject) => {

    data.phase3 = {
      scores: scoreCalculator.calculateScorePhase2(data.phase3),
      answers: addCorrectAnswersPhase3(data.phase3)
    };

    DiMS48Models.Result.findByIdAndUpdate(data._id, {
      phase3: data.phase3
    }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
}

function removeResult(id){
  return new Promise((s,f)=>{
    DiMS48Models.Result.find({_id: id}).deleteOne(function(err){
      if(err)f(err);
      s();
    });
  });
}

const getPDF = function getPDF(id) {
    return getResult(id)
    .then((result) => {
      return pdfGenerator('DiMS48ReportTemplate', result, locals);
    });
};

const getExcel = function (id) {
  return getResult(id).then(result => excelGenerator(result));
};

const getExcelAllResults = function () {
  return getResults().then(results => excelGeneratorAll(results));
};

//TODO refactor!!!
const addCorrectAnswersPhase1 = function addCorrectAnswersPhase1(clientAnswers) {
  clientAnswers.forEach((answerAndId) => {
    const answerIdIndex = parseInt(answerAndId._id.substring(1));
    answerAndId.correctAnswer = imageSeeder.getAmountOfColours(answerIdIndex);
  });

  return clientAnswers;
};

const addCorrectAnswersPhase2 = function addCorrectAnswersPhase2(clientAnswers) {
  clientAnswers.forEach((answerAndId) => {
    const answerIdIndex = parseInt(answerAndId._id.substring(1));
    answerAndId.correctAnswer = `A${answerIdIndex}`;
  });

  return clientAnswers;
};

const addCorrectAnswersPhase3 = function addCorrectAnswersPhase3(clientAnswers) {
  return addCorrectAnswersPhase2(clientAnswers);
};

const updateNote = function updateNote(testId, notes) {
  return new Promise((resolve, reject) => {
    DiMS48Models.Result.findById(testId, (err, result) => {
      if (err) {
        reject(invalidIdError);
      } else {
        if (isValidResult(result)) {
          result.clientInfo.notes = notes;
          result.save((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          reject(invalidIdError);
        }
      }
    });
  });
};

const isValidResult = function isValidResult(result) {
  return result !== 'undefined' && result !== null;
};

const updateClientInfo = function updateClientInfo(testId, clientInfo) {
  if (clientInfo.gender) {
    clientInfo.gender = clientInfo.gender.toLowerCase();
  }

  return new Promise((resolve, reject) => {
    DiMS48Models.Result.findById(testId, (err, result) => {
      if (err) {
        reject(invalidIdError);
      } else {
        if (isValidResult(result)) {
          clientInfo.notes = result.clientInfo.notes;
          result.clientInfo = clientInfo;

          result.save((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          reject(invalidIdError);
        }
      }
    });
  });
};

//TODO abstract to seperate file
const genderKey2Name = function genderKey2Name(genderKey){
  return locals.clientInfo.genders[genderKey];
};

module.exports = (injectedDiMS48Models, injectedDefaultModels) => {
  DiMS48Models = injectedDiMS48Models;
  defaultModels = injectedDefaultModels;

  return {
    getTests,
    getImages,
    getInstructions,
    getOptions,
    getResult,
    getResults,
    addResult,
    appendResult,
    getPDF,
    getExcel,
    getExcelAllResults,
    updateNote,
    updateClientInfo,
    removeResult
  };
};
