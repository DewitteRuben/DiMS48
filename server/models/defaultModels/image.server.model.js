const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    _id: String,
    imgUrl: {type: String, required: true},
    extra: String
}, {_id: false});

module.exports = {
    model: mongoose.model('Image', ImageSchema),
    schema: ImageSchema
};
