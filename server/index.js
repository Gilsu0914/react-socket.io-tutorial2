const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`유저 연결됨: ${socket.id}`);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(` ID: ${socket.id} 유저가 ${data}방에 접속했습니다.`);
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    console.log('유저 연결끊김', socket.id);
  });
});

server.listen(3001, () => {
  console.log('서버 러닝중');
});
