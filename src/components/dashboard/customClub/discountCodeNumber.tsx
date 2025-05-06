// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from '../ui/customSonner/toast';
import Loading from '../ui/loading';
import useLocalStorage from '@/hooks/useLocalStorage';

// Defining form schema
const formSchema = z.object({
  phoneNumber: z.string().regex(/^09\d{9}$/, {
    message: 'شماره موبایل باید با 09 شروع شده و ۱۱ رقم باشد',
  }),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting DiscountCodeNumber component as default
export default function DiscountCodeNumber(): ReactNode {
  // Defining hooks
  const numberIsSavedForDiscount = useLocalStorage({
    value: 'discountNumber',
  });

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining states of component
  const [opened, setOpened] = useState<boolean>(false);

  // Using useEffect to open the component after 5 seconds of being rendred
  useEffect(() => {
    const timout = setTimeout(() => setOpened(true), 5000);

    return () => clearTimeout(timout);
  }, []);

  // Defining a function to handle submit of form
  const handleFormSubmit: SubmitHandler<formType> = async ({ phoneNumber }) => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setOpened(false);
    numberIsSavedForDiscount.setData(phoneNumber);
    toast({
      theme: 'green',
      title: 'شماره با موفقیت ثبت شد!',
      description: 'شماره شما برای اطلاع رسانی کدهای تخفیف با موفقیت ثبت شد.',
    });
  };

  // Returning JSX
  return createPortal(
    <motion.form
      className="fixed bottom-[20px] right-[20px] shadow-2xl shadow-black/10 bg-white w-[250px] rounded-lg overflow-hidden z-40"
      action="#"
      onSubmit={form.handleSubmit(handleFormSubmit)}
      initial={{ y: '200%', opacity: 0 }}
      exit={{ y: '200%', opacity: 0 }}
      transition={{ bounce: 0, duration: 0.5, ease: 'easeInOut' }}
      animate={{
        y: opened ? '0' : '200%',
        opacity: opened ? 1 : 0,
      }}
    >
      <div className="px-4 py-3 border border-b-0 border-black/10 rounded-t-lg">
        <span className="text-cs07 font-semibold text-black mb-1 block text-right w-full truncate">
          اطلاع رسانی کد تخفیف!
        </span>
        <p className="text-cs65 font-normal text-black mb-3">
          مشتری گرامی برای اطلاع رسانی سریع از کد تخفیف میتوانید شماره خود را
          ثبت کنید.
        </p>
        <input
          placeholder="لطفا شماره تلفن خود را وارد کنید"
          type="tel"
          className="bg-gray-100 w-full rounded-md px-3 text-center text-cs65 placeholder:text-cs65 font-semibold placeholder:font-medium text-black placeholder:text-gray-300 h-[40px]"
          {...form.register('phoneNumber')}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="w-[10px] h-[20px] bg-black/5 shrink-0 rounded-l-full" />
        <div className="h-0 w-full border-b border-dashed border-black/5 border" />
        <div className="w-[10px] h-[20px] bg-black/5 shrink-0 rounded-r-full" />
      </div>
      <div className="grid grid-cols-2 gap-3 px-4 py-3 border border-t-0 border-black/10 rounded-b-lg">
        <Button
          disabled={form.formState.isSubmitting}
          className="bg-green-700 text-white hover:bg-green-800 flex items-center justify-center rounded-lg px-3 h-[40px] transition-all duration-500 disabled:bg-gray-100 disabled:text-gray-300"
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <Loading />
          ) : (
            <span className="text-cs07 font-medium text-current truncate block text-center w-full">
              ثبت شماره همراه
            </span>
          )}
        </Button>
        <Button
          className="bg-white text-black hover:bg-white flex items-center justify-center rounded-lg px-3 h-[40px]"
          type="button"
          onClick={() => setOpened(false)}
        >
          <span className="text-cs07 font-medium text-current truncate block text-center w-full">
            بعدا ثبت میکنم
          </span>
        </Button>
      </div>
    </motion.form>,
    document.body,
  );
}
