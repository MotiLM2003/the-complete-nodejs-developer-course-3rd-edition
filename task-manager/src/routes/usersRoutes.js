const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');
const sharp = require('sharp');
const multer = require('multer');
const { sendGenericEmail } = require('../emails/account');
// creating new user
router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const email = {
      to: user.email,
      subject: `Welcome to the site ${user.name}`,
      text: `Welcome my friend, this is youre email ${user.email}`,
    };
    sendGenericEmail(email);
    console.log('email sent:', email);
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (err) {
    console.log('here', err.message);
    res.status(400).send(err);
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.send(req.user.tokens);
  } catch (error) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send(req.user.tokens);
  } catch (error) {
    res.status(500).send();
  }
});

// Login user
router.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ user: user, token });
  } catch (error) {
    console.log(error);
    res.status(400).send('could not authenticate user');
  }
});

// get profile
router.get('/users/profile', auth, async (req, res) => {
  res.status(200).send(req.user);
  try {
  } catch (err) {
    res.status(500).send(err);
  }
});

// get user by id
router.get('/users/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).send(user);
    res;
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/users/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'age'];

  // is valid will only be true if allowed field is updating.
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send('Error: invalid fields were in updates');
  }

  const id = req.params.id;
  const filter = req.body;

  try {
    const user = await User.findById(id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    if (!user) {
      return res.status(404).send({});
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/users/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { name, email } = req.user;

  try {
    const deleted = await User.findByIdAndDelete(id);
    sendGenericEmail({
      to: email,
      subject: "We are sorry you're leaaving",
      text: `Hello, ${name}, We are sorry to see you leave we hope that we will meet again one day!`,
    });
    res.send(deleted);
  } catch (error) {
    res.status(400).send(error);
  }
});

const avatar = multer({
  // dest: 'src/avatar', -- use this for saving it to the local driver
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    // **** error upload the file
    // cb(new Error('file must be xxx'));
    // **** file accepted
    // cb(undefined, true);
    // **** reject file (no error)
    // cb(undefined, false);

    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Invalid file'), undefined);
    }
    cb(undefined, true);

    // console.log(file);
  },
});

// uploading and saving avatar
router.post(
  '/users/me/avatar',
  auth,

  avatar.single('avatar'),
  async (req, res) => {
    // console.log(req.user.avatar);

    const buffer = await sharp(req.file.buffer)
      .png()
      .resize({ width: 250, height: 250 })
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete('/users/me/avatar', auth, async (req, res) => {
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(400).send();
  }
});

router.get('/users/:id/avatar', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user || !user.avatar) {
      return res.status(404).send();
    }

    res.set('Content-Type', 'image/png');
    res.send(user.avatar);
  } catch (error) {}
});

module.exports = router;
