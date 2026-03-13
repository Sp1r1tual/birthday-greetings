import z from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),

  PORT: z.string().default('5000'),

  CLIENT_URL: z.url().default('http://localhost:5173'),

  DB_URL: z.url(),
});
