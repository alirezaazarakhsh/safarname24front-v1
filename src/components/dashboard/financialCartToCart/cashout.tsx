// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import CheckboxItem from '@/components/dashboard/financial/checkboxItem';
import NormalInput from '../profile/normalInput';
import CreditCardDropDown from '../profile/creditCardDropdown';
import Selecter from './selecter';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useApiMutation from '@/hooks/dashboard/useApiMutation';
import toast from '../ui/customSonner/toast';
import Loading from '../ui/loading';
import { numberSeparation } from '@/utils';
import { addCommas, removeCommas } from '@persian-tools/persian-tools';

// Defining form schema
const formSchema = z.object({
  walletAmount: z
    .string({
      message: 'لفا این فیلد را پر کنید.',
    })
    .refine((val) => Number(removeCommas(val)) >= 10000, {
      message: 'مقدار وارد شده نباید کمتر از 10,000 تومان باشد',
    }),
  creditCard: z
    .string({
      message: "لطفا این فیلد را پر کنید."
    })
    .min(1, "شناسه ضروری است")
    .refine((val) => !isNaN(Number(val)), "شناسه باید فقط عدد باشد")
});

// Defining form type
type formType = z.infer<typeof formSchema>;

// Creating and exporting CashOut section/component of cart-to-cart dashboard (financial) page as default
export default function CashOut(): ReactNode {
  // Defining hooks
  const [profile, setProfile] = useState<'profile' | 'legal'>('legal');
  const [approved, setApproved] = useState<boolean>(false);
  const [fakeValueOfCard, setFakeValueOfCard] = useState<{
    number: string;
    iban: string;
  } | undefined>(undefined);

  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const postData = useApiMutation({
    method: "post",
    url: "/finance/withdrawal-requests/",
    options: {
      onSuccess: () => {
        toast({
          title: "برداشت مبلغ موفقیت امیز بود!",
          description: "مشترک گرامی , برداشت مبلغ مد نظر شما با موفقیت انجام شد.",
          theme: "green"
        });
      },
      onError: () => {
        toast({
          title: "خطایی در برداشت وجه شکل گرفت!",
          description: "مشترک گرامی , برداشت مبلغ مد نظر شما انجام نشد.",
          theme: "theme"
        });
      }
    }
  });

  // Defining form submit event
  const onSubmit: SubmitHandler<formType> = async (data) => {
    await postData.mutateAsync({
      profile_type: profile === "profile" ? "natural" : "juridical",
      card_object_id: data.creditCard,
      amount: Number(removeCommas(data.walletAmount))
    });
  };

  // Returning JSX
  return (
    <section className="bg-white border rounded-xl border-black/10 p-4 grid lg:grid-cols-4 gap-10">
      <div className="flex flex-col justify-between">
        <div className="w-full">
          <span className="text-cs09 font-extrabold truncate text-right mb-2 block text-black">
            بخش مالی - برداشت وجه
          </span>
          <span className="text-cs75 font-normal truncate text-right block text-black/70 mb-5">
            پروفایل خود را انتخاب نمایید
          </span>
        </div>
        <div className="flex flex-col items-center justify-between w-full lg:gap-3 gap-[24px]">
          <CheckboxItem
            isCardSelection
            hideTooltip
            onClick={() => setProfile('profile')}
            checked={profile === "profile"}
            title={'پروفایل حقیقی'}
            className="lg:h-[50px]"
          />
          <CheckboxItem
            isCardSelection
            hideTooltip
            onClick={() => setProfile('legal')}
            checked={profile === "legal"}
            title={'پروفایل حقوقی'}
            className="lg:h-[50px]"
          />
        </div>
      </div>
      <form
        action="#"
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:grid flex flex-col lg:col-span-3 lg:grid-cols-3 gap-4"
      >
        <div className="w-full">
          <div className="mb-5 w-full">
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              مبلغ برداشت کیف پول
            </span>
            <NormalInput
              type="text"
              inputMode="numeric"
              placeholder="مبلغ مد نظر خود را وارد نمایید"
              error={form.formState.errors.walletAmount?.message}
              className="w-full"
              onInput={(e) => {
                const value = e.currentTarget.value;
                const removedCommas = removeCommas(value);
                const translatedValue = addCommas(removedCommas);
                e.currentTarget.value = translatedValue;
              }}
              {...form.register("walletAmount")}
            />
          </div>
          <div className="w-full">
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              شماره کارت بانکی
            </span>
            <CreditCardDropDown
              placeholder="مبلغ مد نظر خود را وارد نمایید"
              className="w-full"
              hideCreate
              reset={() => {
                setFakeValueOfCard(undefined);
                form.resetField("creditCard", undefined);
              }}
              onValueChange={(card, shaba, id) => {
                form.setValue('creditCard', id.toString());
                setFakeValueOfCard({
                  iban: shaba,
                  number: card
                })
              }}
              value={fakeValueOfCard ? fakeValueOfCard.number : ""}
              {...form.register('creditCard')}
            />
          </div>
        </div>
        <div className="col-span-2 flex flex-col items-center justify-between">
          <div className="mb-5 w-full">
            <span className="font-semibold text-cs85 text-black truncate text-right mb-2 block">
              شماره شبا کارت بانکی
            </span>
            <NormalInput
              type="text"
              placeholder="24 رقم شماره شبا کارت را وارد نمایید"
              textLTR
              value={fakeValueOfCard ? numberSeparation(fakeValueOfCard.iban, " - ", 4) : ""}
              error={form.formState.errors.creditCard?.message}
              clearFn={() => {
                setFakeValueOfCard(undefined);
                form.reset({
                  creditCard: undefined
                });
              }}
              disabled
            />
          </div>
          <div className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-between justify-start gap-4 w-full">
            <Selecter
              label="شماره کارت و شماره شبا را تایید میکنم."
              checked={approved}
              onCheckChange={setApproved}
            />
            <button
              disabled={!approved || postData.isPending}
              type="submit"
              className="w-[175px] h-[45px] transition-all text-cs75 shrink-0 duration-500 text-white bg-green-500 disabled:text-black disabled:bg-gray-100  rounded-md flex items-center justify-center"
            >
              {
                !postData.isPending
                  ? "ارسال درخواست (برداشت وجه)"
                  : <Loading className='bg-current' />
              }
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
