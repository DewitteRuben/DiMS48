const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultModels = require('./defaultModels.js');


const AnwserSchema = new Schema({
    _id: String,
    answer: String,
    correctAnswer: String
});

const ResultSchema = new Schema({
    timestamp: {type: Date, default: Date.now()},
    clientInfo: defaultModels.ClientInfoSchema,
    answersPhase1: [AnwserSchema],
    answersPhase2: [AnwserSchema],
    answersPhase3: [AnwserSchema],
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
    Result: mongoose.model('Results', ResultSchema),
    Instruction: mongoose.model('Instuction', InstructionSchema),
    Option: mongoose.model('Option', OptionSchema),
};
