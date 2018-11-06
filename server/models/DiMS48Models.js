const ResultsPart1Schema = new Schema({
  id: Number,
  answersPhase1: [Answer],
  answersPhase2: [Answer]
});

const ResultsPart2Schema = new Schema({
  id: Number,
  answers: [Answer]
});

module.exports = {
  ResultsPart1: mongoose.model('ResultsPart1', ResultsPart1Schema),
  ResultsPart2: mongoose.model('ResultsPart2', ResultsPart2Schema)
}
