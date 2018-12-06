let DiMS48Models;
let defaultModels;

const scoreCalculator = require('../util/scoreCalculator');
const excelGenerator = require('../util/fileGenerators/excelGenerator').makeExcel;
const excelGeneratorAll = require('../util/fileGenerators/excelGeneratorAll').makeExcel;
const imageSeeder = require('../seeders/imagesSeeder');

const locals = require('../locales/en-US.json');
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
        'answersPhase1.answers': 0,
        'answersPhase2.answers': 0
      })
      .then(results => {
        results.forEach(result => {
          if (result.answersPhase3.answers.length <= 0) result.answersPhase3.scores = null;
          delete result.answersPhase3.answers;
        });
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
  }, true).then(data => {
    return data[0];
  });
}

function getUnfinishedTests() {
  return makeGetter(DiMS48Models.Result, {
    $where: "this.answersPhase3.answers.length <= 0"
  }, true)
}

function addResult(data) {
  return new Promise((resolve, reject) => {
    addCorrectAnswersPhase1(data.answersPhase1);
    data['answersPhase1'] = {
      score: scoreCalculator.calculateScorePhase1(data.answersPhase1),
      answers: addCorrectAnswersPhase1(data.answersPhase1)
    };
    data['answersPhase2'] = {
      scores: scoreCalculator.calculateScorePhase2(data.answersPhase2),
      answers: addCorrectAnswersPhase2(data.answersPhase2)
    };
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
    data.answersPhase3 = {
      scores: scoreCalculator.calculateScorePhase2(data.answersPhase3),
      answers: addCorrectAnswersPhase3(data.answersPhase3)
    };

    DiMS48Models.Result.findByIdAndUpdate(data._id, {
      answersPhase3: data.answersPhase3
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

module.exports = (injectedDiMS48Models, injectedDefaultModels) => {
  DiMS48Models = injectedDiMS48Models;
  defaultModels = injectedDefaultModels;

  return {
    getTests,
    getImages,
    getInstructions,
    getOptions,
    getResults,
    getUnfinishedTests,
    getResult,
    addResult,
    appendResult,
    getPDF,
    getExcel,
    getExcelAllResults,
    updateNote,
    updateClientInfo
  };
};