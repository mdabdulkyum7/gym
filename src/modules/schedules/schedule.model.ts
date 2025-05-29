import prisma from '../../config/db';

export const scheduleModel = {
  async create(data: { date: Date; startTime: Date; endTime: Date; trainerId: string }) {
    return prisma.schedule.create({ data });
  },

  async findByDate(date: Date) {
    return prisma.schedule.findMany({
      where: { date: { gte: new Date(date.setHours(0, 0, 0, 0)), lte: new Date(date.setHours(23, 59, 59, 999)) } },
    });
  },

  async findById(id: string) {
    return prisma.schedule.findUnique({ where: { id } });
  },

  async findByTrainerAndDate(trainerId: string, date: Date) {
    return prisma.schedule.findMany({
      where: {
        trainerId,
        date: { gte: new Date(date.setHours(0, 0, 0, 0)), lte: new Date(date.setHours(23, 59, 59, 999)) },
      },
    });
  },
};