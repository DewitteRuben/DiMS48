const chai = require('chai');
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const scoreCalculator = require('../../util/scoreCalculator');
const imageSeeder = require('../../seeders/imagesSeeder');

describe('Score Calculator', () => {
    it('should exist', () => {
        scoreCalculator.should.not.be.undefined;
    });

    describe('Phase 1', () => {
        it('should return a number', () => {
            scoreCalculator.calculateScorePhase1([]).should.be.a('number');
        });

        it('should return 0 if no correct answers were given', () => {
            const exampleAnswersPhase1 = [];

            const calculatedScore = scoreCalculator.calculateScorePhase1(exampleAnswersPhase1);
            const expectedScore = 0;
            calculatedScore.should.equal(expectedScore);
        });

        it('should return 50 if half of the answers were correct', () => {
            const exampleAnswersAllCorrect = [];

            for (let i = 1; i <= imageSeeder.getMaxAmountOfCorrectAnswersPhase1() / 2; i++) {
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

        it('should return 100 if all answers were correct', () => {
            const imageSeeder = require('../../seeders/imagesSeeder');
            const exampleAnswersAllCorrect = [];

            for (let i = 1; i <= imageSeeder.getMaxAmountOfCorrectAnswersPhase1(); i++) {
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
        it('should return an object', () => {
            scoreCalculator.calculateScorePhase2([]).should.be.an('object');
        });

        it('should return an object with 3 properties (abstractScore, groupedScore, uniqueScore)', () => {
            const emptyScore = scoreCalculator.calculateScorePhase2([]);

            emptyScore.should.have.all.keys('abstractScore', 'groupedScore', 'uniqueScore');
        });

        it('should return 0 for all if not answers are given', () => {
            const emptyScore = scoreCalculator.calculateScorePhase2([]);

            emptyScore.groupedScore.should.be.equal(0);
            emptyScore.uniqueScore.should.be.equal(0);
            emptyScore.abstractScore.should.be.equal(0);
        });

        it('should return 100 for abstract if all abstract were correct', () => {
            const abstractAllCorrectArray = createCorrectAnswerArrayPhase2(imageSeeder.SET_KINDS.Abstract);

            const calulatedScore = scoreCalculator.calculateScorePhase2(abstractAllCorrectArray).abstractScore;
            const expectedScore = 100;

            calulatedScore.should.be.equal(expectedScore);
        });

        it('should return 100 for unique if all unique were correct', () => {
            const uniqueAllCorrectArray = createCorrectAnswerArrayPhase2(imageSeeder.SET_KINDS.Unique);

            const calulatedScore = scoreCalculator.calculateScorePhase2(uniqueAllCorrectArray).uniqueScore;
            const expectedScore = 100;

            calulatedScore.should.be.equal(expectedScore);
        });

        it('should return 100 for grouped if all grouped correct', () => {
            const uniqueAllCorrectArray = createCorrectAnswerArrayPhase2(imageSeeder.SET_KINDS.Group);

            const calulatedScore = scoreCalculator.calculateScorePhase2(uniqueAllCorrectArray).groupedScore;
            const expectedScore = 100;

            calulatedScore.should.be.equal(expectedScore);
        });
    });
});

const createCorrectAnswerArrayPhase2 = function createCorrectAnswerArrayPhase2(setKind) {
    const correctAnswerArray = [];

    let totalAmountMaxPossibleAnswers = 0;
    Object.keys(imageSeeder.SET_KINDS).forEach((key) => {
        totalAmountMaxPossibleAnswers += imageSeeder.getMaxAmountCorrectAnswersPhase2()[setKind2ScoreKey(imageSeeder.SET_KINDS[key])];
    });


    for (let i = 1; i <= totalAmountMaxPossibleAnswers; i++) {
        const currentSetKind = imageSeeder.getSetKind(i);

        if (currentSetKind === setKind) {
            const exampleCorrectAnswer = {
                '_id': `A${i}`,
                'answer': `A${i}`
            };

            correctAnswerArray.push(exampleCorrectAnswer);
        }
    }

    return correctAnswerArray;
};

const setKind2ScoreKey = function setKind2ScoreKey(setKind) {
    switch (setKind) {
        case imageSeeder.SET_KINDS.Abstract:
            return "abstract";
        case imageSeeder.SET_KINDS.Group:
            return "group";
        case imageSeeder.SET_KINDS.Unique:
            return "unique";
    }
};
