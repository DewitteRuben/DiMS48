const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const ScorePart2Schema = new Schema({
    abstractScore: {type: Number, required: true},
    groupedScore: {type: Number, required: true},
    uniqueScore: {type: Number, required: true}
}, {_id: false});

module.exports = {
    model: DiMS48Database.model("ScorePart2", ScorePart2Schema),
    schema: ScorePart2Schema
};
