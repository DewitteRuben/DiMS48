const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const Answer = require('../defaultModels/answer.server.model');

const ResultsPhase1Schema = new Schema({
    score: {type: Number, required: true},
    answers: {type: [Answer.schema], required: true}
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('ResultsPhase1', ResultsPhase1Schema),
    schema: ResultsPhase1Schema
};
