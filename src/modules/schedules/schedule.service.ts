import { scheduleModel } from './schedule.model';

export const scheduleService = {
  async createSchedule(data: { date: Date; startTime: Date; endTime: Date; trainerId: string }) {
    const schedules = await scheduleModel.findByDate(data.date);
    if (schedules.length >= 5) {
      throw { statusCode: 400, message: 'Schedule limit exceeded', errorDetails: 'Maximum 5 schedules per day' };
    }
    const endTime = new Date(data.startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours
    return scheduleModel.create({ ...data, endTime });
  },

  async getTrainerSchedules(trainerId: string, date: Date) {
    return scheduleModel.findByTrainerAndDate(trainerId, date);
  },
};