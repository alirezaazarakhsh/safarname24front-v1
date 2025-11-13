'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from '@/components/ui/input-otp';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import ResendOTPToken from './ResendOTPToken';
import RulesAndRegulation from './RulesAndRegulation';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  otp: z.string().min(4).max(4),
});

type Props = {
  phoneNumber: string;
  setDialogStep: () => void;
};

export default function OTPVerification({ phoneNumber, setDialogStep }: Props) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: '' },
  });

  const mutation = useApiMutation({
    url: '/api/auth/verify-otp',
    method: 'post',
    options: {
      onSuccess: () => {
        // No cookies, no reload → soft redirect
        router.push('/dashboard');
      },
      onError: (err: any) => {
        form.setError('otp', {
          message: err.response?.data?.error || 'کد اشتباه است',
        });
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

        <div
          dir="ltr"
          className="w-full h-10 mt-6 flex items-center justify-end gap-4 md:justify-center"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormControl>
                  <InputOTP
                    {...field}
                    maxLength={4}
                    pattern="^[0-9]+$"
                    onComplete={() => form.handleSubmit(onSubmit)()}
                  >
                    <InputOTPGroup className="text-zinc-600 text-[0.9rem] gap-2">
                      {[0, 1, 2, 3].map((i) => (
                        <InputOTPSlot
                          key={i}
                          index={i}
                          className={`${
                            form.formState.errors.otp ? 'border-red-500' : ''
                          }`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage className="text-cs08 text-red-500 mt-1" />
              </FormItem>
            )}
          />
          <ResendOTPToken />
        </div>

        <button
          type="button"
          onClick={setDialogStep}
          className="w-fit text-zinc-500 text-cs08 font-bold my-6 flex-center gap-2 rounded-md transition-colors md:mt-5 hover:text-zinc-600"
        >
          <span>ویرایش شماره همراه</span>
        </button>

        <div className="hidden md:flex md:mt-auto">
          <RulesAndRegulation />
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`relative w-full h-12 bg-cs-dark-blue mt-auto overflow-hidden rounded-lg transition-colors duration-300 ease-in-out md:mt-0 hover:bg-cs-dark-blue/95 ${
            mutation.isPending ? 'cursor-not-allowed hover:bg-cs-dark-blue' : ''
          }`}
        >
          <span
            className={`absolute inset-0 text-zinc-100 text-cs85 font-semibold flex-center pointer-events-none transition-all duration-300 ease-in-out ${
              mutation.isPending
                ? 'opacity-0 invisible -right-8'
                : 'opacity-100 visible right-0'
            }`}
          >
            تایید و ادامه فرآیند
          </span>
          <span
            className={`absolute inset-0 flex-center pointer-events-none transition-all duration-300 ease-in-out ${
              mutation.isPending
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
