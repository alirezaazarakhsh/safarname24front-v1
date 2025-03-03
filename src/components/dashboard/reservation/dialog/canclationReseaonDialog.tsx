// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from '@/components/dashboard/ui/customSonner/toast';
import { title } from 'node:process';

// Defining data of radio group
const radioGroupData: {
  label: string;
  value: string;
}[] = [
  {
    label: 'منصرف شدم',
    value: 'gave-up',
  },
  {
    label: 'از جای دیگه سفارش میدهم',
    value: 'order-from-another-service',
  },
  {
    label: 'پشتیبانی خوبی ندیدم',
    value: 'no-good-support',
  },
  {
    label: 'مبلغ بسیار زیاد روی هتل ها',
    value: 'high-price-of-hotels',
  },
];

// Defining form schema
const formSchema = z.object({
  message: z
    .string({ required_error: 'مشترک گرامی فیلد توضیحات تکمیل نشده است.' })
    .min(10, { message: 'پیام باید حداقل ۱۰ کاراکتر داشته باشد.' })
    .max(200, { message: 'پیام نباید بیش از ۲۰۰ کاراکتر باشد.' }),

  reason: z.enum(
    [
      'gave-up',
      'order-from-another-service',
      'no-good-support',
      'high-price-of-hotels',
    ],
    {
      message: 'لطفاً یک دلیل معتبر انتخاب کنید.',
    },
  ),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting CanclationReasonDialog as deafult
export default function CanclationReasonDialog({
  closeFn,
  isOpened,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const formHook = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Handling submit event
  const handleOnSubmitEvent: SubmitHandler<formType> = async ({
    message,
    reason,
  }) => {
    console.log({ message, reason });
  };

  // Returning JSX
  return (
    <Dialog open={isOpened}>
      <DialogContent className="lg:w-[500px] w-[calc(100vw-25px)] p-0 gap-0">
        <div className="px-6 py-3 border-b border-b-black/10 flex items-center justify-between gap-3">
          <DialogTitle className="text-right lg:text-[14px] text-[12px] font-bold text-black block truncate w-full">
            دلیل کنسلی شما چیست ؟
          </DialogTitle>
          <DialogClose asChild>
            <button onClick={closeFn} className="shrink-0" type="button">
              <IconsaxIcons name="CloseCircle" className="w-4 h-4 text-black" />
            </button>
          </DialogClose>
        </div>
        <form
          action="#"
          onSubmit={formHook.handleSubmit(handleOnSubmitEvent, (error) => {
            if (error.message)
              toast({
                description: error.message?.message || '',
                title: 'خطایی رخ داد!',
              });
            if (error.reason)
              toast({
                description: error.reason?.message || '',
                title: 'خطایی رخ داد!',
              });
          })}
          className="p-6 grid lg:grid-cols-5 grid-cols-1 gap-[17px]"
        >
          <RadioGroup
            dir="rtl"
            className="flex flex-col gap-3 col-span-2"
            defaultValue="gave-up"
          >
            {radioGroupData.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-start gap-2 overflow-hidden"
              >
                <div className="relative shrink-0 w-5 h-5">
                  <RadioGroupItem
                    id={`canclation-reason-${index + 1}`}
                    value={item.value}
                    className="data-[state='unchecked']:bg-gray-100 rounded-md w-4 h-4 aspect-square data-[state='checked']:bg-green-500 transition-all duration-500 peer cursor-pointer"
                    {...formHook.register('reason')}
                  />
                  <IconsaxIcons
                    color="white"
                    name="TickSquare"
                    variant="Bold"
                    className="w-2 h-2 aspect-square absolute top-[50%] left-[50%] block -translate-y-[75%] -translate-x-[25%] peer-data-[state=unchecked]:opacity-0 peer-data-[state=checked]:opacity-100 pointer-events-none"
                  />
                </div>
                <Label
                  htmlFor={`canclation-reason-${index + 1}`}
                  className="truncate block text-right w-full text-cs07 font-medium text-black"
                >
                  {item.label}
                </Label>
              </div>
            ))}
            <Button
              variant="default"
              className="bg-blue-700 rounded-md transition-all duration-500 hover:bg-blue-800 w-full mt-3"
            >
              <span className="text-white text-cs65 font-normal">
                ارسال کنسلی
              </span>
            </Button>
          </RadioGroup>
          <textarea
            className="col-span-3 resize-none h-full bg-gray-100 rounded-md p-3 outline-0 placeholder:text-cs65 placeholder:text-gray-400 text-cs65 text-gray-400 border-none"
            placeholder="توضیحات خود را وارد نمایید..."
            {...formHook.register('message')}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
