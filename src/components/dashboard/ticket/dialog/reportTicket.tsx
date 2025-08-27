// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogPortal,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from '../../ui/customSonner/toast';
import RadioItem from '../radioItem';
import Loading from '../../ui/loading';

// Defining data of radio items to render
export type reportTypes = 'best' | 'moderate' | 'ok' | 'not-ok';

export const reportGroupData: {
  label: string;
  value: reportTypes;
}[] = [
  {
    label: '😀 خوب ترین',
    value: 'best',
  },
  {
    label: '🙂 متوسط بود',
    value: 'moderate',
  },
  {
    label: '😑 قابل قبول بود',
    value: 'ok',
  },
  {
    label: '🙄 متاسفانه رضایت بخش نبود',
    value: 'not-ok',
  },
];

// Defining form schema
const formSchema = z.object({
  report: z.enum(['best', 'moderate', 'ok', 'not-ok'], {
    message: 'لطفا رضایت خو را انتخواب کنید .',
  }),
  description: z
    .string({
      message: 'لطفا این فیلد را پر کنید !',
    })
    .min(1, { message: 'حداقل تعداد کارمتر توضیحات 1 کارکتر است' })
    .max(256, { message: 'حداکثر تعداد کارمتر توضیحات 256 کارکتر است' }),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting ReportTicket component as default
export default function ReportTicket(): ReactNode {
  // Defining hooks
  const [opened, setOpened] = useState<boolean>(false);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining submit function
  const submitHandler: SubmitHandler<formType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setOpened(false);

    form.reset({ report: undefined, description: '' });
    toast({
      theme: 'green',
      title: 'ثبت بازخورد با موفقیت انجام شد!',
      description: 'مشتری گرامی از ثبت برخورد محبت امیز شما ممنونیم.',
    });

    // toast({
    //       theme: 'theme',
    //       title: 'خطا در ثبت بازخورد!',
    //       description: 'مشتری گرامی در ثبت باز خورد شما مشکل به وجود امد.',
    //     });
  };

  // Defining variables
  const report = form.watch('report');

  // Returning JSX
  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogTrigger asChild>
        <button className="px-4 rounded-md flex items-center justify-center py-2 bg-cs-blue/20">
          <span className="text-cs65 font-medium text-current text-center truncate block">
            ثبت بازخورد
          </span>
        </button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="p-0 w-full max-w-[400px] gap-0">
          <div className="px-6 py-5 border-b border-b-black/10">
            <DialogTitle className="text-right text-[14px] font-bold text-[#2b2b2b] block truncate w-full">
              ثبت بازخورد برای تیکت
            </DialogTitle>
          </div>
          <form
            onSubmit={form.handleSubmit(submitHandler, (errors) => {
              Object.values(errors).forEach((item) => {
                toast({
                  theme: 'theme',
                  description: item?.message || '',
                  title: 'خطایی رخ داد',
                });
              });
            })}
            action="#"
            className="p-6"
          >
            <div className="flex flex-col gap-4 mb-7">
              {reportGroupData.map((item, index) => (
                <RadioItem
                  key={index}
                  label={item.label}
                  isActive={report === item.value}
                  onClick={() => form.setValue('report', item.value)}
                />
              ))}
              <textarea
                className="resize-none w-full rounded-lg bg-gray-100 outline-0 p-4 h-[100px] placeholder:text-black/75 placeholder:font-normal placeholder:text-cs07 text-black font-normal text-cs07"
                placeholder="توضیحات خود را وارد کنید ..."
                {...form.register('description')}
              />
            </div>
            <div className="grid grid-cols-3 gap-5">
              <button
                disabled={form.formState.isSubmitting}
                type="submit"
                className="p-4 h-[40px] col-span-2 rounded-lg bg-green-500 flex items-center justify-center transition-all duration-500 hover:bg-green-600 text-white disabled:opacity-50"
              >
                {!form.formState.isSubmitting ? (
                  <span className="text-center block font-bold text-current text-cs75">
                    ثبت تیکت
                  </span>
                ) : (
                  <Loading className="size-2" />
                )}
              </button>
              <DialogClose asChild>
                <button
                  type="button"
                  className="p-4 h-[40px] rounded-lg bg-white border border-black/20 flex items-center justify-center text-black"
                >
                  <span className="text-center block font-bold text-current text-cs75">
                    بستن
                  </span>
                </button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
