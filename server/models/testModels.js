const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const someSchema = new Schema({

});

module.exports = mongoose.model('something', someSchema);
