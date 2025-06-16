import bcrypt from 'bcrypt';
import { userModel } from './user.model';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const userService = {
  async createTrainer(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return userModel.createTrainer({ ...data, password: hashedPassword });
  },

  async getUsers() {
  const users = await prisma.user.findMany();
  return users;
}


};