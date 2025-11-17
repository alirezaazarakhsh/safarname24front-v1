'use client';

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from '@/components/ui/input-otp';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ResendOTPToken from './ResendOTPToken';
import { convertToEnglishDigits } from '@/utils';
import RulesAndRegulation from './RulesAndRegulation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { axiosInstance } from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

const formSchema = z.object({
  otp: z.string().min(4),
});

type Props = {
  setDialogStep: () => void;
};

// ------------------------------

export default function OTPVerification(props: Props) {
  const { setDialogStep } = props;

  const phoneNumber = sessionStorage.getItem('upn');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  const mutation = useMutation({
    mutationFn: (values: { phone: string; otp: string }) => {
      return axiosInstance({
        data: values,
        method: 'POST',
        url: '/token/',
      });
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      // console.log(data);
      window.location.reload();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ otp: values.otp, phone: `0${phoneNumber}` });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full flex-col md:items-center"
      >
        <span className="mb-2.5 text-cs09 font-extrabold text-zinc-800">
          تایید شماره همراه
        </span>

        <p className="flex gap-1 text-cs08 font-semibold text-zinc-600 md:items-center">
          <span>کد 4 رقمی به شماره</span>
          <span dir="ltr" className="tracking-wider">
            (+98 {phoneNumber})
          </span>
          <span>ارسال شد .</span>
        </p>

        {/* OPT-Input | Resend */}
        <div
          dir="ltr"
          className="mt-6 flex h-10 w-full items-center justify-end gap-4 md:justify-center"
        >
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputOTP
                    {...field}
                    onComplete={() => form.handleSubmit(onSubmit)()}
                    onChange={(val) => {
                      const englishValue = convertToEnglishDigits(val);
                      field.onChange(englishValue.replace(/[^\d]/g, ''));
                    }}
                    maxLength={4}
                    pattern="^[0-9۰-۹]+$"
                  >
                    <InputOTPGroup className="gap-2 text-[0.9rem] text-zinc-600">
                      {[0, 1, 2, 3].map((_) => (
                        <InputOTPSlot
                          key={_}
                          index={_}
                          className={` ${form.formState.errors.otp ? 'border-red-500' : ''}`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          <ResendOTPToken />
        </div>

        {/* Edit-Phone-Number */}
        <button
          type="button"
          className="flex-center my-6 w-fit gap-2 rounded-md text-cs08 font-bold text-zinc-500 transition-colors hover:text-zinc-600 md:mt-5"
          onClick={setDialogStep}
        >
          <span>ویرایش شماره همراه</span>
        </button>

        <div className="hidden md:mt-auto md:flex">
          <RulesAndRegulation />
        </div>

        {/* Submit-Button */}
        <button
          disabled={mutation.isPending}
          className={`relative mt-auto h-12 w-full overflow-hidden rounded-lg bg-cs-dark-blue transition-colors duration-300 ease-in-out hover:bg-cs-dark-blue/95 md:mt-0 ${mutation.isPending ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''}`}
        >
          <span
            className={`flex-center pointer-events-none absolute inset-0 text-cs85 font-semibold text-zinc-100 transition-all duration-300 ease-in-out ${mutation.isPending ? 'invisible -right-8 opacity-0' : 'visible right-0 opacity-100'}`}
          >
            تایید و ادامه فرآیند
          </span>

          <div
            className={`flex-center pointer-events-none absolute inset-0 transition-all duration-300 ease-in-out ${mutation.isPending ? 'visible left-0 opacity-100' : 'invisible -left-8 opacity-0'}`}
          >
            <div className="loader-dots" />
          </div>
        </button>
      </form>
    </Form>
  );
}
