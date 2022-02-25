const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');
const path = require('path');

const {
  generateMessage,
  generateLocationMessage,
} = require('./utils/messages');

const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public/')));

let count = 0;
io.on('connection', (socket) => {
  // single welcome user to the connected client
  socket.emit('messageRecived', generateMessage('Welcome'));
  socket.broadcast.emit(
    'messageRecived',
    generateMessage('new user has joined the chat!')
  );
  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('words not allowed');
    }
    io.emit('messageRecived', generateMessage(message));
    callback();
  });

  socket.on('shareLocation', ({ latitude, longitude }, callback) => {
    io.emit(
      'locationMessage',
      generateLocationMessage(
        `https://google.com/maps?q=${latitude},${longitude}`,
        `user sent location`
      )
    );
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('messageRecived', generateMessage('user has left'));
  });
});
server.listen(3000, () => {
  console.log('listining');
});
