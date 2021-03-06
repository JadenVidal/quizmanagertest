const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, unique: true, minlength: 3 },
  password: { type: String, minlength: 3 },
  key: {type: String}
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;