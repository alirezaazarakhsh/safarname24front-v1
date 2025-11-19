import { z } from 'zod';
import { convertToEnglishDigits } from '@/utils';

// ------------------------------

function isValidIranianNationalId(input: string): boolean {
  if (!/^\d{8,10}$/.test(input)) return false;
  const code = ('0000' + input).slice(-10);
  if (parseInt(code.substring(3, 9), 10) === 0) return false;
  const check = parseInt(code[9], 10);
  const sum = code
    .substring(0, 9)
    .split('')
    .reduce((acc, digit, i) => acc + parseInt(digit, 10) * (10 - i), 0);
  const remainder = sum % 11;
  return (
    (remainder < 2 && check === remainder) ||
    (remainder >= 2 && check === 11 - remainder)
  );
}

const personSchema = z.object({
  first_name: z.string().nonempty('* نام الزامی است'),
  last_name: z.string().nonempty('* نام خانوادگی الزامی است'),
  national_code: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return '';
      const cleaned = convertToEnglishDigits(val).replace(/[^\d]/g, '').trim();
      return cleaned;
    })
    .pipe(
      z
        .string()
        .refine(
          (val) => val === '' || isValidIranianNationalId(val),
          '* کد ملی معتبر نیست',
        )
        .default(''),
    ),
});

const personWithPhoneSchema = personSchema.extend({
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

export const formSchema = z
  .object({
    reserver: personWithPhoneSchema,
    rooms: z.array(
      z.object({
        id: z.union([z.string(), z.number()]),
        name: z.string(),
        capacity: z.number(),
        extra_capacity: z.number(),
        discount_on_purchase: z.number(),
        extra_capacity_price: z.number(),
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
          main_passenger: personWithPhoneSchema,
          other_passengers: z.array(personSchema),
          extra_capacity_passengers: z.array(personSchema),
        }),
      }),
    ),
  })
  .superRefine((form, ctx) => {
    const allPassengers: {
      national_code: string;
      path: (string | number)[];
    }[] = [];

    form.rooms.forEach((room, roomIndex) => {
      const { main_passenger, other_passengers, extra_capacity_passengers } =
        room.passengers;

      allPassengers.push({
        national_code: main_passenger.national_code,
        path: [
          'rooms',
          roomIndex,
          'passengers',
          'main_passenger',
          'national_code',
        ],
      });

      other_passengers.forEach((p, i) =>
        allPassengers.push({
          national_code: p.national_code,
          path: [
            'rooms',
            roomIndex,
            'passengers',
            'other_passengers',
            i,
            'national_code',
          ],
        }),
      );

      extra_capacity_passengers.forEach((p, i) =>
        allPassengers.push({
          national_code: p.national_code,
          path: [
            'rooms',
            roomIndex,
            'passengers',
            'extra_capacity_passengers',
            i,
            'national_code',
          ],
        }),
      );
    });

    const seen: Record<string, (typeof allPassengers)[0][]> = {};
    allPassengers.forEach((p) => {
      if (!seen[p.national_code]) seen[p.national_code] = [];
      seen[p.national_code].push(p);
    });

    Object.values(seen).forEach((arr) => {
      if (arr.length > 1) {
        arr.forEach((p) => {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: p.path,
            message: '* کد ملی تکراری وارد شده است',
          });
        });
      }
    });
  });
