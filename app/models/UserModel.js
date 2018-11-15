const mongoose = require('mongoose');

const validateEmail = function(email) {
  const emailRegex = /^[-a-z0-9%S_+]+(\.[-a-z0-9%S_+]+)*@(?:[a-z0-9-]{1,63}\.){1,125}[a-z]{2,63}$/i;
  return emailRegex.test(email);
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username không được để trống!']
  },

  phone: {
    type: Number,
    required: [true, 'Phone không được để trống!' ],
    default: 0,
  },

  email: {
    type: String,
    required: [true, 'Email không được để trống!'],
    unique: true,
    lowercase: true,
    validate: [validateEmail, '{VALUE} không phải là một địa chỉ email hợp lệ'],
  },

  password: {
    type: String,
    required: [true],
  },

  token: {
    type: String,
    required: [true],
  },

  create_at: {
    type: Date,
    default: Date.now(),
  }
});

module.exports = mongoose.model('Users', userSchema);
