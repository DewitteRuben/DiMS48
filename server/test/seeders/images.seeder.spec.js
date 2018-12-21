const expect = require('chai').expect;
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const imageSeeder = require('../../seeders/imagesSeeder');

describe('imageSeeder', () => {
    describe('isDatabaseSeeded', () => {
        it('should return a promise', (done) => {
            imageSeeder.isDatabaseSeeded()
            .then(() => {
                done();
            })
            .catch(() => {
                done();
            });
        });

        it('should initially return false', (done) => {
            imageSeeder.isDatabaseSeeded()
            .then((isDatabaseSeeded) => {
                isDatabaseSeeded.should.equal(false);
                done();
            })
            .catch((err) => {
                done(err);
            });
        });
    });

    describe('seed', () => {
        it('should resolve a promise', (done) => {
            imageSeeder.seed()
            .then(() => {
                done();
            }).catch((err) => {
                done(err);
            });
        });
    });
});