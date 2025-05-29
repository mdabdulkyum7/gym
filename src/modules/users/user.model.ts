import prisma from '../../config/db';
import { Role } from '../../constants/role';

export const userModel = {
  async createTrainer(data: { email: string; password: string; name: string }) {
    return prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        role: Role.Trainer,
      },
    });
  },

  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  },
};