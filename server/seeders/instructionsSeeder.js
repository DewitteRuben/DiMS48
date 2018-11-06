const mongoose = require('mongoose');

const DiMS48Instruction = require('../models/DiMS48Models').Instruction;
const defaultInstruction = require('../models/defaultModels').Instruction;

const Instructions = require('../models/DiMS48Models').Instructions;

const instructionPhase1 = new DiMS48Instruction({
    id: 'phase1',
    instructions: {
        client: 'test',
        leader: 'test1654'
    }
});

const instructionPhase2 = new DiMS48Instruction({
    id: 'phase2',
    instructions: {
        client: 'test',
        leader: 'test1654'
    }
});

const instructionPhase3 = new DiMS48Instruction({
    id: 'phase3',
    instructions: {
        client: 'test',
        leader: 'test1654'
    }
});

const getInstructions = function getInstructions() {
    return new Instructions({
        instructions: [
            instructionPhase1,
            instructionPhase2,
            instructionPhase3
        ]
    });
};


module.exports = {
    getInstructions
};
