
import express from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { $Enums } from '@prisma/client'; 
import { validateRequest } from '../../middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const createTrainerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  role: z.nativeEnum($Enums.Role).optional(),
});


router.post(
  '/trainers',
  authMiddleware([$Enums.Role.Admin]),
  validateRequest(createTrainerSchema),
  userController.createTrainer
);

router.get('/', authMiddleware([$Enums.Role.Admin]), userController.getAllUsers)

export const userRoutes = router;