// src/modules/users/user.route.ts
import express from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { $Enums } from '@prisma/client'; // Import Prisma's Role enum
import { validateRequest } from '../../middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const createTrainerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(1),
  }),
});

router.post(
  '/trainers',
  authMiddleware([$Enums.Role.Admin]), // Use Prisma's Role enum
  validateRequest(createTrainerSchema),
  userController.createTrainer
);

export const userRoutes = router;