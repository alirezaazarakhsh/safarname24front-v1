// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { CanclationReasonDialogComponentProps } from '@/types/dashboard/component';
import { ReactNode, useState } from 'react';
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
import { ICX } from '@/components/icons/ICX';
import Loading from '../../ui/loading';
import { ICArrowFlashRight } from '@/components/icons/ICArrowFlashRight';
import { useMediaQuery } from '@/hooks';
import CanclationErrorDrawer from '../canclationErrorDrawer';

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
    .string({ message: 'مشترک گرامی فیلد توضیحات تکمیل نشده است.' })
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
  openAcceptDialog,
  openFailedDialog,
}: CanclationReasonDialogComponentProps): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const formHook = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Handling submit event
  const handleOnSubmitEvent: SubmitHandler<formType> = async ({
    message,
    reason,
  }) => {
    const randomNum = Math.floor(Math.random() * 2); // For Testing purposes for now which returns random number of 1 (accepted) or 0 (failed)
    await new Promise((resolve) => setTimeout(() => resolve(true), 2000));

    console.log({ message, reason });
    closeFn && closeFn();
    openFailedDialog();
  };

  // Returning JSX
  return (
    <Dialog open={isOpened}>
      {isMobile && (
        <CanclationErrorDrawer
          isOpened={drawerOpened}
          closeFn={() => setDrawerOpened(false)}
          title='خطایی رخ داد!'
          description='مشترک گرامی فیلد توضیحات تکمیل نشده است.'
        />
      )}
      <DialogContent className='lg:w-[500px] w-[100vw] max-w-screen-template lg:h-auto h-dvh p-0 gap-0 lg:rounded-2xl rounded-none lg:grid block'>
        <div className='lg:hidden block py-[16px] px-[24px] border-b-[1.5px] border-b-black/10 bg-gray-100'>
          <DialogClose asChild>
            <button
              onClick={closeFn}
              className='flex items-center justify-start gap-[10px] w-full overflow-hidden'
            >
              <ICArrowFlashRight className='w-[24px] h-[24px] aspect-square shrink-0' />
              <span className='block truncate text-black text-[14px] font-bold w-full text-right'>
                برگشت به صفحه
              </span>
            </button>
          </DialogClose>
        </div>
        <div className='px-6 py-3 border-b border-b-black/10 lg:flex hidden items-center justify-between gap-3'>
          <DialogTitle className='text-right text-[14px] font-bold text-[#2b2b2b] block truncate w-full'>
            دلیل کنسلی شما چیست ؟
          </DialogTitle>
          <DialogClose asChild>
            <button onClick={closeFn} className='shrink-0' type='button'>
              <ICX className='w-3 h-3 text-black' fill='currentColor' />
            </button>
          </DialogClose>
        </div>
        <form
          action='#'
          onSubmit={formHook.handleSubmit(handleOnSubmitEvent, (error) => {
            if (!isMobile) {
              if (error.message?.message)
                toast({
                  description: error.message.message,
                  title: 'خطایی رخ داد!',
                });
            } else {
              if (error.message?.message) setDrawerOpened(true);
            }
          })}
          className='lg:p-6 p-[24px] lg:grid flex flex-col justify-between items-start grid-cols-5 lg:gap-[17px] lg:h-auto h-[calc(100%-50px)]'
        >
          <div className='lg:hidden block mb-[24px]'>
            <DialogTitle className='text-right text-[12px] font-bold text-black truncate w-full'>
              دلیل کنسلی شما چیست ؟
            </DialogTitle>
          </div>
          <RadioGroup
            dir='rtl'
            className='flex flex-col lg:gap-3 gap-[25px] lg:col-span-2 lg:shrink shrink-0'
            defaultValue='gave-up'
          >
            {radioGroupData.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-start lg:gap-2 gap-[10px] overflow-hidden group'
              >
                <div className='relative shrink-0 w-[20px] h-[20px] cursor-pointer'>
                  <RadioGroupItem
                    id={`canclation-reason-${index + 1}`}
                    value={item.value}
                    className="data-[state='unchecked']:bg-gray-100 lg:rounded-md rounded-[4px] w-[20px] h-[20px] aspect-square group-hover:bg-[#4b5bce] data-[state='checked']:bg-[#4b5bce] transition-all duration-500 peer cursor-pointer"
                    {...formHook.register('reason')}
                  />
                  <IconsaxIcons
                    name='TickSquare'
                    variant='Bold'
                    color='white'
                    className='w-[12px] h-[12px] aspect-square absolute top-[50%] left-[50%] block -translate-y-[50%] -translate-x-[50%] peer-data-[state=unchecked]:opacity-0 peer-data-[state=checked]:opacity-100 pointer-events-none transition-all duration-500'
                  />
                </div>
                <Label
                  htmlFor={`canclation-reason-${index + 1}`}
                  className='truncate block text-right w-full lg:text-cs07 cursor-pointer text-[12px] lg:font-bold font-semibold text-[#2b2b2b]'
                >
                  {item.label}
                </Label>
              </div>
            ))}
            <Button
              variant='default'
              disabled={formHook.formState.isSubmitting}
              className='bg-[#4b5bce] rounded-md transition-all duration-500 hover:bg-blue-800 w-full mt-3 lg:flex items-center justify-center hidden'
            >
              {!formHook.formState.isSubmitting ? (
                <span className='text-white text-cs65 font-normal'>
                  ارسال کنسلی
                </span>
              ) : (
                <Loading />
              )}
            </Button>
          </RadioGroup>
          <div className='h-full lg:col-span-3 lg:mt-0 mt-[25px] w-full lg:block flex flex-col items-start justify-between'>
            <textarea
              className='w-full resize-none h-full bg-gray-100 lg:rounded-md rounded-[10px] lg:p-3 p-6 outline-0 placeholder:font-semibold font-semibold lg:placeholder:text-cs65 placeholder:text-[12px] placeholder:text-gray-400 lg:text-cs65 text-[12px] text-black border-none'
              placeholder='توضیحات خود را وارد نمایید...'
              {...formHook.register('message')}
            />
            <Button
              variant='default'
              disabled={formHook.formState.isSubmitting}
              className='bg-blue-700 rounded-[10px] w-full mt-3 lg:hidden flex items-center justify-center h-[50px] shrink-0 hover:bg-blue-700 transition-all duration-500'
            >
              {!formHook.formState.isSubmitting ? (
                <span className='text-white text-[11px] font-semibold'>
                  ارسال کنسلی
                </span>
              ) : (
                <Loading />
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
