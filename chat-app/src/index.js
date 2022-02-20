const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const path = require('path');
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '../public/')));

io.on('connection', () => {
  console.log('new connection');
});

server.listen(3000, () => {
  console.log('listining');
});
