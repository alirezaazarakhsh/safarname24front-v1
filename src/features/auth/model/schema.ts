import * as z from 'zod';
import { isValidIranianMobile } from '../model/utils';

// Step 1: Validates phone strictly, allows otp string
export const phoneStepSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'شماره همراه را وارد نمایید')
    .refine((val) => isValidIranianMobile(val), {
      message: 'شماره همراه وارد شده معتبر نمی‌باشد',
    }),
  otp: z.string(),
});

// Step 2: Validates otp strictly (5 digits), allows phone string
export const otpStepSchema = z.object({
  phoneNumber: z.string(),
  otp: z.string().length(4, 'کد تایید باید 4 رقم باشد'),
});
