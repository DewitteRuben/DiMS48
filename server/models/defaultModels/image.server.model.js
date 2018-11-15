const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const ImageSchema = new Schema({
    _id: String,
    imgUrl: {type: String, required: true},
    extra: String
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('Image', ImageSchema),
    schema: ImageSchema
};
