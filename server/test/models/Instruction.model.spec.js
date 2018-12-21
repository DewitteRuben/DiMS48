const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const functionFactory = require('../testingUtils/functionFactory');
const DiMS48Models = require('../../models/DiMS48Models');

describe('Instruction Model', () => {
    const Instruction = DiMS48Models.Instruction;

    beforeEach(functionFactory.createBeforeEach(Instruction));
    afterEach(functionFactory.createAfterEach(Instruction));

    it("should exsist", () => {
        Instruction.should.not.be.undefined;
    });

    it('should be able to get a test', async () => {
        const _id = "phase1";

        const instruction = new Instruction({
            _id: _id,
            instructions: {
                client: "testInstruction",
                leader: "testInstruction"
            }
        });
        await instruction.save();

        const foundInstruction = await Instruction.findOne({_id: _id});
        const expectedId = _id;
        const actual = foundInstruction._id;

        expectedId.should.equal(actual);
    });
});
