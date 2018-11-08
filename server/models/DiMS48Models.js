const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Result = require('./DiMS48Models/results.server.model');
const Instruction = require('./DiMS48Models/instructions.server.model');
const Option = require('./DiMS48Models/option.server.model');

module.exports = {
    Result: Result.model,
    Instruction: Instruction.model,
    Option: Option.model,
};
