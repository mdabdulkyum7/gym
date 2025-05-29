import { z } from 'zod';
import { Role } from '../../constants/role';

export const authValidation = {
  register: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(1),
      role: z.enum([Role.Admin, Role.Trainer, Role.Trainee]),
    }),
  }),
  login: z.object({
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
  }),
};