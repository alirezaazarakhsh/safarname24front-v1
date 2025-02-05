import { z } from 'zod';

export const sendTicket = z.object({
  subject: z.string().min(15).max(35),
  fullName: z.string().min(1),
  phoneNumber: z.string().regex(/^\d+$/).min(10).max(11),
  email: z.string().email(),
  desc: z.string().min(1),
});
