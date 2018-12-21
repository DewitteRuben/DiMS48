let DiMS48Models;
let defaultModels;

const scoreCalculator = require("../util/scoreCalculator");

const pdfGenerator = require("../util/fileGenerators/pdfGenerator/");
const excelGenerator = require("../util/fileGenerators/excelGenerator")
  .makeExcel;
const excelGeneratorAll = require("../util/fileGenerators/excelGeneratorAll")
  .makeExcel;

const locales = require("../locales/nl-BE.json");

const throwableErrors = require('../util/errors/errors');
const invalidIdError = throwableErrors.invalidIdError;
const resultAlreadyAppendedError = throwableErrors.resultAlreadyAppendedError;


const imageComparator = require('../util/comparators/imageComparators');
const DiMS48ControllerUtils = require('../util/controller/DiMS48ControllerUtils');

const getTests = function getTests() {
  return makeGetter(defaultModels.Test, null, true);
};

const getImages = function getImages() {
  return makeGetter(defaultModels.Image, null, true)
    .then((images) => {
      if (Array.isArray(images)) {
        return images.sort(imageComparator.compareImage);
      } else {
        return images;
      }
    });
};

const getInstructions = function getInstructions() {
  return makeGetter(DiMS48Models.Instruction, null, true);
};

const getOptions = function getOptions() {
  return makeGetter(DiMS48Models.Option, null, true);
};

const getResults = function getResults() {
  return new Promise(function (resolve, reject) {
    makeGetter(DiMS48Models.Result, null, true, {
        "phase1.answers": 0,
        "phase2.answers": 0
      })
      .then(results => {
        results.map(removeAnswersPhase3);
        results.map(convertGenderKeyToName);
        results.map(addPhase3IsDone);
        resolve(results);
      })
      .catch(err => {
        reject(err);
      });
  });
};

const getResult = function getResult(id) {
  return makeGetter(
    DiMS48Models.Result, {
      _id: id
    },
    true
  ).then(result => {
    if (result.length <= 0) {
      throw invalidIdError;
    }

    if (Array.isArray(result)) {
      result = result[0];
    }

    if (result.clientInfo && result.clientInfo.gender) {
      result.clientInfo.gender = genderKey2Name(result.clientInfo.gender);
    }

    const isPhase3Done = result.phase3 !== null;
    result["done"] = isPhase3Done;

    return result;
  });
};

const addResult = function addResult(data) {
  return new Promise((resolve, reject) => {
    data.timestamp = new Date();

    if (data.clientInfo && data.clientInfo.gender) {
      data.clientInfo.gender = data.clientInfo.gender.toLowerCase();
    }

    let scorePhase1 = scoreCalculator.calculateScorePhase1(data.phase1);
    data["phase1"] = {
      score: scorePhase1.score,
      answers: addCorrectAnswersPhase1(data.phase1),
      totalTime: Math.floor(scorePhase1.totalTime / 1000) //miliseconds -> seconds
    };

    let scoresPhase2 = scoreCalculator.calculateScorePhase2(data.phase2);
    data["phase2"] = {
      scores: scoresPhase2.scores,
      answers: addCorrectAnswersPhase2(data.phase2),
      totalTime: Math.floor(scoresPhase2.totalTime / 1000)
    };

    data["phase3"] = null;

    const newResult = new DiMS48Models.Result(data);

    newResult.save((err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const appendResult = function appendResult(data) {
  return new Promise((resolve, reject) => {
    let scoresPhase3 = scoreCalculator.calculateScorePhase3(data.phase3);
    data.phase3 = {
      scores: scoresPhase3.scores,
      answers: addCorrectAnswersPhase3(data.phase3),
      totalTime: Math.floor(scoresPhase3.totalTime / 1000)
    };

    getResult(data._id)
      .then((result) => {
        if (result.phase3 !== null) {
          reject(resultAlreadyAppendedError);
        } else {
          DiMS48Models.Result.findByIdAndUpdate(
            data._id, {
              phase3: data.phase3
            },
            (err, data) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        }
      }).catch(err => {
        reject(err);
      });
  });
};

const removeResult = function removeResult(id) {
  return new Promise((resolve, reject) => {
    DiMS48Models.Result.find({
      _id: id
    }).deleteOne(function (err) {
      if (err) {
        reject(err);
      }else{
        resolve();
      }
    });
  });
};

const getPDF = function getPDF(id) {
  return getResult(id).then(result => {
    return pdfGenerator("DiMS48ReportTemplate", result, locales);
  });
};

const getExcel = function (id) {
  return getResult(id).then(result => excelGenerator(result));
};

const getExcelAllResults = function () {
  return getResults().then(results => excelGeneratorAll(results));
};

const updateNote = function updateNote(testId, notes) {
  return new Promise((resolve, reject) => {
    DiMS48Models.Result.findById(testId, (err, result) => {
      if (err) {
        reject(invalidIdError);
      } else {
        if (isValidResult(result)) {
          result.clientInfo.notes = notes;
          result.save(err => {
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
  return result !== "undefined" && result !== null;
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

          result.save(err => {
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
//Util Functions
const makeGetter = DiMS48ControllerUtils.makeGetter;
const addPhase3IsDone = DiMS48ControllerUtils.addPhase3IsDone;
const removeAnswersPhase3 = DiMS48ControllerUtils.removeAnswersPhase3;

const genderConvertor = require('../util/controller/genderConverter')(locales);
const genderKey2Name = genderConvertor.genderKey2Name;
const convertGenderKeyToName = genderConvertor.convertGenderKeyToName;
const addCorrectAnswersPhase1 = DiMS48ControllerUtils.addCorrectAnswersPhase1;
const addCorrectAnswersPhase2 = DiMS48ControllerUtils.addCorrectAnswersPhase2;
const addCorrectAnswersPhase3 = DiMS48ControllerUtils.addCorrectAnswersPhase3;

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
