'use client';

import { z } from 'zod';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import ResendOTPToken from './ResendOTPToken';
import RulesAndRegulation from './RulesAndRegulation';

import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from '@/components/ui/input-otp';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import useLocalStorage from '@/hooks/useLocalStorage';

const formSchema = z.object({
  otp: z.string().min(4),
});

type Props = {
  setDialogStep: () => void;
};

// --------------------------------------------

export default function OTPVerification(props: Props) {
  const { setDialogStep } = props;

  const [isLoading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitted, setSubmitted] = useState(false);

  const authLocalStorage = useLocalStorage({
    value: 'AUTH_VALUE',
  });

  // Get Encrypted PhoneNumber
  useEffect(() => {
    const encryptedPhoneNumber = Cookies.get('UPN');
    if (!encryptedPhoneNumber) return;
    setPhoneNumber(encryptedPhoneNumber);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  const otp = form.watch('otp');

  // Defining a mutataion function
  const submitPost = useApiMutation<{
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

        authLocalStorage.setData(
          JSON.stringify({
            otp: form.getValues('otp'),
            phoneNumber: Cookies.get('UPN'),
            accessUID: data.access,
            refreshUID: data.refresh,
          }),
        );

        window.location.reload();
      },
    },
  });

  // Using useEffect to setLoading to true or false
  useEffect(() => setLoading(submitPost.isPending), [submitPost.isPending]);

  // Submit Form ( OTP Full-Length[4] )
  useEffect(() => {
    if (otp.length === 4 && !isSubmitted) {
      setSubmitted(true);
      form.handleSubmit(onSubmit)();
    }
  }, [form, otp, isSubmitted, onSubmit]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const phone = Cookies.get('UPN');
    const otp = values.otp;

    submitPost.mutate({ otp, phone: `0${phone}` });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='h-full flex flex-col md:items-center'
      >
        <span className='text-zinc-800 text-cs09 font-extrabold mb-2.5'>
          تایید شماره همراه
        </span>

        <p className='text-zinc-600 text-cs08 font-semibold flex gap-1 md:items-center'>
          <span>کد 4 رقمی به شماره</span>
          <span dir='ltr' className='tracking-wider'>
            (+98 {phoneNumber})
          </span>
          <span>ارسال شد .</span>
        </p>

        {/* OPT-Input | Resend */}
        <div
          dir='ltr'
          className='w-full h-10 mt-6 flex items-center justify-end gap-4 md:justify-center'
        >
          <FormField
            name='otp'
            control={form.control}
            render={({ field }) => (
              <FormItem className='space-y-0'>
                <FormControl>
                  <InputOTP {...field} maxLength={4} pattern='^[0-9۰-۹]+$'>
                    <InputOTPGroup className='text-zinc-600 text-[0.9rem] gap-2'>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            )}
          />

          <ResendOTPToken
            handleMutate={() => {
              const phone = Cookies.get('UPN');
              const otp = form.getValues('otp');

              submitPost.mutate({ otp, phone: `0${phone}` });
            }}
          />
        </div>

        {/* Edit-Phone-Number */}
        <button
          type='button'
          className='w-fit text-zinc-500 text-cs08 font-bold my-6 flex-center gap-2 rounded-md transition-colors md:mt-5 hover:text-zinc-600'
          onClick={setDialogStep}
        >
          <span>ویرایش شماره همراه</span>
        </button>
        <div className='hidden md:flex'>
          <RulesAndRegulation />
        </div>

        {form.formState.errors.otp?.message && (
          <p className='text-center mb-3 text-cs-red text-cs07 font-semibold'>
            {form.formState.errors.otp.message}
          </p>
        )}

        {/* Submit-Button */}
        <button
          disabled={isLoading}
          className={`relative w-full h-12 bg-cs-dark-blue mt-auto overflow-hidden rounded-lg transition-colors duration-300 ease-in-out md:mt-0  hover:bg-cs-dark-blue/95 ${isLoading ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''}`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 text-cs85 font-semibold flex-center pointer-events-none transition-all duration-300 ease-in-out ${isLoading ? 'opacity-0 invisible -right-8' : 'opacity-100 visible right-0'}`}
          >
            تایید و ادامه فرآیند
          </span>

          <div
            className={`absolute inset-0 flex-center pointer-events-none transition-all duration-300 ease-in-out ${isLoading ? 'opacity-100 visible left-0' : 'opacity-0 invisible -left-8'}`}
          >
            <div className='loader-dots' />
          </div>
        </button>
      </form>
    </Form>
  );
}
