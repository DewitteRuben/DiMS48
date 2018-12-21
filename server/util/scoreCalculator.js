const imageConstants = require('../data/initialDiMS48/images/imageConstants');
const imagesRepository = require('../data/initialDiMS48/images/initialImage.repository');

const calculateScorePhase1 = function calculateScorePhase1(answers) {
    let amountRightAnswersPhase1 = 0;
    let totalTime = 0;
    answers.forEach((answerAndId) => {

        const answerIDIndexString = answerAndId._id.substring(1);
        const answerIDIndex = parseInt(answerIDIndexString);

        const correctAnswer = imagesRepository.getPhase1Label(answerIDIndex);

        if (answerAndId.answer === correctAnswer) {
            amountRightAnswersPhase1++;
        }
        totalTime += answerAndId.responseTime;
    });

    const maxAmountOfCorrectAnswers = imagesRepository.getAmountOfAnswersPhase1();

    return {
      score: (amountRightAnswersPhase1 / maxAmountOfCorrectAnswers) * 100,
      totalTime
    };
};

const calculateScorePhase2 = function calculateScorePhase2(answers) {
    const SET_KINDS = imageConstants.SET_KINDS;

    let amountRightAnswers = {abstract: 0, group: 0, unique: 0};
    let totalTime = 0;

    answers.forEach((answerAndId) => {
        const answerIDIndexString = answerAndId._id.substring(1);
        const answerIDIndex = parseInt(answerIDIndexString);

        const chosenOption = answerAndId.answer.substring(0, 1);

        if (isCorrectOption(chosenOption)) {
            const currentSetKind = imagesRepository.getPhase2Label(answerIDIndex);

            switch (currentSetKind) {
                case SET_KINDS.Abstract:
                    amountRightAnswers.abstract += 1;
                    break;
                case SET_KINDS.Unique:
                    amountRightAnswers.unique += 1;
                    break;
                case SET_KINDS.Group:
                    amountRightAnswers.group += 1;
            }
        }
        totalTime += answerAndId.responseTime;
    });

    let maxAmountCorrectAnswers = imagesRepository.getAmountOfAnswersPhase2();

    return {
        scores:{
          abstractScore: (amountRightAnswers.abstract / maxAmountCorrectAnswers.abstract) * 100,
          groupedScore: (amountRightAnswers.group / maxAmountCorrectAnswers.group) * 100,
          uniqueScore: (amountRightAnswers.unique / maxAmountCorrectAnswers.unique) * 100
        },
        totalTime
    };
};

const calculateScorePhase3 = function calculateScorePhase3(answers) {
    return calculateScorePhase2(answers);
};

const isCorrectOption = function isCorrectOption(chosenOption){
    return chosenOption === imageConstants.CORRECT_OPTION;
};

module.exports = {
    calculateScorePhase1,
    calculateScorePhase2,
    calculateScorePhase3
};
