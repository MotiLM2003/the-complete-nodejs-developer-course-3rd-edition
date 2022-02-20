const request = require('supertest');
const Task = require('../src/models/tasks');
const app = require('../src/app');
const {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
  setDatabase,
} = require('./fixtures/db');

beforeEach(() => setDatabase());
test('should create task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ description: 'from test suite' })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test('should get user one tasks', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  console.log('response2', response.body);
  expect(response.body.length).toEqual(2);
});

test('try delete not my own task', async () => {
  request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
