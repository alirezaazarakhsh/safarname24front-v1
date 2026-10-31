import React from 'react';
import { useAuthModal } from '../model/auth-modal-context';
import { useFormContext } from 'react-hook-form';
import { AuthFormValues } from '../model/types';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { normalizeIranianMobile } from '../model/utils';
import { cn } from 'cn';

export const AuthHeader: React.FC = () => {
  const { step, handleBack } = useAuthModal();
  const { watch } = useFormContext<AuthFormValues>();
  const phoneNumber = normalizeIranianMobile(watch('phoneNumber'));

  const isOtpStep = step === 'otp';

  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-2.5">
        {isOtpStep && (
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            className={'rounded-lg'}
            onClick={handleBack}
          >
            <ArrowRight />
          </Button>
        )}

        <span className="text-foreground text-base font-semibold tracking-tight">
          {!isOtpStep ? 'ورود یا ثبت‌نام' : 'تایید شماره موبایل'}
        </span>
      </div>

      <p className="text-sm font-medium">
        {!isOtpStep
          ? 'برای ورود یا ثبت‌نام، شماره همراه خود را وارد کنید.'
          : `کد تایید ارسال شده به شماره ${phoneNumber || ''} را وارد کنید.`}
      </p>

      {isOtpStep && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-muted-foreground text-sm font-medium">
            شماره موبایل اشتباه است ?
          </p>

          <Button
            size="xs"
            type="button"
            variant="secondary"
            className={'w-fit rounded-lg p-4'}
            onClick={handleBack}
          >
            ویرایش شماره همراه
          </Button>
        </div>
      )}
    </div>
  );
};
