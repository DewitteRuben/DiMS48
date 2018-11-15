const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DiMS48Database = require('../../util/databaseGetter').DiMS48Database;

const InstructionSchema = new Schema({
    _id: String,
    instructions: {
        client: {type: String, required: true},
        leader: {type: String, required: true}
    }
}, {_id: false});

module.exports = {
    model: DiMS48Database.model('Instuction', InstructionSchema),
    schema: InstructionSchema,
};
