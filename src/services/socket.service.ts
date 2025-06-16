
import { Server as SocketIOServer, Socket } from 'socket.io';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const handleSocketConnection = (socket: Socket, io: SocketIOServer) => {
  
  socket.on("join-room", async (roomId: string) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  });


  socket.on("send-message", async (data: { roomId: string, message: string, userId: string }) => {
    const { roomId, message, userId } = data;

 

  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
};
