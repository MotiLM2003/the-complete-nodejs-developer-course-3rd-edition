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
  const response = await request(app)
    .post('/users')
    .send({
      name: 'moti',
      email: 'moti@gmail.com',
      password: 'MyPass777!',
      age: 23,
    })
    .expect(201);

  const user = await User.findById(response.body.user._id);
  console.log('user', user);
  // expect(user).not.toBeNull();
  // expect(response.body.user.name).toBe(user.name);
  // expect(response.body).toMatchObject({
  //   user: {
  //     name: 'moti',
  //     email: 'moti@gmail.com',
  //   },
  //   token: user.tokens[0].token,
  // });

  // expect(user.tokens[1]).not.toBe(response.body.token);
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
  const response = await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('should not get user profile for user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('should delete user profile.', async () => {
  await request(app)
    .delete('/users/')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send();
  const user = User.findById(userOneId);
  // expect(user).toBeNull();
});

test('should not delete user profile.', async () => {
  await request(app)
    .delete('/users/')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}1`)
    .send()
    .expect(401);
});

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg');
});
