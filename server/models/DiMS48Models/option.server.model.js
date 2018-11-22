const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

//const ButtonOptionSchema = require('./button.option.server.model');

const Option = new Schema({
    _id: String,
    options: [{
        btnText: {type: String, required: true},
        btnValue: {type: String, required: true},
    }]
});

module.exports = {
    model: DiMS48Database.model('ButtonOption', Option),
    schema: Option,
};
