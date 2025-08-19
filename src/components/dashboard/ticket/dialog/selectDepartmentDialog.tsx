// Forcing next.js to render this component as client side component
'use client';

import { ICX } from '@/components/icons/ICX';
// Importing part
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog';
import { TicketsSelectDepartmentPropsType } from '@/types/dashboard/component';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import RadioItem from '../radioItem';
import Loading from '../../ui/loading';

// Defining data of radio items to render
type departmentTypes =
  | 'reservation'
  | 'financial'
  | 'managment'
  | 'counseling'
  | 'technical';

const radioGroupData: {
  label: string;
  value: departmentTypes;
}[] = [
  {
    label: 'دپارتمان رزرواسیون',
    value: 'reservation',
  },
  {
    label: 'دپارتمان مالی',
    value: 'financial',
  },
  {
    label: 'دپارتمان مدیریت',
    value: 'managment',
  },
  {
    label: 'دپارتمان مشاوره',
    value: 'counseling',
  },
  {
    label: 'دپارتمان بخش فنی',
    value: 'technical',
  },
];

// Defining form schema
const formSchema = z.object({
  department: z.enum(
    ['reservation', 'financial', 'managment', 'counseling', 'technical'],
    {
      message: 'لطفا دپارتمان مد نظر را انتخواب کنید .',
    },
  ),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting SelectDepartmentDialog component as default
export default function SelectDepartmentDialog({
  closeFn,
  isOpened,
}: TicketsSelectDepartmentPropsType): ReactNode {
  // Defining hooks
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Defining submit function
  const submitHandler: SubmitHandler<formType> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  // Defining variables
  const department = form.watch('department');

  // Returning JSX
  return (
    <Dialog
      open={isOpened}
      onOpenChange={(open) => closeFn && !open && closeFn()}
    >
      <DialogPortal>
        <DialogContent className="p-0 w-full max-w-[400px] gap-0">
          <div className="px-6 py-3 border-b border-b-black/10 flex items-center justify-between gap-3">
            <DialogTitle className="text-right text-[14px] font-bold text-[#2b2b2b] block truncate w-full">
              دلیل کنسلی شما چیست ؟
            </DialogTitle>
            <DialogClose asChild>
              <button onClick={closeFn} className="shrink-0" type="button">
                <ICX className="w-3 h-3 text-black" fill="currentColor" />
              </button>
            </DialogClose>
          </div>
          <form
            onClick={form.handleSubmit(submitHandler)}
            action="#"
            className="p-6"
          >
            <div className="flex flex-col gap-4 mb-7">
              {radioGroupData.map((item, index) => (
                <RadioItem
                  key={index}
                  label={item.label}
                  isActive={department === item.value}
                  onClick={() => form.setValue('department', item.value)}
                />
              ))}
            </div>
            {form.formState.errors.root?.message && (
              <p className="text-cs08 font-medium text-red-500 text-right mb-2">
                {form.formState.errors.root?.message}
              </p>
            )}
            <button
              disabled={form.formState.isSubmitting}
              type="submit"
              className="w-full p-4 h-[50px] rounded-lg bg-green-500 flex items-center justify-center transition-all duration-500 hover:bg-green-600 text-white disabled:opacity-50"
            >
              {!form.formState.isSubmitting ? (
                <span className="text-center block font-bold text-current text-cs-07">
                  ثبت تیکت
                </span>
              ) : (
                <Loading className="size-2" />
              )}
            </button>
          </form>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
