
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { handleSocketConnection } from './services/socket.service';

dotenv.config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');

    const server = http.createServer(app);

    const io = new SocketIOServer(server, {
      cors: {
        origin: '*', 
        methods: ['GET', 'POST']
      }
    });

  
    io.on('connection', (socket) => {
      console.log(`🔌 Socket connected: ${socket.id}`);
      handleSocketConnection(socket, io);
    });

  
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error starting server:', error);
    process.exit(1);
  }
}

main();
