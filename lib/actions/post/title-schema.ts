// /lib/validation/title-schema.ts
import { z } from 'zod';

export const TitleSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  userEmail: z.string().email({ message: 'Invalid email address' }),
});