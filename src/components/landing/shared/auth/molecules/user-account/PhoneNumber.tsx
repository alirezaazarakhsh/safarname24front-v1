'use client';

import { z } from 'zod';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { generalInstance } from '@/utils/services';
import RulesAndRegulation from './RulesAndRegulation';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';

const formSchema = z.object({
  phoneNumber: z
    .string()
    .regex(
      /^[0-9\u06F0-\u06F9\u0660-\u0669]+$/,
      'شماره تلفن باید فقط شامل اعداد باشد',
    )
    .min(10, 'شماره تلفن باید 10 رقم باشد')
    .max(10, 'شماره تلفن باید 10 رقم باشد'),
});

type Props = {
  setDialogStep: () => void;
};

// --------------------------------

export default function PhoneNumber(props: Props) {
  const { setDialogStep } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phoneNumber: '' },
  });

  useEffect(() => {
    const storedPhoneNumber = Cookies.get('UPN');
    if (storedPhoneNumber) {
      form.setValue('phoneNumber', storedPhoneNumber);
    }
  }, [form]);

  const mutation = useMutation({
    mutationFn: (data: { phone: string }) => {
      return generalInstance.post('/auth/', data);
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      const serverError = error?.response?.data?.detail;
      form.setError('phoneNumber', {
        message: serverError
          ? serverError
          : 'مشکلی به وجود آمده است , لطفا مجدد تلاش فرمایید .',
      });
    },
    onSuccess: () => {
      setDialogStep();
      Cookies.set('UPN', form.getValues().phoneNumber, {
        path: '/',
        secure: true,
        expires: 1 / 24,
        sameSite: 'Strict',
      });
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
          className={`w-full h-12 text-zinc-600 mt-6 mb-4 grid grid-cols-[1fr_3fr] overflow-hidden border-2 rounded-lg md:mt-5 md:mb-3 ${form.formState.errors.phoneNumber ? 'border-cs-red/50' : 'border-zinc-200'}`}
        >
          <div className="text-[0.85rem] font-semibold text-zinc-400 flex-center border-r-2">
            + 98
          </div>

          <FormField
            name="phoneNumber"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => {
                      field.onChange(
                        e.target.value.replace(/[^\d٠-٩۰-۹]/g, '').slice(0, 10),
                      );
                    }}
                    onBlur={() => form.clearErrors('phoneNumber')}
                    className="h-full text-[0.9rem] pl-6 tracking-[0.2rem] border-none rounded-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <p className="text-cs08 font-semibold text-red-500 mb-3 md:mb-0">
          {form.formState.errors.phoneNumber?.message}
        </p>

        <RulesAndRegulation />

        <button
          disabled={mutation.isPending}
          className={`relative w-full h-12 bg-cs-dark-blue mt-auto overflow-hidden rounded-lg transition-colors duration-300 ease-in-out md:mt-0 hover:bg-cs-dark-blue/95 ${mutation.isPending ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''}`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 text-cs85 font-semibold flex-center pointer-events-none transition-all duration-300 ease-in-out ${mutation.isPending ? 'opacity-0 invisible -right-8' : 'opacity-100 visible right-0'}`}
          >
            تایید و دریافت کد
          </span>

          <span
            className={`absolute inset-0 flex-center pointer-events-none transition-all duration-300 ease-in-out ${mutation.isPending ? 'opacity-100 visible left-0' : 'opacity-0 invisible -left-8'}`}
          >
            <span className="loader-dots" />
          </span>
        </button>
      </form>
    </Form>
  );
}
