import { Request, Response } from 'express';
import { scheduleService } from './schedule.service';
import { sendSuccessResponse } from '../../utils/response';

export const scheduleController = {
  async createSchedule(req: Request, res: Response) {
    const data = await scheduleService.createSchedule(req.body);
    sendSuccessResponse(res, 201, 'Schedule created successfully', data);
  },

  async getTrainerSchedules(req: Request, res: Response) {
    const { trainerId, date } = req.query;
    const data = await scheduleService.getTrainerSchedules(trainerId as string, new Date(date as string));
    sendSuccessResponse(res, 200, 'Trainer schedules retrieved successfully', data);
  },
};