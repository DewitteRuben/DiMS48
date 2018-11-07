const chai = require('chai');
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const scoreCalculator = require('../../util/scoreCalculator');

describe('Score Calculator', () => {
    it('should exist', () => {
        scoreCalculator.should.not.be.undefined;
    });

    describe('Phase 1', () => {
        it('should return 0 if no correct answers were given', () => {
            const exampleAnswersPhase1 = [
            ];

            const calculatedScore = scoreCalculator.calculateScorePhase1(exampleAnswersPhase1);
            const expectedScore = 0;
            calculatedScore.should.equal(expectedScore);
        });

        it('should return 50 if half of the answers were correct', () => {
            const imageSeeder = require('../../seeders/imagesSeeder');
            const exampleAnswersAllCorrect = [];

            for(let i = 1; i <= imageSeeder.getMaxAmountOfCorrectAnswersPhase1() / 2; i++){
                const correctAnswer = imageSeeder.getAmountOfColours(i);

                const exampleAnswer = {
                    "_id": `A${i}`,
                    "answer": correctAnswer
                };

                exampleAnswersAllCorrect.push(exampleAnswer);
            }

            const calcuatedScore = scoreCalculator.calculateScorePhase1(exampleAnswersAllCorrect);
            const expectedScore = 50;

            calcuatedScore.should.equal(expectedScore);
        });

        it('should return 100 if all answers were correct', () =>{
            const imageSeeder = require('../../seeders/imagesSeeder');
            const exampleAnswersAllCorrect = [];

            for(let i = 1; i <= imageSeeder.getMaxAmountOfCorrectAnswersPhase1(); i++){
                const correctAnswer = imageSeeder.getAmountOfColours(i);

                const exampleAnswer = {
                    "_id": `A${i}`,
                    "answer": correctAnswer
                };

                exampleAnswersAllCorrect.push(exampleAnswer);
            }

            const calcuatedScore = scoreCalculator.calculateScorePhase1(exampleAnswersAllCorrect);
            const expectedScore = 100;

            calcuatedScore.should.equal(expectedScore);
        });
    });

    describe('Phase 2', () => {

    });
});
