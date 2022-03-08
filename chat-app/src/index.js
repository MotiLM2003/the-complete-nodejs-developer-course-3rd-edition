const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const path = require('path');

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');
const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public/')));

let count = 0;
io.on('connection', (socket) => {
  // single welcome user to the connected client

  socket.on('sendMessage', (message, callback) => {
    console.log('sendMessage fired');
    const user = getUser(socket.id);

    // const filter = new Filter();
    // if (filter.isProfane(message)) {
    //   return callback('words not allowed');
    // }
    console.log('test');
    io.to(user.room).emit('messageRecived', generateMessage(message));
    callback();
  });

  socket.on('shareLocation', ({ latitude, longitude }, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      'locationMessage',
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`,
        `user sent location`
      )
    );
    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (!user) {
      return new Error('');
    }
    io.room(user.room).emit(
      'messageRecived',
      generateMessage(`${user.username} has left room ${room}`)
    );
  });

  socket.on('join', async ({ username, room }, callback) => {
    console.log('sendMessage fired');
    const { error, user } = addUser({ id: socket.id, username, room });
    console.log('error', error);
    if (error) {
      return callback(error, undefined);
    }

    socket.join(room);
    // socket.emit(
    //   'messageRecived',
    //   generateMessage(`Hi ${username}, welcome to ${room}`)
    // );
    socket.broadcast.emit(
      'messageRecived',
      generateMessage(`${username} has joined to room: ${room}`)
    );

    callback();
  });
});
server.listen(3000, () => {
  console.log('listining');
});
