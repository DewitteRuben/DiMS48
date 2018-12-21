const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const initialTestsRepository = require('../../../data/tests/initialTests.repository');

describe('initialTestsRepository', () => {
    describe('getDatabaseModel', () => {
        it('should return a functions', () => {
            const databaseModel = initialTestsRepository.getDatabaseModel();
            databaseModel.should.be.a('function');
        });
    });

    describe('getTests', () => {
        it('should return an array', () => {
            const initialTests = initialTestsRepository.getTests();
            initialTests.should.be.an('array');
        });

        it('should return an array with size larger than 0', () => {
            const initialTests = initialTestsRepository.getTests();
            initialTests.length.should.be.greaterThan(0);
        });
    });
});