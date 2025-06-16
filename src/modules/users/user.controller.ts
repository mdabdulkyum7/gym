import { Request, Response, NextFunction } from 'express';
import { userService } from './user.service';
import { sendSuccessResponse } from '../../utils/response';
import { RequestHandler } from 'express';

export const userController = {
  createTrainer: (async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await userService.createTrainer(req.body);
      sendSuccessResponse(res, 201, 'Trainer created successfully', data);
    } catch (error) {
      next(error);
    }
  }) as RequestHandler,


  getAllUsers: (async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await userService.getUsers();
        sendSuccessResponse(res, 201, "All Users", data);
    } catch (error) {
      next(error);
    }
  })



}; 