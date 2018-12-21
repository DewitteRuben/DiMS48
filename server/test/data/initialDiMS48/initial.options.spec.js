const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const initialOptionsRepository = require('../../../data/initialDiMS48/options/initialOptions.repository');

describe('initialOptionsRepository', () => {
    describe('getDatabaseModel', () => {
        it('should return a function', () => {
            const databaseModel = initialOptionsRepository.getDatabaseModel();
            databaseModel.should.be.a('function');
        });
    });

    describe('getOptions', () => {
        it('should return an array', () => {
            const initialOptions = initialOptionsRepository.getOptions();
            initialOptions.should.be.an('array');
        });

        it('should return an array with size larger than 0', () => {
            const initialOptions = initialOptionsRepository.getOptions();
            initialOptions.length.should.be.greaterThan(0);
        });
    });
});