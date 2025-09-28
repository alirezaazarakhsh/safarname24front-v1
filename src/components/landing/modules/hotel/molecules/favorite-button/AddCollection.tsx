import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog';

import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { Plus } from 'lucide-react';
import { IoClose } from 'react-icons/io5';

import { useForm } from 'react-hook-form';
import { axiosInstance } from '@/utils/axios';
import loader from '@/styles/loader.module.css';

import useCallReactions from './helpers/useCallReactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CSSVars } from '@/types/landing';

type Props = {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
};

// -----------------------------

export function AddCollection(props: Props) {
  const { open, onOpenChange } = props;

  const queryClient = useQueryClient();
  const callReactions = useCallReactions();

  const form = useForm({
    defaultValues: { collection: '' },
  });

  // === Reset-Form (On-Close)
  useEffect(() => {
    if (!open) form.reset();
  }, [open, form]);

  // === Mutate-Collection
  const { mutate, status } = useMutation<unknown, AxiosError<any>>({
    mutationFn: () => {
      return axiosInstance.post('favorite/collections/', {
        title: form.getValues('collection'),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['hotel-favorite-collections'],
      });

      onOpenChange(false);
      callReactions({ type: 'success', context: 'add-collection' });
    },
    onError: (error) => {
      callReactions({
        type: 'error',
        context: 'add-collection',
        error: error?.response?.data?.error,
      });
    },
  });

  // === Submit-Mutation
  function onSubmit() {
    mutate();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[350px] p-0 gap-5">
        <DialogHeader className="h-16 px-6 flex-row items-center justify-between space-y-0 border-b shadow-light">
          <div className="text-zinc-800 text-cs85 font-extrabold">
            لیست جدید علاقه مندی ها
          </div>

          <DialogClose>
            <IoClose color="#888" size={20} />
          </DialogClose>

          <DialogTitle className="hidden"></DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>

        <form
          className="m-6 mt-0 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <input
            {...form.register('collection', {
              required: '* نام لیست نمیتواند مقدار خالی باشد !',
              minLength: {
                value: 5,
                message: '* حداقل تعداد کاراکتر "5" میباشد !',
              },
              maxLength: {
                value: 40,
                message: '* حداکثر تعداد کاراکتر "40" میباشد !',
              },
            })}
            placeholder="عنوان لیست خود را وارد نمایید ..."
            className={`bg-zinc-100/50 h-12 text-zinc-800 text-cs08 font-semibold px-4 border rounded-cs-10 placeholder:font-medium ${form.formState.errors.collection?.message ? 'border-cs-red' : 'border-zinc-200 '}`}
          />

          {form.formState.errors.collection?.message && (
            <p className="text-cs-red text-cs08 font-semibold mt-2">
              {form.formState.errors.collection?.message}
            </p>
          )}

          <button
            type="submit"
            className="bg-cs-dark-blue h-12 mt-4 flex-center gap-1.5 rounded-cs-10"
          >
            {status === 'pending' ? (
              <div
                className={loader.dots}
                style={{ '--dots-color': '#fff' } as CSSVars}
              />
            ) : (
              <>
                <Plus color="#fff" size={16} />
                <span className="text-white text-cs08 font-semibold">
                  ایجاد لیست
                </span>
              </>
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
