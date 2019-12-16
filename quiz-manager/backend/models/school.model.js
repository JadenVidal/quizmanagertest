const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schoolSchema = new Schema({
  name: { type: String, unique: true },
  keys: [{ type: String, unique: true }]
}, {
  timestamps: true,
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;