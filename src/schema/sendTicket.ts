import { z } from 'zod';

export const sendTicket = z.object({
  text: z.string().min(1),
  email: z.string().email(),
  full_name: z.string().min(1),
  title: z.string().min(15).max(35),
  phone_number: z.string().regex(/^\d+$/).min(10).max(11),
});
