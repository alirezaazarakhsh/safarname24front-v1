'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import RulesAndRegulation from './RulesAndRegulation';

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, 'شماره تلفن باید 10 رقم باشد')
    .max(10, 'شماره تلفن باید 10 رقم باشد')
    .regex(/^\d+$/, 'فقط عدد وارد کنید'),
});

type Props = {
  setDialogStep: () => void;
  setPhoneNumber: (phone: string) => void; // Pass phone to OTP step
};

export default function PhoneNumber({ setDialogStep, setPhoneNumber }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phoneNumber: '' },
  });

  const mutation = useApiMutation({
    url: '/api/auth/send-otp',
    method: 'post',
    options: {
      onSuccess: () => {
        const phone = form.getValues().phoneNumber;
        setPhoneNumber(phone);
        setDialogStep();
      },
      onError: (err: any) => {
        form.setError('phoneNumber', {
          message: err.response?.data?.error || 'مشکلی به وجود آمده است',
        });
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ phone: `0${values.phoneNumber}` });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col md:items-center"
      >
        <span className="text-zinc-800 text-cs09 font-extrabold mb-2.5">
          ورود به حساب کاربری
        </span>
        <p className="text-zinc-600 text-cs08 font-semibold">
          برای ورود به سفرنامه 24 شماره همراه خود را وارد نمایید :
        </p>

        <div
          dir="ltr"
          className={`w-full h-12 text-zinc-600 mt-6 mb-4 grid grid-cols-[1fr_3fr] overflow-hidden border-2 rounded-lg md:mt-5 md:mb-3 ${form.formState.errors.phoneNumber
              ? 'border-cs-red/50'
              : 'border-zinc-200'
            }`}
        >
          <div className="text-[0.85rem] font-semibold text-zinc-400 flex-center border-r-2">
            + 98
          </div>
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      const digits = e.target.value
                        .replace(/[^\d]/g, '')
                        .slice(0, 10);
                      field.onChange(digits);
                    }}
                    onBlur={() => form.clearErrors('phoneNumber')}
                    className="h-full text-[0.9rem] pl-6 tracking-[0.2rem] border-none rounded-none"
                    placeholder="9123456789"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="mt-auto md:mt-4">
          <RulesAndRegulation />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`relative w-full h-12 bg-cs-dark-blue mt-4 overflow-hidden rounded-lg transition-colors duration-300 ease-in-out md:mt-0 hover:bg-cs-dark-blue/95 ${mutation.isPending ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''
            }`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 text-cs85 font-semibold flex-center pointer-events-none transition-all duration-300 ease-in-out ${mutation.isPending
                ? 'opacity-0 invisible -right-8'
                : 'opacity-100 visible right-0'
              }`}
          >
            تایید و دریافت کد
          </span>
          <span
            className={`absolute inset-0 flex-center pointer-events-none transition-all duration-300 ease-in-out ${mutation.isPending
                ? 'opacity-100 visible left-0'
                : 'opacity-0 invisible -left-8'
              }`}
          >
            <span className="loader-dots" />
          </span>
        </button>
      </form>
    </Form>
  );
}
