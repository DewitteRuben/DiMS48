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
    _id: String,
    instructions: {
        client: String,
        leader: String
    }
}, {_id: false});

const ButtonOptionSchema = new Schema({
    btnText: String,
    btnValue: String,
}, {_id: false});

const OptionSchema = new Schema({
   _id: String,
   options: [ButtonOptionSchema]
});

module.exports = {
    Results: mongoose.model('Results', Results),
    Instruction: mongoose.model('Instuction', InstructionSchema),
    Option: mongoose.model('Option', OptionSchema),
};
