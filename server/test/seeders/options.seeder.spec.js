const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const seederToTest = require('../../seeders/optionsSeeder');

describe('Options Seeder', () => {
    describe('getOptions()', () => {
        it('should return an array', () => {
            const options = seederToTest.getOptions();
            
            options.should.be.an('array');
        });
    });
});
