const imageSeeder = require('../seeders/imagesSeeder');

const generateAnswersPhase1 = function generateAnswersPhase1() {
    const exampleAnswersAllCorrect = [];

    for (let i = 1; i <= imageSeeder.getMaxAmountOfCorrectAnswersPhase1(); i++) {
        const correctAnswer = imageSeeder.getAmountOfColours(i);

        const exampleAnswer = {
            "_id": `A${i}`,
            "answer": correctAnswer
        };

        exampleAnswersAllCorrect.push(exampleAnswer);
    }

    return exampleAnswersAllCorrect;
};

const generateAnswersPhase2 = function generateAnswersPhase2() {
    const exampleAnswersAllCorrect = [];

    for (let i = 1; i <= 48; i++) {
        const correctAnswer = imageSeeder.getAmountOfColours(i);

        const exampleAnswer = {
            "_id": `A${i}`,
            "answer": `A${i}`
        };

        exampleAnswersAllCorrect.push(exampleAnswer);
    }

    return exampleAnswersAllCorrect;
};

module.exports = {
    generateAnswersPhase1,
    generateAnswersPhase2,
}