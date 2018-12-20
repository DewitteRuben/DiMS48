const imageConstants = require('../data/initial/images/imageConstants');
const imagesRepository = require('../data/initial/images/initialImage.repository');

const calculateScorePhase1 = function calculateScorePhase1(answers) {
    let amountRightAnswersPhase1 = 0;

    answers.forEach((answerAndId) => {

        const answerIDIndexString = answerAndId._id.substring(1);
        const answerIDIndex = parseInt(answerIDIndexString);

        const correctAnswer = imagesRepository.getPhase1Label(answerIDIndex);

        if (answerAndId.answer === correctAnswer) {
            amountRightAnswersPhase1++;
        }
    });

    const maxAmountOfCorrectAnswers = imagesRepository.getAmountOfAnswersPhase1();

    return (amountRightAnswersPhase1 / maxAmountOfCorrectAnswers) * 100;
};

const calculateScorePhase2 = function calculateScorePhase2(answers) {
    const SET_KINDS = imageConstants.SET_KINDS;

    let amountRightAnswers = {abstract: 0, group: 0, unique: 0};

    answers.forEach((answerAndId) => {
        const answerIDIndexString = answerAndId._id.substring(1);
        const answerIDIndex = parseInt(answerIDIndexString);

        const chosenOption = answerAndId.answer.substring(0, 1);

        if (isCorrectOption(chosenOption)) {
            const currentSetKind = imagesRepository.getPhase2Label(answerIDIndex);

            switch (currentSetKind) {
                case SET_KINDS.Abstract:
                    amountRightAnswers.abstract++;
                    break;
                case SET_KINDS.Unique:
                    amountRightAnswers.unique++;
                    break;
                case SET_KINDS.Group:
                    amountRightAnswers.group++;
            }
        }
    });

    let maxAmountCorrectAnswers = imagesRepository.getAmountOfAnswersPhase2();

    return {
        abstractScore: (amountRightAnswers.abstract / maxAmountCorrectAnswers.abstract) * 100,
        groupedScore: (amountRightAnswers.group / maxAmountCorrectAnswers.group) * 100,
        uniqueScore: (amountRightAnswers.unique / maxAmountCorrectAnswers.unique) * 100
    };
};

const isCorrectOption = function isCorrectOption(chosenOption){
    return chosenOption === imageConstants.CORRECT_OPTION;
};

module.exports = {
    calculateScorePhase1,
    calculateScorePhase2,
};
