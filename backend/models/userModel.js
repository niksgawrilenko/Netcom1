const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    uniq: true,
    required: true,
  },
  tel: {
    type: String,
    uniq: true,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  streed: {
    type: String,
    required: true,
  },
  home: {
    type: String,
    required: true,
  },
  kv: {
    type: String,
    required: true,
  },
  tarif: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now(),
  },
  balans: {
    type: Number,
    default: 0,
  },
});

module.exports.User = mongoose.model('User', userSchema);
