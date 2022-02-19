const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../src/app');
const mongoose = require('mongoose');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();

const userOne = {
  _id: userOneId,
  name: 'test user',
  email: 'test@gmail.com',
  password: 'test1234!!567',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET),
    },
  ],
};

beforeEach(async () => {
  await User.deleteMany({});
  await new User(userOne).save();
});

afterEach(() => {});

test('should sign up a new user', async () => {
  await request(app)
    .post('/users')
    .send({
      name: 'moti',
      email: 'moti@gmail.com',
      password: 'MyPass777!',
      age: 23,
    })
    .expect(201);
});

test('should not login nonexist user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      name: 'nonexists',
      email: 'nonexists@gmail.com',
      password: 'nonexists777!',
      age: 23,
    })
    .expect(400);
});

test('should get user profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get user profile for user', async () => {
  await request(app).get('/users/me').send().expect(401);
});
