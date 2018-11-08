const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
    _id: String,
    answer: {type: String, required: true},
    responseTime: {type: Number},
}, {_id: false});

module.exports = {
    model: mongoose.model('Answer', AnswerSchema),
    schema: AnswerSchema
};
