import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      console.log('Validating request body:', req.body);
      await schema.parseAsync(req.body); // Validate req.body directly
      next();
    } catch (error: any) {
      console.error('Validation error:', error); // Log detailed error
      res.status(400).json({
        success: false,
        message: 'Validation failed',
        error: error?.issues || error, // Include Zod issues if available
      });
    }
  };
};