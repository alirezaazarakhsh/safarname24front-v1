// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { Label } from '@/components/ui/label';
import { DialogInputPassengersComponentPropsType } from '@/types/dashboard/component';
import { ReactNode, useEffect, useState } from 'react';
import toast from '../ui/customSonner/toast';
import { useMediaQuery } from '@/hooks';
import CanclationErrorDrawer from '../reservation/canclationErrorDrawer';

// Creating and exporting DialogInput component as default
export default function DialogInput({
  label,
  className,
  required,
  error,
  ...props
}: DialogInputPassengersComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [errorDialogOpened, setErrorDialogOpened] = useState<boolean>(false);

  // Using useEffect to render a toast whenever an error accures
  useEffect(() => {
    if (error) {
      if (!isMobile) {
        toast({
          title: 'خطایی رخ داد!',
          description: error,
          theme: 'theme',
        });
      } else {
        setErrorDialogOpened(true);
      }
    }
  }, [error, isMobile]);

  // Returning JSX
  return (
    <div className='w-full block'>
      {error && isMobile && (
        <CanclationErrorDrawer
          title='خطایی رخ داد!'
          description={error}
          theme='theme'
          closeFn={() => setErrorDialogOpened(false)}
          isOpened={errorDialogOpened}
        />
      )}
      <Label className='block text-right font-medium lg:text-cs07 text-[12px] truncate text-black lg:mb-4 mb-[7px]'>
        {required && <span className='text-cs-red'>* </span>}
        {label}
      </Label>
      <input
        className="bg-gray-100 h-[45px] px-3 lg:rounded-md rounded-[8px] lg:placeholder:text-cs07 placeholder:text-[12px] placeholder:text-gray-400 lg:text-cs07 text-[12px] lg:placeholder:font-medium placeholder:font-semibold lg:font-medium font-semibold text-black w-full block text-right transition-all duration-500 border border-gray-100 focus:border-black data-[errored='true']:border-cs-red data-[errored='true']:focus:border-cs-red"
        data-errored={error !== undefined}
        {...props}
      />
    </div>
  );
}
