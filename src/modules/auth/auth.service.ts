import prisma from '../../config/db';
import { generateToken } from '../../utils/jwt';
import bcrypt from 'bcrypt';
import { Role } from '../../constants/role';

export const authService = {
  async register(data: { email: string; password: string; name: string; role: Role }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        role: data.role,
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