'use client';

import { z } from 'zod';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';

import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { convertToEnglishDigits } from '@/utils';
import { generalInstance } from '@/utils/services';
import RulesAndRegulation from './RulesAndRegulation';
import { Form, FormField, FormItem, FormControl } from '@/components/ui/form';

const formSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^9\d{9}$/, 'شماره همراه باید ۱۰ رقم باشد و با ۹ شروع شود (مثال: ۹۱۲۳۴۵۶۷۸۹)'),
});

type Props = {
  setDialogStep: () => void;
};

// ----------------------------

export default function PhoneNumber(props: Props) {
  const { setDialogStep } = props;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phoneNumber: '' },
  });

  useEffect(() => {
    const storedPhoneNumber = sessionStorage.getItem('upn');
    if (storedPhoneNumber) {
      form.setValue('phoneNumber', storedPhoneNumber);
    }
  }, [form]);

  const mutation = useMutation({
    mutationFn: (data: { phone: string }) => {
      return generalInstance.post('/auth/', data);
    },
    onError: (error: AxiosError<{ detail?: string }>) => {
      if (error?.response?.status === 502 || error?.response?.status === 504) {
        form.setError('phoneNumber', {
          message: 'سرور بک‌اند در دسترس نیست (502 Bad Gateway). لطفاً سرویس Django/Gunicorn را در سرور بررسی فرمایید.',
        });
        return;
      }
      const serverError = error?.response?.data?.detail;
      form.setError('phoneNumber', {
        message: serverError
          ? serverError
          : 'مشکلی در ارسال پیامک به وجود آمده است، لطفاً مجدداً تلاش نمایید.',
      });
    },
    onSuccess: () => {
      setDialogStep();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let clean = values.phoneNumber.replace(/[^\d]/g, '');
    if (clean.startsWith('0')) clean = clean.slice(1);
    sessionStorage.setItem('upn', clean);
    mutation.mutate({ phone: `0${clean}` });
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
                    placeholder="9123456789"
                    type="tel"
                    inputMode="numeric"
                    onChange={(e) => {
                      let cleaned = convertToEnglishDigits(e.target.value).replace(/[^\d]/g, '');
                      if (cleaned.startsWith('98') && cleaned.length > 2) {
                        cleaned = cleaned.slice(2);
                      }
                      if (cleaned.startsWith('0')) {
                        cleaned = cleaned.slice(1);
                      }
                      field.onChange(cleaned.slice(0, 10));
                    }}
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
