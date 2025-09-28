'use client';

import { usePaymentLoading } from '@/context';
import loader from '@/styles/loader.module.css';
import { CSSVars } from '@/types/landing';

// ------------------------------

export function SubmitButton() {
  const { isLoading } = usePaymentLoading();

  return (
    <button
      type="submit"
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
        <span className="text-zinc-100 text-cs85 font-semibold">
          تایید و ادامه فرآیند
        </span>
      )}
    </button>
  );
}
