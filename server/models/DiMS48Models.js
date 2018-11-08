const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultModels = require('./defaultModels.js');

const ResultsPhase1Schema = new Schema({
  score: {type: Number, required: true},
  answers: {type: [defaultModels.AnswerSchema], required: true}
}, {_id: false})

const ScorePart2Schema = new Schema({
  abstractScore: {type: Number, required: true},
  groupedScore: {type: Number, required: true},
  uniqueScore: {type: Number, required: true}
}, {_id: false})

const ResultsPhase2Schema = new Schema({
  scores: {type: ScorePart2Schema, required: true},
  answers: {type: [defaultModels.AnswerSchema], required: true}
}, {_id: false})

const ResultSchema = new Schema({
    timestamp: {type: Date, default: Date.now()},
    clientInfo: {type: defaultModels.ClientInfoSchema, required: true},
    answersPhase1: {type: ResultsPhase1Schema, required: true},
    answersPhase2: {type: ResultsPhase2Schema, required: true},
    answersPhase3: ResultsPhase2Schema,
});

const InstructionSchema = new Schema({
    _id: String,
    instructions: {
        client: {type: String, required: true},
        leader: {type: String, required: true}
    }
}, {_id: false});

const ButtonOptionSchema = new Schema({
    btnText: {type: String, required: true},
    btnValue: {type: String, required: true},
}, {_id: false});

const OptionSchema = new Schema({
   _id: String,
   options: {type: [ButtonOptionSchema], required: true}
});

module.exports = {
    Result: mongoose.model('Results', ResultSchema),
    Instruction: mongoose.model('Instuction', InstructionSchema),
    Option: mongoose.model('Option', OptionSchema),
};
