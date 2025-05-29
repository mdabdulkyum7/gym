import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccessResponse } from '../../utils/response';

export const authController = {
  async register(req: Request, res: Response) {
    const data = await authService.register(req.body);
    sendSuccessResponse(res, 201, 'User registered successfully', data);
  },

  async login(req: Request, res: Response) {
    const data = await authService.login(req.body);
    sendSuccessResponse(res, 200, 'Login successful', data);
  },
};