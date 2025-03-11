import { z } from 'zod';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import RulesAndRegulation from './RulesAndRegulation';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';

const formSchema = z.object({
  phoneNumber: z.string().regex(/^\d+$/).min(10).max(10),
});

type Props = {
  setDialogStep: () => void;
};

// --------------------------------------------

export default function PhoneNumber(props: Props) {
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
    defaultValues: { phoneNumber: phoneNumber },
  });

  // Form-Reset (on PhoneNumber Change)
  useEffect(() => {
    form.reset({ phoneNumber });
  }, [phoneNumber, form]);

  // Form-Submission
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    setLoading(true);
    setTimeout(() => setDialogStep(), 2000);

    if (!secretKey) return;
    const encryptedPhoneNumber = CryptoJS.AES.encrypt(
      form.getValues().phoneNumber,
      secretKey,
    ).toString();

    Cookies.set('UPN', encryptedPhoneNumber, {
      path: '/',
      secure: true,
      expires: 1 / 24,
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
          ورود به حساب کاربری
        </span>

        <p className="text-zinc-600">
          برای ورود شماره همراه خود را وارد نمایید :
        </p>

        <div
          dir="ltr"
          className={`w-64 h-10 text-zinc-600 mt-4 grid grid-cols-[1fr_3fr] overflow-hidden border-2 rounded-lg ${form.formState.errors.phoneNumber ? 'border-cs-red/50' : 'border-zinc-200'}`}
        >
          <div className="my-2 flex-center border-r-2">+ 98</div>

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
                    className="h-full tracking-[0.2rem] border-none rounded-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <RulesAndRegulation />

        <button
          disabled={isLoading}
          className={`relative w-64 h-10 bg-cs-dark-blue overflow-hidden rounded-lg transition-colors duration-300 ease-in-out hover:bg-cs-dark-blue/95 ${isLoading ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''}`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 flex-center transition-all duration-300 ease-in-out ${isLoading ? 'opacity-0 invisible -right-8' : 'opacity-100 visible right-0'}`}
          >
            تایید و دریافت کد
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
