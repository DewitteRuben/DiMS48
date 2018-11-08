const mongoose = require('mongoose');
const chai = require('chai');
const should = require('chai').should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const functionFactory = require('./util/functionFactory');
const DiMS48Models = require('../../models/DiMS48Models');

const databaseConnectionManager = require('../testingUtils/databaseConnectionManager');
databaseConnectionManager.connectDatabase();

describe('Option Model', () => {
    const Option = DiMS48Models.Option;

    beforeEach(functionFactory.createBeforeEach(Option));
    afterEach(functionFactory.createAfterEach(Option));
    after(async () => {databaseConnectionManager.disconnectDatabase()});

    it("should exsist", () => {
        Option.should.not.be.undefined;
    });

    it('should be able to get a test', async () => {
        const _id = 'phase1Option';
        const option = new Option({
            _id: _id,
            options: [{
                btnText: 'Test',
                btnValue: 'Value'}
            ]
        });
        await option.save();

        const foundOption = await Option.findOne({_id: _id});
        const expectedId = _id;
        const actual = foundOption._id;

        expectedId.should.equal(actual);
    });
});
