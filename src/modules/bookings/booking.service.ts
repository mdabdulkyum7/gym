import { bookingModel } from './booking.model';
import { scheduleModel } from '../schedules/schedule.model';

export const bookingService = {
  async createBooking(data: { scheduleId: string; traineeId: string }) {
    const schedule = await scheduleModel.findById(data.scheduleId);
    if (!schedule) {
      throw { statusCode: 404, message: 'Schedule not found' };
    }

    const bookings = await bookingModel.findBySchedule(data.scheduleId);
    if (bookings.length >= 10) {
      throw { statusCode: 400, message: 'Class schedule is full', errorDetails: 'Maximum 10 trainees allowed per schedule' };
    }

    const existingBooking = await bookingModel.findByTraineeAndSchedule(data.traineeId, data.scheduleId);
    if (existingBooking) {
      throw { statusCode: 400, message: 'Trainee already booked this schedule' };
    }

    return bookingModel.create(data);
  },

  async cancelBooking(bookingId: string, traineeId: string) {
    const booking = await bookingModel.findByTraineeAndSchedule(traineeId, bookingId);
    if (!booking) {
      throw { statusCode: 404, message: 'Booking not found' };
    }
    return bookingModel.delete(booking.id);
  },
};