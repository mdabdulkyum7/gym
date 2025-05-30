// src/config/env.ts
import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  PORT: port({ default: 5000, desc: 'Server port' }),
  DATABASE_URL: str({ desc: 'Database connection URL' }),
  JWT_SECRET: str({ desc: 'JWT secret key for token signing and verification' }),
});