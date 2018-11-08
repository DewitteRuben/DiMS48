const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ButtonOptionSchema = require('./button.option.server.model');

const OptionSchema = new Schema({
    _id: String,
    options: {type: [ButtonOptionSchema.schema], required: true}
});

module.exports = {
    model: mongoose.model('Option', OptionSchema),
    schema: OptionSchema,
};
