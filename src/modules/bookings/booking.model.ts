import prisma from '../../config/db';

export const bookingModel = {
  async create(data: { scheduleId: string; traineeId: string }) {
    return prisma.booking.create({ data });
  },

  async findBySchedule(scheduleId: string) {
    return prisma.booking.findMany({ where: { scheduleId } });
  },

  async findByTraineeAndSchedule(traineeId: string, scheduleId: string) {
    return prisma.booking.findFirst({ where: { traineeId, scheduleId } });
  },

  async delete(id: string) {
    return prisma.booking.delete({ where: { id } });
  },
};