const mongoose = require('mongoose');

const DiMS48Instruction = require('../models/DiMS48Models').Instruction;

const instructionPhase1 = new DiMS48Instruction({
    _id: 'phase1',
    instructions: {
        client: 'test',
        leader: 'test1654'
    }
});

const instructionInterference = new DiMS48Instruction({
  _id: 'interference',
  instructions: {
    client: 'test',
    leader: 'test1654'
  }
})

const instructionPhase2 = new DiMS48Instruction({
    _id: 'phase2',
    instructions: {
        client: 'test',
        leader: 'test1654'
    }
});

const instructionPhase3 = new DiMS48Instruction({
    _id: 'phase3',
    instructions: {
        client: 'test',
        leader: 'test1654'
    }
});

const getInstructions = function getInstructions() {
    return [
        instructionPhase1,
        instructionInterference,
        instructionPhase2,
        instructionPhase3
    ];
};


module.exports = {
    getInstructions
};
