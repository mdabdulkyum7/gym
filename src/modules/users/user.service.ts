import bcrypt from 'bcrypt';
import { userModel } from './user.model';

export const userService = {
  async createTrainer(data: { email: string; password: string; name: string }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return userModel.createTrainer({ ...data, password: hashedPassword });
  },
};