'use client';

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from '@/components/ui/input-otp';

import { z } from 'zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import ResendOTPToken from './ResendOTPToken';
import RulesAndRegulation from './RulesAndRegulation';
import useLocalStorage from '@/hooks/useLocalStorage';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const formSchema = z.object({
  otp: z.string().min(4),
});

type Props = {
  setDialogStep: () => void;
};

// ------------------------------

export default function OTPVerification(props: Props) {
  const { setDialogStep } = props;

  // const phoneNumber = sessionStorage.getItem('phone-number');
  const phoneNumber = '';
  const authLocalStorage = useLocalStorage({
    value: 'AUTH_VALUE',
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  const mutation = useApiMutation<{
    access: string;
    refresh: string;
  }>({
    url: '/token/',
    method: 'post',
    options: {
      onError: () => {
        form.setError('otp', {
          message: 'مشکلی پیش امد. لطفا مجددا تلاش کنید.',
        });
      },
      onSuccess: (data) => {
        Cookies.set('AUTH', form.getValues('otp'), {
          path: '/',
          expires: 3,
          secure: true,
          sameSite: 'Strict',
        });

        Cookies.set(
          'auth',
          JSON.stringify({
            accessUID: data.access,
            phoneNumber: phoneNumber,
            refreshUID: data.refresh,
            otp: form.getValues('otp'),
          }),
        );

        window.location.reload();
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({ otp: values.otp, phone: `0${phoneNumber}` });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full flex flex-col md:items-center"
      >
        <span className="text-zinc-800 text-cs09 font-extrabold mb-2.5">
          تایید شماره همراه
        </span>

        <p className="text-zinc-600 text-cs08 font-semibold flex gap-1 md:items-center">
          <span>کد 4 رقمی به شماره</span>
          <span dir="ltr" className="tracking-wider">
            (+98 {phoneNumber})
          </span>
          <span>ارسال شد .</span>
        </p>

        {/* OPT-Input | Resend */}
        <div
          dir="ltr"
          className="w-full h-10 mt-6 flex items-center justify-end gap-4 md:justify-center"
        >
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputOTP
                    onComplete={() => form.handleSubmit(onSubmit)()}
                    {...field}
                    maxLength={4}
                    pattern="^[0-9۰-۹]+$"
                  >
                    <InputOTPGroup className="text-zinc-600 text-[0.9rem] gap-2">
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
          className="w-fit text-zinc-500 text-cs08 font-bold my-6 flex-center gap-2 rounded-md transition-colors md:mt-5 hover:text-zinc-600"
          onClick={setDialogStep}
        >
          <span>ویرایش شماره همراه</span>
        </button>

        <div className="hidden md:flex">
          <RulesAndRegulation />
        </div>

        {/* Submit-Button */}
        <button
          disabled={mutation.isPending}
          className={`relative w-full h-12 bg-cs-dark-blue mt-auto overflow-hidden rounded-lg transition-colors duration-300 ease-in-out md:mt-0  hover:bg-cs-dark-blue/95 ${mutation.isPending ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''}`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 text-cs85 font-semibold flex-center pointer-events-none transition-all duration-300 ease-in-out ${mutation.isPending ? 'opacity-0 invisible -right-8' : 'opacity-100 visible right-0'}`}
          >
            تایید و ادامه فرآیند
          </span>

          <div
            className={`absolute inset-0 flex-center pointer-events-none transition-all duration-300 ease-in-out ${mutation.isPending ? 'opacity-100 visible left-0' : 'opacity-0 invisible -left-8'}`}
          >
            <div className="loader-dots" />
          </div>
        </button>
      </form>
    </Form>
  );
}
