const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const OptionSchema = new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
}, {_id: false});

module.exports = {
  model: DiMS48Database.model('Option', OptionSchema),
  schema: OptionSchema,
};
