import { z } from 'zod';

// ------------------------------

const personSchema = z.object({
  first_name: z.string().nonempty('* نام الزامی است'),
  last_name: z.string().nonempty('* نام خانوادگی الزامی است'),
  national_code: z.string().optional(),
  phone_number: z
    .string()
    .nonempty('* شماره همراه الزامی است')
    .regex(/^(0\d*|9\d*)$/, '* شماره همراه معتبر نیست')
    .refine(
      (val) => {
        if (val.startsWith('0')) return val.length === 11;
        if (val.startsWith('9')) return val.length === 10;
        return false;
      },
      (val) => ({
        message: val.startsWith('0')
          ? '* شماره همراه باید دقیقا 11 رقم باشد'
          : '* شماره همراه باید دقیقا 10 رقم باشد',
      }),
    ),
});

export const formSchema = z.object({
  reserver: personSchema,
  rooms: z.array(
    z.object({
      name: z.string(),
      capacity: z.number(),
      extra_capacity: z.number(),
      discount_on_purchase: z.number(),
      extra_capacity_price: z.number(),
      id: z.union([z.string(), z.number()]),
      half_charges: z.object({
        enter: z.object({
          enabled: z.boolean(),
          price: z.number(),
        }),
        exit: z.object({
          enabled: z.boolean(),
          price: z.number(),
        }),
      }),
      passengers: z.object({
        // main_passenger: personSchema.omit({ national_code: true }).extend({
        //   national_code: z.string().nonempty('* کد ملی یا پاسپورت الزامی است'),
        // }),
        main_passenger: personSchema,
        other_passengers: z.array(personSchema.omit({ phone_number: true })),
        extra_capacity_passengers: z.array(
          personSchema.omit({ phone_number: true }),
        ),
      }),
    }),
  ),
});
