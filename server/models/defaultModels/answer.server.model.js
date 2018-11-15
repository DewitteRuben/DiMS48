const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const AnswerSchema = new Schema({
    _id: String,
    answer: {type: String, required: true},
    correctAnswer: {type: String, required: true},
    responseTime: {type: Number},
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('Answer', AnswerSchema),
    schema: AnswerSchema
};
