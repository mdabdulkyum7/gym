
import jwt from 'jsonwebtoken';
import { $Enums } from '@prisma/client'; // Import Prisma's generated enums
import { env } from '../config/env';

export const generateToken = (user: { id: string; role: $Enums.Role }) => {
  return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET!, { expiresIn: '1d' });
};