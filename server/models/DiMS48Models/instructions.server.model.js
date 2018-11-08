const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructionSchema = new Schema({
    _id: String,
    instructions: {
        client: {type: String, required: true},
        leader: {type: String, required: true}
    }
}, {_id: false});

module.exports = {
    model: mongoose.model('Instuction', InstructionSchema),
    schema: InstructionSchema,
};
