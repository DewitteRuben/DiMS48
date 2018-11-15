const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const ButtonOptionSchema = require('./button.option.server.model');

const ButtonOptionsSchema = new Schema({
    _id: String,
    options: {type: [ButtonOptionSchema.schema], required: true}
});

module.exports = {
    model: DiMS48Database.model('ButtonOptions', ButtonOptionsSchema),
    schema: ButtonOptionsSchema,
};
