const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const Filter = require('bad-words');

const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public/')));

let count = 0;
io.on('connection', (socket) => {
  // single welcome user to the connected client
  socket.emit('newUserMessage', {
    text: 'Welcome',
    createAt: new Date().getTime(),
  });
  socket.broadcast.emit('newUserMessage', 'new user has joined the chat!');
  socket.on('sendMessage', (message, callback) => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      return callback('words not allowed');
    }
    io.emit('messageRecived', message);
    callback();
  });

  socket.on('shareLocation', ({ latitude, longitude }, callback) => {
    io.emit(
      'locationMessage',
      `https://google.com/maps?q=${latitude},${longitude}`
    );
    callback();
  });

  socket.on('disconnect', () => {
    io.emit('userLeft', 'user has left');
  });
});
server.listen(3000, () => {
  console.log('listining');
});
