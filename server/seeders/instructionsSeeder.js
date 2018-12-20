const initialInstructionRepository = require('../data/initialDiMS48/instructions/initialInstructions.repository');
const Instruction = initialInstructionRepository.getDatabaseModel();

const seed = function seed() {
    const instructions = initialInstructionRepository.getInstructions();
    instructions.forEach((instruction) => instruction.save());
};

const isDatabaseSeeded = function isDatabaseSeeded() {
    return new Promise((resolve, reject) => {
        const instructionQuery = Instruction.find();

        instructionQuery.exec((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data.length !== 0);
            }
        });
    });
};

module.exports = {
    seed,
    isDatabaseSeeded
};
