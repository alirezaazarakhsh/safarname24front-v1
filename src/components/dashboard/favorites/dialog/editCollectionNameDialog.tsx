// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from '@/components/ui/dialog';
import { DialogComponentPropsType } from '@/types/dashboard/component';
import { useMediaQuery } from '@/hooks';
import toast from '../../ui/customSonner/toast';
import CanclationErrorDrawer from '../../reservation/canclationErrorDrawer';
import { ICX } from '@/components/icons/ICX';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '../../ui/loading';
import { Button } from '@/components/ui/button';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
} from '@/components/ui/drawer';

// Defining formSchema
const formSchema = z.object({
  name: z
    .string({
      required_error: 'لطفا این فیلد را پر کنید.',
    })
    .min(5, {
      message: 'نام کالکشن نمیتواند کمتر از 5 کاراکتر باشد.',
    }),
});

type formType = z.infer<typeof formSchema>;

// Creating and exporting EditCollectionNameDialog component as default
export default function EditCollectionNameDialog({
  closeFn,
  isOpened = false,
  refetch,
  id,
  infos,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');
  const [errorMobileDrawerOpened, setErrorMobileDrawerOpened] =
    useState<boolean>(false);

  const [successMobileDrawerOpened, setSuccessMobileDrawerOpened] =
    useState<boolean>(false);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: infos && infos[0] ? infos[0] : '',
    },
  });

  // Fetching data
  const fetchData = useApiMutation({
    url: `/favorite/collections/${id}/update/`,
    method: 'put',
    options: {
      onError: () => {
        closeFn && closeFn();
        if (isMobile) {
          setErrorMobileDrawerOpened(true);
        } else {
          toast({
            title: 'خطایی رخ داد!',
            description: 'تغییر نام این کالکشن با مشکل مواجه شد.',
            theme: 'theme',
          });
        }
      },
      onSuccess: () => {
        closeFn && closeFn();
        if (isMobile) {
          setSuccessMobileDrawerOpened(true);
        } else {
          refetch && refetch();
          toast({
            title: 'نام مجموعه تغیر یافت !',
            description: `کاربر گرامی نام مجموعه مد نظر شما به ${form.getValues('name')} تغیر یافت.`,
            theme: 'green',
          });
        }
      },
    },
  });

  // Defining submit Event
  const submitEventHandler: SubmitHandler<formType> = async ({ name }) => {
    await fetchData.mutateAsync({ title: name });
  };

  // Conditional rendering
  if (isMobile) {
    return (
      <div>
        <CanclationErrorDrawer
          title="نام مجموعه تغیر یافت !"
          description={`کاربر گرامی نام مجموعه مد نظر شما به ${form.getValues('name')} تغیر یافت.`}
          isOpened={successMobileDrawerOpened}
          closeFn={() => {
            setSuccessMobileDrawerOpened(false);
            refetch && refetch();
          }}
          theme="green"
        />
        <CanclationErrorDrawer
          title="خطایی رخ داد !"
          description="در تغیر نام این کالکشن مشکلی به وجود امد."
          isOpened={errorMobileDrawerOpened}
          closeFn={() => setErrorMobileDrawerOpened(false)}
        />
        <Drawer open={isOpened}>
          <DrawerContent>
            <DrawerTitle className="text-right md:text-[14px] text-[12px] md:font-bold  font-semibold text-black block truncate w-full mb-3">
              ویرایش متن
            </DrawerTitle>
            <form
              action="#"
              className="space-y-[12px] w-full"
              onSubmit={form.handleSubmit(submitEventHandler, (e) => {
                const nameError = e.name?.message;

                if (nameError) {
                  toast({
                    title: 'خطایی رخ داد!',
                    description: nameError,
                    theme: 'theme',
                  });
                }
              })}
            >
              <input
                className="bg-white border border-black h-[45px] px-3 md:rounded-md rounded-[6px] md:text-[12px] text-[10px] font-semibold md:placeholder:text-[12px] placeholder:text-[10px] placeholder:text-black/50 text-black w-full block"
                placeholder="نام لیست خود را وارد نمایید"
                type="text"
                {...form.register('name')}
              />
              <DrawerFooter dir="ltr" className="grid grid-cols-2 gap-3 p-0">
                <Button
                  disabled={form.formState.isSubmitting}
                  className="flex items-center justify-center px-4 md:rounded-md rounded-[6px] transition-all duration-500 font-semibold text-white bg-black h-[40px] hover:bg-black disabled:opacity-100 md:text-[12px] text-[10px] truncate"
                  type="submit"
                >
                  {form.formState.isSubmitting ? <Loading /> : 'ثبت تغیرات'}
                </Button>
                <Button
                  disabled={form.formState.isSubmitting}
                  className="flex items-center justify-center px-4 md:rounded-md rounded-[6px] font-semibold transition-all duration-500 text-black bg-[#ededed] h-[40px] hover:bg-[#b9b9b9] disabled:opacity-100 md:text-[12px] text-[10px] truncate"
                  type="button"
                  onClick={closeFn && closeFn}
                >
                  برگشت
                </Button>
              </DrawerFooter>
            </form>
          </DrawerContent>
        </Drawer>
      </div>
    );
  } else {
    return (
      <Dialog open={isOpened}>
        <DialogContent className="w-full max-w-[320px] gap-0 p-0">
          <div className="md:px-6 px-3 py-3 border-b border-b-black/10 flex items-center justify-between gap-3">
            <DialogTitle className="text-right md:text-[14px] text-[12px] md:font-bold  font-semibold text-black block truncate w-full">
              ویرایش متن
            </DialogTitle>
            <DialogClose asChild>
              <button
                onClick={closeFn}
                className="shrink-0 text-gray-300"
                type="button"
              >
                <ICX
                  className="md:w-3 md:h-3 w-[12px] h-[12px] text-current"
                  fill="currentColor"
                />
              </button>
            </DialogClose>
          </div>
          <form
            action="#"
            className="px-3 md:py-3 py-4 md:space-y-6 space-y-[12px] w-full"
            onSubmit={form.handleSubmit(submitEventHandler, (e) => {
              const nameError = e.name?.message;

              if (nameError) {
                toast({
                  title: 'خطایی رخ داد!',
                  description: nameError,
                  theme: 'theme',
                });
              }
            })}
          >
            <input
              className="bg-white border border-black h-[45px] px-3 md:rounded-md rounded-[6px] md:text-[12px] text-[10px] font-semibold md:placeholder:text-[12px] placeholder:text-[10px] placeholder:text-black/50 text-black w-full block"
              placeholder="نام لیست خود را وارد نمایید"
              type="text"
              {...form.register('name')}
            />
            <DialogFooter dir="ltr" className="grid grid-cols-2 gap-1">
              <Button
                disabled={form.formState.isSubmitting}
                className="flex items-center justify-center px-4 md:rounded-md rounded-[6px] transition-all duration-500 font-semibold text-white bg-black h-[40px] hover:bg-black disabled:opacity-100 md:text-[12px] text-[10px] truncate"
                type="submit"
              >
                {form.formState.isSubmitting ? <Loading /> : 'ثبت تغیرات'}
              </Button>
              <Button
                disabled={form.formState.isSubmitting}
                className="flex items-center justify-center px-4 md:rounded-md rounded-[6px] font-semibold transition-all duration-500 text-black bg-[#ededed] h-[40px] hover:bg-[#b9b9b9] disabled:opacity-100 md:text-[12px] text-[10px] truncate"
                type="button"
                onClick={closeFn && closeFn}
              >
                برگشت
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    );
  }
}
