const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientInfoSchema = new Schema({
    age: {type: Number, required: true},
    schooledTill: {type: Number, required: true},
    schooledFor: {type: Number, required: true},
    gender: {type: String, required: true},
    notes: {type: String, required: true}
}, {_id: false});

module.exports = {
  model: mongoose.model('ClientInfo', ClientInfoSchema),
  schema: ClientInfoSchema
};
