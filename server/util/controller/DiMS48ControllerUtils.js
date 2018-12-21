const imageRepository = require("../../data/initialDiMS48/images/initialImage.repository");

const addCorrectAnswersPhase1 = function addCorrectAnswersPhase1(clientAnswers) {
    clientAnswers.forEach(answerAndId => {
        const answerIdIndex = parseInt(answerAndId._id.substring(1));
        answerAndId.correctAnswer = imageRepository.getPhase1Label(answerIdIndex);
    });

    return clientAnswers;
};

const addCorrectAnswersPhase2 = function addCorrectAnswersPhase2(clientAnswers) {
    clientAnswers.forEach(answerAndId => {
        const answerIdIndex = parseInt(answerAndId._id.substring(1));
        answerAndId.correctAnswer = `A${answerIdIndex}`;
    });

    return clientAnswers;
};

const addCorrectAnswersPhase3 = function addCorrectAnswersPhase3(clientAnswers) {
    return addCorrectAnswersPhase2(clientAnswers);
  };

const addPhase3IsDone = function addPhase3IsDone(result) {
    result["done"] = result.phase3 !== null;
    return result;
};

const removeAnswersPhase3 = function removeAnswersPhase3(result) {
    if (result.phase3 !== null) {
        delete result.phase3.answers;
    }

    return result;
};

const makeGetter = function makeGetter(databaseModel, whereClause, isIdNeeded, fieldsToGet) {
    return new Promise(function (resolve, reject) {
      let fields = isIdNeeded ? {
        __v: 0
      } : {
        __v: 0,
        _id: 0
      };
  
      if (fieldsToGet) {
        Object.keys(fieldsToGet).forEach(key => {
          fields[key] = fieldsToGet[key];
        });
      }
  
      let query = databaseModel.find(whereClause, fields).lean();
  
      query.exec(function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };

module.exports = {
    addCorrectAnswersPhase1,
    addCorrectAnswersPhase2,
    addCorrectAnswersPhase3,
    addPhase3IsDone,
    removeAnswersPhase3,
    makeGetter,
};