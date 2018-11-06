const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultModels = require('./defaultModels.js');

const ResultsPart1Schema = new Schema({
  id: Number,
  answersPhase1: [defaultModels.Answer],
  answersPhase2: [defaultModels.Answer]
});

const ResultsPart2Schema = new Schema({
  id: Number,
  answers: [Answer]
});


const ImagesSchema = new Schema({
    images: [defaultModels.Image]
});

const Result = new Schema({
    timestamp: {type: Date, default: Date.now},
    clientInfo: defaultModels.ClientInfo,
    phase1: ResultsPart1Schema,
    phase2: ResultsPart1Schema,
});

const Results = new Schema({
   results: [Result]
});

const InstructionSchema = new Schema({
    clientInstruction: defaultModels.Instruction,
    leaderInstruction: defaultModels.Instruction
});

const InstructionsSchema = new Schema({
    instructions: [ InstructionSchema ]
});

module.exports = {
  Images: mongoose.model('Images', ImagesSchema),
  Results: mongoose.model('Results', Results),
  Instructions: mongoose.model('Instructions', InstructionsSchema),
};
