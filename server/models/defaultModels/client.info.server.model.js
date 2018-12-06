const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;


const ClientInfoSchema = new Schema({
    age: {type: Number, required: true},
    schooledTill: {type: Number, required: true},
    schooledFor: {type: Number, required: true},
    gender: {type: String, required: true, enum: ['m', 'v', 'a']},
    notes: {type: String, required: true}
}, {_id: false});

module.exports = {
  model: DiMS48Database.model('ClientInfo', ClientInfoSchema),
  schema: ClientInfoSchema
};
