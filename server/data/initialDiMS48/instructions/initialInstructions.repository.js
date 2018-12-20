const initialInstructions = require('./initialInstructions.json');
const Instruction = require('../../../models/DiMS48Models').Instruction;

const getInstructions = function getInstructions() {
    const instructions = [];

    initialInstructions.forEach(instruction => {
        instructions.push(new Instruction(instruction));
    });

    return instructions;
};

const getDatabaseModel = function getDatabaseModel() {
    return Instruction;
};

module.exports = {
    getDatabaseModel,
    getInstructions,
};