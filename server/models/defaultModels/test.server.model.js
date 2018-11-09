const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const phaseTestSchema = require('./phase.test.server.model').schema;
const optionSchema = require('./option.server.model').schema;

const TestSchema = new Schema({
    _id: Number,
    title: {type: String, required: true},
    description: String,
    route: {type: String, required: true},
    phases: [phaseTestSchema],
    options: [optionSchema]
}, {_id: false});

module.exports = {
    model: mongoose.model('Test', TestSchema),
    schema: TestSchema,
};
