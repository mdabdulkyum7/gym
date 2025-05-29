import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { Role } from '../constants/role';

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: Role };
}

export const authMiddleware = (roles: Role[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: 'No token provided.',
      });
    }

    try {
      const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; role: Role };
      if (!roles.includes(decoded.role)) {
        return res.status(403).json({
          success: false,
          message: 'Unauthorized access.',
          errorDetails: 'You do not have permission to perform this action.',
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized access.',
        errorDetails: 'Invalid token.',
      });
    }
  };
};