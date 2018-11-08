const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ScorePart2Schema = new Schema({
    abstractScore: {type: Number, required: true},
    groupedScore: {type: Number, required: true},
    uniqueScore: {type: Number, required: true}
}, {_id: false});

module.exports = {
    model: mongoose.model("ScorePart2", ScorePart2Schema),
    schema: ScorePart2Schema
};
