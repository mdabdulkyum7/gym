import express from 'express';
import { scheduleController } from './schedule.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { Role } from '../../constants/role';
import { validateRequest } from '../../middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const createScheduleSchema = z.object({
  body: z.object({
    date: z.string().transform((val) => new Date(val)),
    startTime: z.string().transform((val) => new Date(val)),
    trainerId: z.string(),
  }),
});

router.post(
  '/',
  authMiddleware([Role.Admin]),
  validateRequest(createScheduleSchema),
  scheduleController.createSchedule
);

router.get(
  '/trainer',
  authMiddleware([Role.Trainer]),
  scheduleController.getTrainerSchedules
);

export const scheduleRoutes = router;