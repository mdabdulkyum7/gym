import { Request, Response } from 'express';
import { bookingService } from './booking.service';
import { sendSuccessResponse } from '../../utils/response';

export const bookingController = {
  async createBooking(req: Request, res: Response) {
    const data = await bookingService.createBooking(req.body);
    sendSuccessResponse(res, 201, 'Class booked successfully', data);
  },

  async cancelBooking(req: Request, res: Response) {
    const { bookingId } = req.params;
    const { user } = req as any;
    const data = await bookingService.cancelBooking(bookingId, user.id);
    sendSuccessResponse(res, 200, 'Booking cancelled successfully', data);
  },
};