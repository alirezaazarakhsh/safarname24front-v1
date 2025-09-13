// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { motion } from 'framer-motion';
import IconsaxIcons from '@/components/icons/iconsaxIcons';
import { CollectionComponentPropsType } from '@/types/dashboard/component';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import DeleteCollectionDialog from './dialog/deleteCollectionDialog';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/utils';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import toast from '../ui/customSonner/toast';
import Loading from '../ui/loading';

// Defining static route for empty collection image
const emptyCollectionLogoSrc = '/image/dashboardFavorites/logo.png';

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

// Creating and exporting Collection componenet as default
export default function Collection({
  isDeletingByUser,
  data: { id, images, title },
  loading = false,
  refetch,
}: CollectionComponentPropsType): ReactNode {
  // Defining hooks
  const [dialogOpened, setDialogOpened] = useState<boolean>(false);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: title,
    },
    reValidateMode: 'onChange',
  });

  // Fetching data
  const fetchData = useApiMutation({
    url: `/favorite/collections/${id}/`,
    method: 'patch',
    options: {
      onError: () => {
        toast({
          title: 'خطایی رخ داد!',
          description: 'در حذف لیست مشکلی پیش آمد مجدد تلاش کنید.',
          theme: 'theme',
        });
      },
      onSuccess: () => {
        refetch();
        toast({
          title: 'مجموعه جدید ایجاد شد!',
          description: 'کاربر گرامی محموعه جدید شما به درست شد ! ',
          theme: 'green',
        });
      },
    },
  });

  const submitEventHandler: SubmitHandler<formType> = async ({ name }) => {
    await fetchData.mutateAsync({ title: name });
  };

  // Conditional rendering
  if (loading) {
    return (
      <div>
        <div className="grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-2">
          <Skeleton className="rounded-md object-cover col-span-1 row-span-2 w-full h-full" />
          <Skeleton className="rounded-md object-cover col-span-1 row-span-1 w-full h-full" />
          <Skeleton className="rounded-md object-cover col-span-1 row-span-1 w-full h-full" />
        </div>
        <Skeleton className="w-full rounded=[8px] h-[20px]" />
      </div>
    );
  } else {
    return (
      <>
        <DeleteCollectionDialog
          id={id}
          refetch={refetch}
          isOpened={dialogOpened}
          closeFn={() => setDialogOpened(false)}
        />
        <div className="block relative">
          <motion.div
            className="w-full h-full rounded-lg flex items-center justify-center bg-black/10 absolute left-0 top-0 backdrop-blur-xl"
            exit={{ opacity: 0, pointerEvents: 'none' }}
            initial={{ opacity: 0, pointerEvents: 'none' }}
            transition={{ duration: 0.6 }}
            animate={{
              opacity: fetchData.isPending ? 1 : 0,
              pointerEvents: fetchData.isPending ? 'auto' : 'none',
            }}
          >
            <Loading className="bg-white" />
          </motion.div>
          <motion.button
            disabled={!isDeletingByUser || fetchData.isPending}
            className="w-[40px] h-[40px] flex items-center justify-center rounded-md bg-cs-red text-white absolute -right-[20px] -top-[20px]"
            exit={{ opacity: 0, scale: 0.8 }}
            initial={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6 }}
            onClick={() => setDialogOpened(true)}
            whileHover={{
              background: '#FF4558',
            }}
            animate={{
              opacity: isDeletingByUser ? 1 : 0,
              scale: isDeletingByUser ? 1 : 0.8,
            }}
          >
            <IconsaxIcons
              name="Trash"
              className="w-[20px] h-[20px]"
              color="currentColor"
            />
          </motion.button>
          <Link
            href={`/dashboard/favorites/${id}`}
            tabIndex={fetchData.isPending ? -1 : 0}
            aria-disabled={fetchData.isPending}
            className="grid grid-cols-2 grid-rows-2 gap-[10px] overflow-hidden rounded-md h-[200px] mb-2 aria-disabled:pointer-events-none"
          >
            {images.map((item, index) =>
              item === emptyCollectionLogoSrc ? (
                <div
                  key={index}
                  className={cn(
                    'rounded-md overflow-hidden w-full h-full bg-white flex items-center justify-center',
                    index === 0 && 'row-span-2',
                  )}
                >
                  <Image
                    width={500}
                    height={500}
                    alt={'عکس شماره 1 مجموعه'}
                    src={item}
                    className="size-[80px]"
                  />
                </div>
              ) : (
                <Image
                  key={index}
                  width={500}
                  height={500}
                  alt={'عکس شماره 1 مجموعه'}
                  src={item}
                  className={cn(
                    'rounded-md object-cover w-full h-full',
                    index === 0 && 'row-span-2',
                  )}
                />
              ),
            )}
          </Link>
          <form
            action="#"
            className="mt-3"
            onSubmit={form.handleSubmit(submitEventHandler, (errors) => {
              if (errors.name?.message) {
                toast({
                  title: 'خطایی رخ داد!',
                  description: errors.name.message,
                  theme: 'theme',
                });
              }
            })}
          >
            <input
              type="text"
              className="text-black font-semibold block text-right text-[13px] placeholder:text-[13px] placeholder:font-semibold placeholder:text-gray-500 m-0 p-0 pb-3 border-b transition-all duration-500 bg-transparent w-full border-transparent focus:border-b-black/20 aria-[invalid=true]:border-b-cs-red/20 aria-[invalid=true]:text-cs-red"
              placeholder="نام لیست را وارد کنید"
              disabled={fetchData.isPending}
              tabIndex={fetchData.isPending ? -1 : 0}
              aria-invalid={form.formState.errors.name?.message !== undefined}
              {...form.register('name')}
            />
          </form>
        </div>
      </>
    );
  }
}
