import { z } from 'zod';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
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
  const secretKey = process.env.NEXT_PUBLIC_PHONE_NUMBER_SECRET_KEY;

  // Get Encrypted PhoneNumber
  useEffect(() => {
    const encryptedPhoneNumber = Cookies.get('UPN');
    if (!secretKey || !encryptedPhoneNumber) return;

    try {
      const bytes = CryptoJS.AES.decrypt(encryptedPhoneNumber, secretKey);
      const decryptedPhoneNumber = bytes.toString(CryptoJS.enc.Utf8);
      setPhoneNumber(decryptedPhoneNumber);
    } catch (error) {
      console.error(error);
    }
  }, [secretKey]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  // Submit Form ( OTP Full-Length[4] )
  useEffect(() => {
    if (form.getValues().otp.length === 4) form.handleSubmit(onSubmit)();
  }, [form.getValues().otp]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 2000);

    Cookies.set('AUTH', values.otp, {
      path: '/',
      expires: 3,
      secure: true,
      sameSite: 'Strict',
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-[13.7rem] flex flex-col items-center"
      >
        <span className="text-zinc-800 text-cs85 font-extrabold mb-2">
          تایید شماره همراه
        </span>

        <p className="text-zinc-600 flex-center gap-1">
          <span>کد 4 رقمی به شماره</span>
          <span dir="ltr" className="tracking-wider">
            (+98 {phoneNumber})
          </span>
          <span>ارسال شد .</span>
        </p>

        <div dir="ltr" className="w-64 h-10 mt-4 flex-between">
          <FormField
            name="otp"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputOTP {...field} maxLength={4} pattern="^[0-9۰-۹]+$">
                    <InputOTPGroup className="text-zinc-600 gap-2">
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

          <ResendOTPToken />
        </div>

        <button
          type="button"
          className="text-zinc-500 text-cs07 font-bold mt-3 transition-colors hover:text-zinc-600"
          onClick={setDialogStep}
        >
          ویرایش شماره همراه
        </button>

        <RulesAndRegulation />

        <button
          disabled={isLoading}
          className={`relative w-64 h-10 bg-cs-dark-blue overflow-hidden rounded-lg transition-colors duration-300 ease-in-out hover:bg-cs-dark-blue/95 ${isLoading ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''}`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 flex-center transition-all duration-300 ease-in-out ${isLoading ? 'opacity-0 invisible -right-8' : 'opacity-100 visible right-0'}`}
          >
            تایید و ادامه فرآیند
          </span>

          <div
            className={`absolute inset-0 flex-center transition-all duration-300 ease-in-out ${isLoading ? 'opacity-100 visible left-0' : 'opacity-0 invisible -left-8'}`}
          >
            <div className="loader-dots" />
          </div>
        </button>
      </form>
    </Form>
  );
}
