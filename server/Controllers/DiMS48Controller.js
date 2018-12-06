let DiMS48Models;
let defaultModels;

const scoreCalculator = require('../util/scoreCalculator');
const excelGenerator = require('../util/fileGenerators/excelGenerator').makeExcel;
const excelGeneratorAll = require('../util/fileGenerators/excelGeneratorAll').makeExcel;
const imageSeeder = require('../seeders/imagesSeeder');

const locals = require('../locales/nl-BE.json');
const pdfGenerator = require('../util/fileGenerators/pdfGenerator/');

const invalidIdError = {
  name: 'CastError',
  description: 'Invalid Id Supplied'
};

function makeGetter(model, whereClause, idNeeded, extraFields) {
  return new Promise(function (s, f) {
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
      if (err) f(err);
      s(data);
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
  return new Promise(function (s, f) {
    makeGetter(DiMS48Models.Result, null, true, {
        'phase1.answers': 0,
        'phase2.answers': 0
      })
      .then(results => {
        results.forEach(result => {
          if (result.phase3.answers.length <= 0) result.phase3.scores = null;
          delete result.phase3.answers;
        });

        results.map((result => {
          result.clientInfo.gender = genderKey2Name(result.clientInfo.gender);
        }));

        s(results);
      }).catch(err => {
        console.log(err);
        f(err)
      })
  })
}

function getResult(id) {
  return makeGetter(DiMS48Models.Result, {
    '_id': id
  }, true).then(result => {
    result = result[0];
    result.clientInfo.gender = genderKey2Name(result.clientInfo.gender);
    return result;
  });
}

function getUnfinishedTests() {
  return makeGetter(DiMS48Models.Result, {
    $where: "this.phase3.answers.length <= 0"
  }, true)
}

function addResult(data) {
  return new Promise((resolve, reject) => {

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

    data['phase3'] = {
      scores: {
        abstractScore: 0,
        groupedScore: 0,
        uniqueScore: 0
      },
      answers: []
    };

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
    })
  })
}

const getPDF = function getPDF(id) {
  return pdfGenerator(this, id, locals);
};

const getExcel = function (id) {
  return getResult(id).then(result => excelGenerator(result));
};

const getExcelAllResults = function () {
  return getResults().then(results => excelGeneratorAll(results));
}

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

const isValidResult = function isValidResult(result) {
  return result !== 'undefined' && result !== null;
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

const genderKey2Name = function genderKey2Name(genderKey){
  return locals.clientInfo.genders[genderKey];
}

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
    getUnfinishedTests,
    addResult,
    appendResult,
    getPDF,
    getExcel,
    getExcelAllResults,
    updateNote,
    updateClientInfo
  };
};