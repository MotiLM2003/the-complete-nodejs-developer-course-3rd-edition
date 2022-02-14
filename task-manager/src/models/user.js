const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
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
    validate(value) {
      if (value.includes('password')) {
        throw new Error('Passowrd cannot contain "password"');
      } else if (value.length <= 5) {
        throw new Error('Password must be at least 6 characters long');
      }
    },
  },
});

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log('user', user);
  if (!user) {
    throw new Error('Could not found user that match the credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password not match');
  }

  return user;
};

// hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
