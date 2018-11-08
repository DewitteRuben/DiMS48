const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Answer = require('../defaultModels/answer.server.model');

const ResultsPhase1Schema = new Schema({
    score: {type: Number, required: true},
    answers: {type: [Answer.schema], required: true}
}, {_id: false});

module.exports = {
    model: mongoose.model('ResultsPhase1', ResultsPhase1Schema),
    schema: ResultsPhase1Schema
};
