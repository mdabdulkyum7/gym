
import { z } from 'zod';
import { $Enums } from '@prisma/client';

export const authValidation = {
  register: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    name: z.string().min(1, 'Name is required'),
    role: z.enum([$Enums.Role.Admin, $Enums.Role.Trainer, $Enums.Role.Trainee]).default($Enums.Role.Trainee),
  }),
  login: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
};