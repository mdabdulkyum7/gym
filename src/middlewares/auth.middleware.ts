
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { $Enums } from '@prisma/client'; // Use Prisma's Role enum

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: $Enums.Role };
}

export const authMiddleware = (roles: $Enums.Role[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: 'No token provided.',
      });
      return;
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: $Enums.Role };
      if (!roles.includes(decoded.role)) {
        res.status(403).json({
          success: false,
          message: 'Unauthorized access.',
          errorDetails: 'You do not have permission to perform this action.',
        });
        return;
      }

      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: 'Invalid token.',
      });
    }
  };
};