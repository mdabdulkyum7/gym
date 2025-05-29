import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  errorDetails?: any;
}

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const errorDetails = err.errorDetails || null;

  res.status(statusCode).json({
    success: false,
    message,
    errorDetails,
  });
};