'use client';

import { CSSVars } from '@/types/landing';
import { ArrowLeft } from 'iconsax-react';

import { usePaymentLoading } from '@/context';
import loader from '@/styles/loader.module.css';

// ------------------------------

export function FirstStepSubmitButton() {
  const { isLoading } = usePaymentLoading();

  return (
    <button
      type="submit"
      disabled={isLoading}
      form="passengers-form"
      className="w-full h-12 bg-cs-dark-blue rounded-cs-10"
    >
      {isLoading ? (
        <div className="full-size flex-center">
          <div
            className={loader.dots}
            style={{ '--dots-color': '#fff' } as CSSVars}
          />
        </div>
      ) : (
        <span className="text-zinc-100 text-cs85 font-semibold flex-center gap-2">
          تایید و ادامه فرآیند
          <ArrowLeft size={18} color="#fff" />
        </span>
      )}
    </button>
  );
}
