import React from 'react';
import { useAuthModal } from '../model/auth-modal-context';
import { Button } from '@/components/ui/button';

export const OtpCountdown: React.FC = () => {
  const { timer, isTimerActive, handleResendOtp, isSubmitting } =
    useAuthModal();

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex text-xs">
      {isTimerActive ? (
        <span className="text-muted-foreground flex items-center gap-2 font-medium">
          <span>تا ارسال مجدد کد </span>

          <span className="text-foreground bg-secondary flex-center w-13 rounded-md p-1 font-semibold">
            {formatTime(timer)}
          </span>
        </span>
      ) : (
        <Button
          size="xs"
          type="button"
          variant="link"
          className={'p-0'}
          onClick={handleResendOtp}
          disabled={isSubmitting}
        >
          ارسال مجدد کد تایید
        </Button>
      )}
    </div>
  );
};
