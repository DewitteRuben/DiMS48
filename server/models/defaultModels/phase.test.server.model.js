const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const PhaseTestSchema = new Schema({
    _id: Number,
    title: {type: String, required: true},
    description: String,
    route: {type: String, required: true}
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('PhaseTest', PhaseTestSchema),
    schema: PhaseTestSchema,
};
