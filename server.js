import express from 'express';
import next from 'next';
import http from 'http';
import { Server } from 'socket.io';

// ...existing code...

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);
  const io = new Server(server);

  io.on('connection', (socket) => {
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
    });

    socket.on('playerMove', ({ roomId, move }) => {
      socket.to(roomId).emit('opponentMove', move);
    });
  });

  expressApp.all('*', (req, res) => handle(req, res));

  server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
});