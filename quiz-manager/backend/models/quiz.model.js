const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String },
    listofanswers: [{ type: String }],
});


const quizSchema = new Schema({
  name: { type: String, unique: true },
  scope: { type: String },
  username: { type: String },
  questions: [{ type: questionSchema }]
}, {
  timestamps: true,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;