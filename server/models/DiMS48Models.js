const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultModels = require('./defaultModels.js');

const ResultsPart1Schema = new Schema({
  id: Number,
  answersPhase1: [defaultModels.AnswerSchema],
  answersPhase2: [defaultModels.AnswerSchema]
});

const ResultsPart2Schema = new Schema({
  id: Number,
  answers: [defaultModels.AnswerSchema]
});


const ImagesSchema = new Schema({
    images: [defaultModels.ImageSchema]
});

const Result = new Schema({
    timestamp: {type: Date, default: Date.now},
    clientInfo: defaultModels.ClientInfoSchema,
    phase1: ResultsPart1Schema,
    phase2: ResultsPart1Schema,
});

const Results = new Schema({
   results: [Result]
});

const InstructionSchema = new Schema({
    clientInstruction: defaultModels.InstructionsSchema,
    leaderInstruction: defaultModels.InstructionsSchema
});

const InstructionsSchema = new Schema({
    instructions: [ InstructionSchema ]
});

module.exports = {
  Images: mongoose.model('Images', ImagesSchema),
  Results: mongoose.model('Results', Results),
  Instructions: mongoose.model('Instructions', InstructionsSchema),
};
