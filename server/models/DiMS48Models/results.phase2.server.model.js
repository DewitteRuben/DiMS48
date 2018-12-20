const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const Answer = require('../defaultModels/answer.server.model');
const ScoresPhase2 = require('../DiMS48Models/score.phase2.server.model');

const ResultsPhase2Schema = new Schema({
    scores: {type: ScoresPhase2.schema, required: true},
    answers: {type: [Answer.schema], required: true},
    totalTime: {type: Number}
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('ResultsPhase2', ResultsPhase2Schema),
    schema: ResultsPhase2Schema
};
