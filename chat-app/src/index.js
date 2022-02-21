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
  console.log('new connection');
  // single welcome user to the connected client
  socket.emit('welcome', count);

  // socket.on('inc', () => {
  //   count++;
  //   // socket.emit('countUpdate', count);
  //   io.emit('countUpdate', count);
  // });
});

server.listen(3000, () => {
  console.log('listining');
});
