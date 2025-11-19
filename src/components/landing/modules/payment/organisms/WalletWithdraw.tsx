'use client';

import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from '@/components/ui/accordion';

import {
  SubmitWithdraw,
  RemoveWithdraw,
  WalletWithdrawAccordionTrigger,
} from '../molecules/wallet-withdraw';

import { useEffect, useState } from 'react';
import { Invoice } from '../helpers/type';
import { numberSeparation } from '@/utils';

import { axiosInstance } from '@/utils/axios';
import { payment } from '../helpers/constant';
import { useSearchParams } from 'next/navigation';

import { useApiQuery } from '@/hooks/dashboard/useApiQuery';
import { useQuery, useQueryClient } from '@tanstack/react-query';

type InvoiceApiResponse = { data: Invoice };
type WalletApiResponse = { balance: number };
type TEvent = React.ChangeEvent<HTMLInputElement>;

// ------------------------------

export function WalletWithdraw() {
  const searchParams = useSearchParams();
  const trackingCode = searchParams.get(payment.reservationId);

  const queryClient = useQueryClient();
  const [withdrawalAmount, setWithdrawalAmount] = useState('');

  function handleInputChange(e: TEvent) {
    const filteredInput = e.target.value.replace(/[^0-9]/g, '').slice(0, 12);
    setWithdrawalAmount(filteredInput);
  }

  function handleInvalidateQuery() {
    queryClient.invalidateQueries({ queryKey: ['reservation-invoice'] });
  }

  // === GET Wallet-Balance
  const { data: wallet } = useApiQuery<WalletApiResponse>({
    url: '/finance/wallet/',
    queryKey: ['wallet-balance'],
  });

  // === GET Wallet-Withdraw
  const { data: invoice } = useQuery<InvoiceApiResponse>({
    queryKey: ['reservation-invoice'],
    enabled: (wallet?.balance ?? 0) > 0,
    queryFn: () => axiosInstance(`/hotel/reservation/invoice/${trackingCode}/`),
  });

  const walletBalance = wallet?.balance;
  const paymentInvoice = invoice?.data.wallet_withdraw;

  // === Set Withdraw-Amount in input
  useEffect(() => {
    if (paymentInvoice) setWithdrawalAmount(`${paymentInvoice} تومان`);
  }, [paymentInvoice]);

  return (
    <div>
      <Accordion
        collapsible
        type="single"
        disabled={(walletBalance ?? 0) === 0}
        defaultValue={paymentInvoice ? 'item-1' : undefined}
        className={`rounded-xl border bg-white px-5 ${(walletBalance ?? 0) === 0 ? 'opacity-60' : ''}`}
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <WalletWithdrawAccordionTrigger
              walletBalance={
                paymentInvoice && walletBalance
                  ? walletBalance - paymentInvoice
                  : walletBalance
              }
            />
          </AccordionTrigger>

          <AccordionContent className="border-t">
            {!paymentInvoice && (
              <p className="pt-4 text-cs08 font-semibold text-zinc-500">
                مبلغ برداشتی از کیف پول خود را وارد نمایید :
              </p>
            )}

            <div className="mt-5 flex h-11 gap-3.5 text-cs85/5 font-bold">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="مبلغ به تومان"
                  onChange={handleInputChange}
                  value={numberSeparation(withdrawalAmount)}
                  readOnly={(paymentInvoice ?? 0) > 0 || false}
                  className="full-size rounded-cs-10 bg-zinc-100 px-5 text-center text-zinc-500 placeholder:font-semibold"
                />
              </div>

              {(paymentInvoice ?? 0) > 0 ? (
                <RemoveWithdraw
                  trackingCode={trackingCode}
                  handleInvalidateQuery={handleInvalidateQuery}
                  handleClearAmount={() => setWithdrawalAmount('')}
                />
              ) : (
                <SubmitWithdraw
                  trackingCode={trackingCode}
                  walletBalance={walletBalance}
                  withdrawalAmount={withdrawalAmount}
                  handleInvalidateQuery={handleInvalidateQuery}
                />
              )}
            </div>

            {!paymentInvoice && withdrawalAmount && (
              <div className="flex-between mt-3.5 items-center text-cs85 font-bold">
                <span>* مبلغ برداشت : </span>
                <span>{numberSeparation(withdrawalAmount)} تومان</span>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
