const CORRECT_OPTION = 'A';
const WRONG_OPTION = 'B';

const imageAnswerValidators = require('../seeders/imagesSeeder');

const calculateScore = function calculateScore(phase, answers){
    switch (phase) {
        case 'phase1':
            const getAmountOfColours = imageAnswerValidators.getAmountOfColours;

            let amountRightAnswersPhase1 = 0;

            answers.forEach((answerAndId) => {

                const answerIDIndexString = answerAndId._id.substring(1);
                const answerIDIndex = parseInt(answerIDIndexString);

                const correctAnswer = getAmountOfColours(answerIDIndex);

                if (answerAndId.answer === correctAnswer) {
                    amountRightAnswersPhase1++;
                }
            });

            const amountOfAnswers = Object.keys(imageAnswerValidators.amountOfColours).length;

            return (amountRightAnswersPhase1 / amountOfAnswers) * 100;

        case 'phase2':
            const getSetKind = imageAnswerValidators.getSetKind;
            const SET_KINDS = imageAnswerValidators.SET_KINDS;

            let amountRightAnswers = {abstract: 0, group: 0, unique: 0};

            answers.forEach((answerAndId) => {
                const answerIDIndexString = answerAndId._id.substring(1);
                const answerIDIndex = parseInt(answerIDIndexString);

                const chosenOption = answerAndId.answer.substring(0, 1);

                if (isCorrectOption(chosenOption)) {
                    const currentSetKind = getSetKind(answerIDIndex);

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

            let maxAmountCorrectAnswers = imageAnswerValidators.getMaxAmountCorrectAnswers();

            return {
                abstractScore: amountRightAnswers.abstract / maxAmountCorrectAnswers.abstract,
                groupedScore: amountRightAnswers.group / maxAmountCorrectAnswers.group,
                uniqueScore: amountRightAnswers.unique / maxAmountCorrectAnswers.unique
            }
    }
};

const isCorrectOption = function isCorrectOption(chosenOption){
    return chosenOption === CORRECT_OPTION;
};

module.exports = {
    calculateScore,
};
