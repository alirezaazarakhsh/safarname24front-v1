import React, { useCallback } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { AuthFormValues } from '../model/types';
import { useAuthModal } from '../model/auth-modal-context';
import { useWebOtp } from '@/lib/hooks/use-web-otp';
import { OtpCountdown } from './otp-countdown';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export const OtpStep: React.FC = () => {
  const { control, setValue, handleSubmit } = useFormContext<AuthFormValues>();
  const { step, autoSubmitOtp, handleOtpSubmit } = useAuthModal();

  // Handle incoming SMS code from WebOTP API
  const handleWebOtpReceived = useCallback(
    (code: string) => {
      setValue('otp', code, { shouldValidate: true });
      if (autoSubmitOtp) {
        handleOtpSubmit(code);
      }
    },
    [setValue, autoSubmitOtp, handleOtpSubmit],
  );

  // Hook into native WebOTP
  useWebOtp({
    enabled: step === 'otp',
    onOtpReceived: handleWebOtpReceived,
  });

  return (
    <div dir="ltr" className="flex items-center justify-between gap-4">
      <Controller
        name="otp"

        control={control}
        render={({ field }) => (
          <InputOTP
            maxLength={4}
            id="digits-only"
            inputMode="numeric"
            value={field.value}
            onChange={(val) => {
              field.onChange(val);
              // Auto-submit when complete (if enabled)
              if (autoSubmitOtp && val.length === 4) {
                handleSubmit((data) => handleOtpSubmit(data.otp))();
              }
            }}
            autoFocus
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        )}
      />

      <OtpCountdown />
    </div>
  );
};
