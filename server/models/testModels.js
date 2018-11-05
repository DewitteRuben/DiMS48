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
  SchooledTill: Number,
  SchooledFrom: Number,
  Sex: String,
  Notes: String
});

const AnswerSchema = new Schema({
  id: String,
  answer: String,
  correctAnswer: String
})

const ResultsPart1Schema = new Schema({
  id: Number,
  AnswersPhase1: [Answer],
  AnswersPhase2: [Answer]
});

const ResultsPart2Schema = new Schema({
  id: Number,
  Answers: [Answer]
})

module.exports = {
  Instruction: mongoose.model('Instruction', InstructionsSchema),
  Image: mongoose.model('Image', ImagesSchema),
  ClientInfo: mongoose.model('ClientInfo', ClientInfoSchema),
  Answer: mongoose.model('Answer', AnswerSchema),
  ResultsPart1: mongoose.model('ResultsPart1', ResultsPart1Schema),
  ResultsPart2: mongoose.model('ResultsPart2', ResultsPart2Schema)
}
