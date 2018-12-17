const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const seederToTest = require('../../seeders/instructionsSeeder');

describe('Instruction Seeder', () => {
   describe('getInstructions', () => {
       it("should return an array", () => {
            const instructions = seederToTest.getInstructions();

            instructions.should.be.an('array');
       });
   }); 
});