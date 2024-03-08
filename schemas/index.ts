import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address'
  }),
  password: z.string().min(1, {
    message: 'Password is required'
  }),
});

export const RegisterSchema = z.object({
  username: z.string().min(3,{
    message: 'Minimum username length is 3 characters'
  }),
  email: z.string().email({
    message: 'Invalid email address'
  }),
  password: z.string().min(6, {
    message: 'Minimum password legth is 6 characters'
  }),
});
