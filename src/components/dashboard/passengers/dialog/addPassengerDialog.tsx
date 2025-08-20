// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { ICX } from '@/components/icons/ICX';
import DialogInput from '../dialogInput';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '../../ui/loading';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import PassengerAddedSucessDialog from './passengarAddedSuccessDialog';
import PassengerAddedErrorDialog from './passengarAddedErrorDialog';
import { verifyIranianNationalId } from '@persian-tools/persian-tools';
import { isValidIranianPassport } from '@/utils/string';

// Defining form schema
const formSchema = z.object({
  firstName: z
    .string()
    .min(1, 'نام باید حداقل ۱ کاراکتر باشد')
    .max(32, 'نام نمی‌تواند بیشتر از 64 کاراکتر باشد'),
  lastName: z
    .string()
    .min(1, 'نام خانوادگی باید حداقل ۱ کاراکتر باشد')
    .max(32, 'نام خانوادگی نمی‌تواند بیشتر از 64 کاراکتر باشد'),
  nationalOrPassportCode: z
    .string()
    .transform((val) => val.trim().toUpperCase())
    .refine(
      (val) => verifyIranianNationalId(val) || isValidIranianPassport(val),
      {
        message: 'کد ملی یا کد گذرنامه معتبر نیست',
      },
    ),
  phoneNumber: z
    .string()
    .length(11, 'شماره تماس باید دقیقا ۱۱ رقم باشد')
    .regex(/^09\d{9}$/, 'شماره تماس باید با ۰۹ شروع شود و معتبر باشد')
    .or(z.literal(''))
    .optional(),
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting AddPassengersDialog component as default
export default function AddPassengersDialog({
  closeFn,
  isOpened = false,
  refetch,
  phoneNumbers,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const [errorOpened, setErrorOpened] = useState<boolean>(false);
  const [successOpened, setSuccessOpened] = useState<boolean>(false);
  const [name, setName] = useState<string>('');

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    reValidateMode: 'onBlur',
  });

  // Defining api fetching hooks
  const addNewPassenger = useApiMutation({
    url: '/hotel/passengers/',
    method: 'post',
    options: {
      onSuccess: () => {
        form.reset({
          firstName: '',
          lastName: '',
          nationalOrPassportCode: '',
          phoneNumber: '',
        });

        closeFn && closeFn();
        refetch && refetch();
        setSuccessOpened(true);
      },
      onError: () => {
        form.reset({
          firstName: '',
          lastName: '',
          nationalOrPassportCode: '',
          phoneNumber: '',
        });

        closeFn && closeFn();
        setErrorOpened(true);
      },
    },
  });

  // Defining submit handler
  const submitEventHandler: SubmitHandler<formType> = async (data) => {
    if (
      data.phoneNumber &&
      phoneNumbers &&
      phoneNumbers.includes(data.phoneNumber)
    ) {
      form.setError('phoneNumber', {
        message: 'این شماره تلفن ثبلا به ثبت رسیده.',
      });
    } else {
      setName(`${form.getValues('firstName')} ${form.getValues('lastName')}`);
      await addNewPassenger.mutateAsync({
        first_name: data.firstName,
        last_name: data.lastName,
        identification_code: data.nationalOrPassportCode,
        phone_number: data.phoneNumber,
      });
    }
  };

  // Returning JSX
  return (
    <Dialog
      open={isOpened}
      onOpenChange={(open) => {
        if (!open && closeFn) {
          closeFn();
          setName('');

          form.reset({
            firstName: '',
            lastName: '',
            nationalOrPassportCode: '',
            phoneNumber: '',
          });
        }
      }}
    >
      <PassengerAddedSucessDialog
        isOpened={successOpened}
        closeFn={() => setSuccessOpened(false)}
        infos={[name]}
      />
      <PassengerAddedErrorDialog
        isOpened={errorOpened}
        closeFn={() => setErrorOpened(false)}
        tryAgainFn={() => {
          setErrorOpened(false);
          submitEventHandler(form.getValues());
        }}
      />
      <DialogContent className="lg:w-[28dvw] w-dvw p-0 block gap-0 scrollbar-hide overflow-auto lg:max-h-[calc(100dvh-50px)] max-h-dvh lg:rounded-2xl rounded-none lg:h-auto h-dvh">
        <div className="px-3 py-3 border-b border-b-black/10 lg:hidden block">
          <DialogClose asChild>
            <button className="flex items-center justify-start gap-[10px] w-full">
              <IconsaxIcons
                name="ArrowRight"
                className="w-[12px] h-[12px] text-current"
                color="black"
              />
              <DialogTitle className="text-right text-[12px] font-semibold text-black block truncate w-full">
                برگشت به صفحه
              </DialogTitle>
            </button>
          </DialogClose>
        </div>
        <div className="px-6 py-3 border-b border-b-black/10 items-center justify-between gap-3 lg:flex hidden">
          <DialogTitle className="text-right text-[14px] font-bold text-black truncate w-full">
            افزودن مسافر
          </DialogTitle>
          <DialogClose asChild>
            <button
              onClick={closeFn}
              className="shrink-0 text-black"
              type="button"
            >
              <ICX className="w-3 h-3 text-current" fill="currentColor" />
            </button>
          </DialogClose>
        </div>
        <form
          action="#"
          onSubmit={form.handleSubmit(submitEventHandler)}
          className="px-3 lg:py-3 py-4 w-full flex flex-col items-center justify-between gap-3 lg:h-auto h-[calc(100%-40px)]"
        >
          <div className="lg:gap-6 gap-[12px] w-full flex flex-col">
            <DialogTitle className="text-right text-[12px] font-bold text-black lg:hidden block truncate w-full">
              افزودن مسافر
            </DialogTitle>
            <DialogInput
              required
              label="نام (لاتین یا فارسی)"
              type="text"
              placeholder={'نام مسافر خود را وارد نمایید'}
              error={form.formState.errors.firstName?.message}
              id="firstName"
              {...form.register('firstName')}
            />
            <DialogInput
              required
              label="نام خانوادگی (لاتین یا فارسی)"
              type="text"
              placeholder={'نام خانوادگی مسافر خود را وارد نمایید'}
              error={form.formState.errors.lastName?.message}
              id="lastName"
              {...form.register('lastName')}
            />
            <DialogInput
              label="شماره پاسپورت / کد ملی"
              type="text"
              placeholder={'کد ملی یا شماره پاسپورت مسافر خود را وارد نمایید'}
              error={form.formState.errors.nationalOrPassportCode?.message}
              id="nationalCode"
              {...form.register('nationalOrPassportCode')}
            />
            <DialogInput
              label="شماره همراه"
              type="tel"
              placeholder={'شماره همراه مسافر خود را وارد نمایید'}
              error={form.formState.errors.phoneNumber?.message}
              id="phoneNumber"
              {...form.register('phoneNumber')}
            />
          </div>
          <DialogFooter className="grid lg:grid-cols-2 grid-cols-1 gap-3 w-full shrink-0">
            <button
              className="bg-green-400 lg:rounded-md rounded-[10px] flex items-center justify-center text-white lg:font-medium font-semibold lg:text-cs07 text-[14px] h-[45px] px-3 truncate transition-all duration-500 hover:bg-green-600"
              type="submit"
            >
              {form.formState.isSubmitting ? <Loading /> : 'ثبت اطلاعات'}
            </button>
            <DialogClose asChild>
              <button
                className="lg:flex hidden items-center justify-center transition-all duration-500 bg-white hover:bg-gray-100 text-black font-medium text-cs07 h-[45px] px-3 truncate"
                type="button"
              >
                منصرف شدم
              </button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
