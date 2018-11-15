const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const ButtonOptionSchema = new Schema({
    btnText: {type: String, required: true},
    btnValue: {type: String, required: true},
}, {_id: false});

module.exports = {
  model: DiMS48Database.model('ButtonOption', ButtonOptionSchema),
  schema: ButtonOptionSchema,
};
