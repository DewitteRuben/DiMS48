const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  _id: String,
  imgUrl: {type: String, required: true},
  extra: String
}, {_id: false});

const ClientInfoSchema = new Schema({
  age: {type: Number, required: true},
  schooledTill: {type: Number, required: true},
  schooledFor: {type: Number, required: true},
  gender: {type: String, required: true},
  notes: {type: String, required: true}
}, {_id: false});

const AnswerSchema = new Schema({
  _id: String,
  answer: {type: String, required: true},
  correctAnswer: {type: String, required: true}
}, {_id: false});

const TestSchema = new Schema({
  _id: Number,
  title: {type: String, required: true},
  description: String,
  route: {type: String, required: true}
}, {_id: false})

module.exports = {
  Image: mongoose.model('Image', ImageSchema),
  ClientInfo: mongoose.model('ClientInfo', ClientInfoSchema),
  Answer: mongoose.model('Answer', AnswerSchema),
  Test: mongoose.model('Test', TestSchema),
  AnswerSchema,
  ImageSchema,
  ClientInfoSchema,
};
