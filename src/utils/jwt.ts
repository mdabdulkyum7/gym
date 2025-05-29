import jwt from 'jsonwebtoken';

import { Role } from '../constants/role';
import { env } from '../config/env';

export const generateToken = (user: { id: string; role: Role }) => {
  return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET!, { expiresIn: '1d' });
};