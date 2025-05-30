// src/modules/auth/auth.controller.ts
import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccessResponse } from '../../utils/response';

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.register(req.body);
      sendSuccessResponse(res, 201, 'User registered successfully', data);
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await authService.login(req.body);
      sendSuccessResponse(res, 200, 'Login successful', data);
    } catch (error) {
      next(error);
    }
  },
};