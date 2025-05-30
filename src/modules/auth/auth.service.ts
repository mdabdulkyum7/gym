// src/modules/auth/auth.service.ts
import prisma from '../../config/db';
import { generateToken } from '../../utils/jwt';
import bcrypt from 'bcrypt';
import { $Enums } from '@prisma/client'; // Import Prisma's enums

export const authService = {
  async register(data: { email: string; password: string; name: string; role: $Enums.Role }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role, // Now typed as $Enums.Role
      },
    });
    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  },

  async login(data: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw { statusCode: 404, message: 'User not found', errorDetails: 'Invalid credentials' };
    }
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 401, message: 'Invalid credentials', errorDetails: 'Incorrect password' };
    }
    const token = generateToken({ id: user.id, role: user.role });
    return { user, token };
  },
};