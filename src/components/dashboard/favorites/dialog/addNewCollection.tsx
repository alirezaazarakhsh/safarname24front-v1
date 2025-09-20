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
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import IconsaxIcons from '@/components/icons/iconsaxIcons';

// Defining formSchema
const formSchema = z.object({
  name: z
    .string({
      required_error: 'لطفا این فیلد را پر کنید.',
    })
    .min(5, {
      message: 'نام کالکشن نمیتواند کمتر از 5 کاراکتر باشد.',
    })
    .max(50, {
      message: 'نام کالکشن نمیتواند بیشتر از 50 کاراکتر باشد.',
    }),
});

type formType = z.infer<typeof formSchema>;

// Creating and exporting AddNewCollectionDialog component as default
export default function AddNewCollectionDialog({
  closeFn,
  isOpened = false,
  refetch,
}: DialogComponentPropsType): ReactNode {
  // Defining hooks
  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [errorMobileDrawerOpened, setErrorMobileDrawerOpened] =
    useState<boolean>(false);

  const [successMobileDrawerOpened, setSuccessMobileDrawerOpened] =
    useState<boolean>(false);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  // Using useEffect to reset every value from form  when dialog closes
  useEffect(() => {
    if (!isOpened) {
      form.reset({
        name: '',
      });
    }
  }, [isOpened]);

  // Fetching data
  const fetchData = useApiMutation({
    url: '/favorite/collections/',
    method: 'post',
    options: {
      onError: () => {
        closeFn && closeFn();

        if (isMobile) {
          setErrorMobileDrawerOpened(true);
        } else {
          toast({
            title: 'خطایی رخ داد!',
            description: 'در حذف لیست مشکلی پیش آمد مجدد تلاش کنید.',
            theme: 'theme',
          });
        }
      },
      onSuccess: () => {
        refetch && refetch();
        closeFn && closeFn();

        if (isMobile) {
          setSuccessMobileDrawerOpened(true);
        } else {
          toast({
            title: 'مجموعه جدید ایجاد شد!',
            description: 'کاربر گرامی محموعه جدید شما به درست شد ! ',
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

  // Returning JSX
  return (
    <Dialog open={isOpened}>
      {isMobile && (
        <>
          <CanclationErrorDrawer
            title="مجموعه جدید ایجاد شد!"
            description="کاربر گرامی محموعه جدید شما به درست شد ! "
            isOpened={successMobileDrawerOpened}
            closeFn={() => setSuccessMobileDrawerOpened(false)}
            theme="green"
          />
          <CanclationErrorDrawer
            title="خطایی رخ داد"
            description="در حذف لیست مشکلی پیش آمد مجدد تلاش کنید."
            isOpened={errorMobileDrawerOpened}
            closeFn={() => setErrorMobileDrawerOpened(false)}
          />
        </>
      )}
      <DialogContent className="max-w-[400px] text-cs85 font-semibold p-0 gap-0">
        <div className="px-6 h-16 border-b border-b-black/10 flex items-center justify-between gap-3 shadow-light">
          <DialogTitle className="text-zinc-800 text-[0.95rem]/6! font-extrabold truncate text-right block flex-1">
            لیست جدید مورد علاقه ها
          </DialogTitle>
          <DialogClose asChild>
            <button
              onClick={closeFn}
              className="shrink-0 text-[rgb(136_136_136)]"
              type="button"
            >
              <ICX className="size-[10px] text-current" fill="currentColor" />
            </button>
          </DialogClose>
        </div>
        <form
          action="#"
          className="p-6 w-full"
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
            className="bg-gray-100 h-12 mb-6 px-3 md:rounded-md rounded-[6px] md:text-[12px] text-[10px] font-semibold md:placeholder:text-[12px] placeholder:text-[10px] placeholder:text-black/50 text-black w-full block"
            placeholder="نام لیست خود را وارد نمایید"
            type="text"
            {...form.register('name')}
          />
          <DialogFooter dir="ltr">
            <button
              disabled={form.formState.isSubmitting}
              className="bg-cs-dark-blue text-white h-12 flex-center gap-1.5 rounded-cs-10 w-full"
              type="submit"
            >
              {form.formState.isSubmitting ? (
                <Loading />
              ) : (
                <>
                  <span className="text-current text-cs08 font-semibold">
                    افزودن لیست جدید
                  </span>
                  <IconsaxIcons
                    className="size-4"
                    color="currentColor"
                    name="Add"
                  />
                </>
              )}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
