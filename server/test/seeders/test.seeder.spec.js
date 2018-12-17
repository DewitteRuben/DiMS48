const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const seederToTest = require('../../seeders/testsSeeder');

describe('TestSeeder', () => {
    describe('getTests', () => {
        it('should return an array', () => {
            const tests = seederToTest.getTests();

            tests.should.be.an('array');
        });
    });
});
