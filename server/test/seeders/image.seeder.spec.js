const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const seederToTest = require('../../seeders/imagesSeeder');

describe('Image seeder', () => {
    describe('getImages()', () => {
        it('should return an array', () => {
            const images = seederToTest.getImages();

            images.should.be.an('array');
        });

        it('should return an array with 96 elements', () => {
            const amountOfImages = seederToTest.getImages().length;

            amountOfImages.should.equal(96);
        });
    });
});