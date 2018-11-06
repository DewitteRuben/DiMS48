const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructionsSchema = new Schema({
  id: Number,
  text: String
});

const ImagesSchema = new Schema({
  id: Number,
  imgUrl: String
});

const ClientInfoSchema = new Schema({
  age: Number,
  schooledTill: Number,
  schooledFrom: Number,
  gender: String,
  notes: String
});

const AnswerSchema = new Schema({
  id: String,
  answer: String,
  correctAnswer: String
});

module.exports = {
  Instruction: mongoose.model('Instruction', InstructionsSchema),
  Image: mongoose.model('Image', ImagesSchema),
  ClientInfo: mongoose.model('ClientInfo', ClientInfoSchema),
  Answer: mongoose.model('Answer', AnswerSchema)
};
