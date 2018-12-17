const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const answerGenerator = require('../../util/answerGenerator');

describe('anwserGenerator', () => {
    describe('generateAnswersPhase1', () => {
        it('should return an array of objects', () => {
            const answersPhase1 = answerGenerator.generateAnswersPhase1();

            answersPhase1.should.be.an('array');
            answersPhase1[0].should.be.an('object');
            answersPhase1[answersPhase1.length - 1].should.be.an('object');
        });
    });
    
    describe('generateAnswersPhase2', () => {
        it('should return an array of objects', () => {
            const answersPhase2 = answerGenerator.generateAnswersPhase2();

            answersPhase2.should.be.an('array');
            answersPhase2[0].should.be.an('object');
            answersPhase2[answersPhase2.length - 1].should.be.an('object');
        });
    });
});