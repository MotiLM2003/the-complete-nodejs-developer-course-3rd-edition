const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./tasks');
// const { use } = require('../routes/tasksRoutes');

const userSchema = mongoose.Schema(
  {
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
    tokens: [
      {
        token: { type: String, required: true },
      },
    ],
    avatar: { type: Buffer },
  },
  {
    timestamps: true,
  }
);

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
const secret = 'coolworldman';
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, secret);
  console.log('token', user.tokens);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.virtual('tasks', {
  ref: 'tasks',
  localField: '_id',
  foreignField: 'owner',
});

userSchema.methods.toJson = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.tokens;
  delete userObject.password;
  delete userObject.avatar;
  delete userObject.__v;

  return userObject;
};

// hash password before saving
userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.pre('remove', async function (next) {
  const user = this;
  const { _id: owner } = user;
  console.log('removing tasks', owner);
  await Task.deleteMany({ owner });
  next();
});

// delete user tasks when user is removed.

const User = mongoose.model('users', userSchema);

module.exports = User;
