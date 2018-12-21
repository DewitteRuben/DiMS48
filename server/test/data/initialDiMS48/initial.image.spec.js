const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const initialImageRepository = require('../../../data/initialDiMS48/images/initialImage.repository');

describe('initialImageRepository', () => {
    describe('getPhase3Label', () => {
        it('should return a string', () => {
            const label = initialImageRepository.getPhase3Label(1);
            label.should.be.a('string');
        });

        it('should return undefined if nothing is found', () => {
            const label = initialImageRepository.getPhase3Label(999);
            expect(label).to.be.undefined;
        });
    });

    describe('getAmountOfAnswersPhase3', () => {
        it('should return an object', () => {
            const amountOfAnwsersPhase3 = initialImageRepository.getAmountOfAnswersPhase3();
            amountOfAnwsersPhase3.should.be.an('object');
        });
    });

    describe('getDistributionSets', () => {
        it('should return an object', () => {
            const distributionSets = initialImageRepository.getDistributionSets();
            distributionSets.should.be.an('object');
        });
    });
});