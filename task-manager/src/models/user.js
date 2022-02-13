const mongoose = require('mongoose');
const validator = require('validator');

const User = mongoose.model('users', {
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid e-mail');
      }
    },
  },
  age: {
    type: Number,
    required: true,
    validate(value) {
      if (value < 1) {
        throw new Error('Age must be a positive number');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (value.includes('password')) {
        throw new Error('Passowrd cannot contain "password"');
      } else if (value.length <= 5) {
        throw new Error('Password must be at least 6 characters long');
      }
    },
  },
});

module.exports = User;
