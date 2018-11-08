const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ButtonOptionSchema = new Schema({
    btnText: {type: String, required: true},
    btnValue: {type: String, required: true},
}, {_id: false});

module.exports = {
  model: mongoose.model('ButtonOption', ButtonOptionSchema),
  schema: ButtonOptionSchema,
};
