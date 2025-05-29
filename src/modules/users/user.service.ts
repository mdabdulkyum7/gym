import { userModel } from './user.model';
import bcrypt from 'bcrypt';
import { Role } from '../../constants/role';

export const userService = {
  async createTrainer(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return userModel.createTrainer({ ...data, password: hashedPassword });
  },
};