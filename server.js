import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

// เก็บข้อมูลสถานะของเกม
let gameState = {
  team1Name: 'Team 1',
  team2Name: 'Team 2',
  team1Score: 0,
  team2Score: 0,
  team1Color: 'blue',
  team2Color: 'green',
  team1Sets: 0,
  team2Sets: 0,
  currentSet: 1,
};

const io = new Server(server, {
  cors: {
    // origin: 'http://localhost:5173', // สำหรับทดสอบในเครื่องตัวเอง
    // origin: 'http://172.20.10.2:5173', // เปลี่ยนเป็น URL ของ Front-end
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  // ส่งสถานะของเกมให้กับ client ทุกครั้งที่เชื่อมต่อ
  socket.emit('game-state', gameState);

  // เมื่อได้รับคำสั่งรีเซ็ต
  socket.on('reset-score', (data) => {
    scoreData = {
      ...scoreData,
      team1Score: data.team1Score,
      team2Score: data.team2Score,
      team1Sets: data.team1Sets,
      team2Sets: data.team2Sets,
      currentSet: data.currentSet,
    };
    // ส่งข้อมูลไปยัง Client ที่เชื่อมต่อ
    io.emit('reset-score', scoreData);
  });

  // รับข้อมูลการอัปเดตคะแนนจาก client
  socket.on('update-score', (data) => {
    gameState = { ...gameState, ...data };  // อัปเดตสถานะของเกม
    io.emit('update-score', gameState);  // ส่งข้อมูลให้ทุก client
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running');
});
