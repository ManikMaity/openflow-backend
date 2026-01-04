import { z } from 'zod';

const blockedEmailDomains = [
  'tempmail.com',
  '10minutemail.com',
  'disposablemail.com',
  'mailinator.com',
  'guerrillamail.com',
  'yopmail.com',
];

export const passwordSchema = z
  .string('Password must be a string')
  .min(8, 'Password must be at least 8 characters')
  .regex(/[a-z]/, 'Password must contain a lowercase letter')
  .regex(/[A-Z]/, 'Password must contain an uppercase letter')
  .regex(/[0-9]/, 'Password must contain a number')
  .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character')
  .regex(/^\S+$/, 'Password must not contain spaces');

export const emailSchema = z
  .email('Invalid email address')
  .trim()
  .toLowerCase()
  .refine(
    (email) => {
      const domain = email.split('@')[1];
      return !blockedEmailDomains.includes(domain);
    },
    {
      message: 'This email domain is not allowed',
    },
  );
