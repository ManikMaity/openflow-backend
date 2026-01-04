import { z } from 'zod';
import { emailSchema, passwordSchema } from './common.validation';

export const signupSchema = z.object({
  firstName: z
    .string('First name must be a string')
    .min(1, { message: 'First name is required' })
    .max(100, { message: 'First name must be at most 100 characters' }),
  lastName: z
    .string('Last name must be a string')
    .min(1, { message: 'Last name is required' })
    .max(100, { message: 'Last name must be at most 100 characters' }),
  email: emailSchema,
  password: passwordSchema,
});
