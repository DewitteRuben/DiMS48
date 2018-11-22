const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const InstructionSchema = new Schema({
    _id: String,
    instructions: [{
        title: String,
        message: String
    }, {_id: false}]
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('Instruction', InstructionSchema),
    schema: InstructionSchema,
};
