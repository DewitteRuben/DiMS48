const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const initialInstructionsRepository = require('../../../data/initialDiMS48/instructions/initialInstructions.repository');

describe('initialInstructionsRepository', () => {
    describe('getInstructions', () => {
        it('should return an array', () => {
            const initialInstructions = initialInstructionsRepository.getInstructions();
            initialInstructions.should.be.an('array');
        });

        it('should not return an empty array', () => {
            const initialInstructions = initialInstructionsRepository.getInstructions();
            initialInstructions.length.should.be.greaterThan(0);
        });
    });

    describe('getDatabaseModel', () => {
        it('should return a function', () => {
            const databaseModel = initialInstructionsRepository.getDatabaseModel();
            databaseModel.should.be.a('function');
        });
    });
});