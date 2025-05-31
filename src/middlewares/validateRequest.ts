import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.parseAsync(req.body); 
      next();
    } catch (error: any) {
      console.error('Validation error:', error); 
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error?.issues || error, 
      });
    }
  };
};