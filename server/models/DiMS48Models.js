const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultModels = require('./defaultModels.js');

const ResultSchema = new Schema({
    timestamp: {type: Date, default: Date.now()},
    clientInfo: {type: defaultModels.ClientInfoSchema, required: true},
    answersPhase1: {type: [defaultModels.AnswerSchema], required: true},
    answersPhase2: {type: [defaultModels.AnswerSchema], required: true},
    answersPhase3: [defaultModels.AnswerSchema],
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
