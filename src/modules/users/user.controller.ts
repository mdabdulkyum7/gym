import { Request, Response } from 'express';
import { userService } from './user.service';
import { sendSuccessResponse } from '../../utils/response';
import { Role } from '../../constants/role';

export const userController = {
  async createTrainer(req: Request, res: Response) {
    const data = await userService.createTrainer(req.body);
    sendSuccessResponse(res, 201, 'Trainer created successfully', data);
  },
};