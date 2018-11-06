const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructionsSchema = new Schema({
  text: String
}, {_id: false});

const ImageSchema = new Schema({
  _id: String,
  imgUrl: String
}, {_id: false});

const ClientInfoSchema = new Schema({
  age: Number,
  schooledTill: Number,
  schooledFrom: Number,
  gender: String,
  notes: String
}, {_id: false});

const AnswerSchema = new Schema({
  _id: String,
  answer: String,
  correctAnswer: String
}, {_id: false});

const TestSchema = new Schema({
  _id: Number,
  title: String,
  description: String,
  route: String
}, {_id: false})

module.exports = {
  Instruction: mongoose.model('Instruction', InstructionsSchema),
  Image: mongoose.model('Image', ImageSchema),
  ClientInfo: mongoose.model('ClientInfo', ClientInfoSchema),
  Answer: mongoose.model('Answer', AnswerSchema),
  Test: mongoose.model('Test', TestSchema),
  AnswerSchema,
  ImageSchema,
  ClientInfoSchema,
  InstructionsSchema
};
