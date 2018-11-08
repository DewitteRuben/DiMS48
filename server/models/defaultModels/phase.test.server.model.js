const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhaseTestSchema = new Schema({
    _id: Number,
    title: {type: String, required: true},
    description: String,
    route: {type: String, required: true}
}, {_id: false});

module.exports = {
    model: mongoose.model('PhaseTest', PhaseTestSchema),
    schema: PhaseTestSchema,
};
