const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const functionFactory = require('./util/functionFactory');
const defaultModels = require('../../models/defaultModels');

const databaseConnectionManager = require('../testingUtils/databaseConnectionManager');
databaseConnectionManager.connectDatabase();

describe('Image Model', () => {
    const Image = defaultModels.Image;

    beforeEach(functionFactory.createBeforeEach(Image));
    afterEach(functionFactory.createAfterEach(Image));
    after(async () => {databaseConnectionManager.disconnectDatabase()});

    it("should exsist", () => {
        Image.should.not.be.undefined;
    });

    it('should be able to get a test', async () => {
        const image = new Image({
            _id: "A1",
            imgUrl: "Test",
            extra: "Note"
        });
        await image.save();

        const foundImage = await Image.findOne({_id: "A1"});
        const expectedId = "A1";
        const actual = foundImage._id;

        expectedId.should.equal(actual);
    });
});
