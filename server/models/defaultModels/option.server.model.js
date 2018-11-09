const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    name: {type: String, required: true},
    value: {type: String, required: true},
}, {_id: false});

module.exports = {
  model: mongoose.model('Option', OptionSchema),
  schema: OptionSchema,
};
