import express from 'express';
import { bookingController } from './booking.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { Role } from '../../constants/role';
import { validateRequest } from '../../middlewares/validateRequest';
import { z } from 'zod';

const router = express.Router();

const createBookingSchema = z.object({
  body: z.object({
    scheduleId: z.string(),
  }),
});

router.post(
  '/',
  authMiddleware([Role.Trainee]),
  validateRequest(createBookingSchema),
  bookingController.createBooking
);

router.delete(
  '/:bookingId',
  authMiddleware([Role.Trainee]),
  bookingController.cancelBooking
);

export const bookingRoutes = router;