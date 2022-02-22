const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public/')));

let count = 0;
io.on('connection', (socket) => {
  // single welcome user to the connected client
  socket.emit('newUserMessage', 'Welcome to the chat!');
  socket.broadcast.emit('newUserMessage', 'new user has joined the chat!');
  socket.on('sendMessage', (message) => {
    io.emit('messageRecived', message);
  });

  socket.on('shareLocation', (coords) => {
    console.log(coords);
    io.emit('messageRecived', JSON.stringify(coords));
  });
  socket.on('disconnect', () => {
    io.emit('userLeft', 'user has left');
  });
});
server.listen(3000, () => {
  console.log('listining');
});
