'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { generalInstance } from '@/utils/services';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

type ApiResponse = {
  discount_price: number;
  status: 'error' | 'success';
};

type ApiRequest = { discountCode: string };

const formSchema = z.object({
  discountCode: z
    .string()
    .nonempty('مقدار کد تخفیف نمی‌تواند خالی باشد')
    .length(8, 'کد تخفیف باید ۸ کاراکتر داشته باشد'),
});

// ------------------------------

export function ApplyDiscountCode() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { discountCode: '' },
  });

  const mutation = useMutation<ApiResponse, ApiResponse, ApiRequest>({
    mutationFn: (data) => {
      return generalInstance.post('/auth/', data);
    },
    onError: (error) => {
      form.setError('discountCode', {
        message: 'کد تخفیف وارد شده اشتباه میباشد !',
      });
    },
    onSuccess: (data) => {
      console.log(data);
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;
    const filteredInput = input
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, 8)
      .toUpperCase();

    form.setValue('discountCode', filteredInput, { shouldValidate: true });
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutation.mutate({ discountCode: values.discountCode });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="bg-white p-5 pt-4 border rounded-xl"
    >
      <span className="text-cs85 font-bold">اعمال کد تخفیف</span>
      <div className="my-3 border-b-2 border-dashed" />
      <span className="text-zinc-500 text-cs08 font-semibold">
        مشترک گرامی کد تخفیف خود را وارد نمایید :
      </span>

      <div className="h-11 font-semibold mt-6 grid grid-cols-[max-content_1fr] gap-3.5">
        <button
          type="submit"
          className="bg-cs-dark-blue text-white text-cs75 w-[7.5rem] flex-center rounded-lg"
        >
          {mutation.isPending ? (
            <div className="loader-dots" />
          ) : (
            <span>اعمال کد تخفیف</span>
          )}
        </button>

        <div className="flex">
          <input
            type="text"
            maxLength={8}
            onChange={handleInputChange}
            placeholder="- - - - - - - -"
            value={form.watch('discountCode')}
            className="w-full bg-zinc-100 text-zinc-500 text-cs08 font-inter text-center px-6 rounded-lg"
          />
        </div>
      </div>

      <div className="bg-cs-red/10 text-cs-red h-11 text-cs08 font-semibold px-4 mt-3.5 flex-between items-center rounded-lg">
        {mutation.status === 'success' ||
        !form.formState.errors.discountCode ? (
          <>
            <span>مبلغ تخفیف :</span>

            <div className="flex items-center gap-1.5">
              <span>10,000,000</span>
              <span>تومان</span>
            </div>
          </>
        ) : (
          form.formState.errors.discountCode?.message
        )}
      </div>
    </form>
  );
}
