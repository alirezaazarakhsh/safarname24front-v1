import { useEffect } from 'react';

interface UseWebOtpOptions {
  enabled: boolean;
  onOtpReceived: (otp: string) => void;
}

/**
 * Listens for SMS OTP messages using the WebOTP API on supported mobile browsers.
 */
export const useWebOtp = ({
  enabled,
  onOtpReceived,
}: UseWebOtpOptions): void => {
  useEffect(() => {
    if (
      !enabled ||
      typeof window === 'undefined' ||
      !('OTPCredential' in window)
    ) {
      return;
    }

    const ac = new AbortController();

    navigator.credentials
      .get({
        otp: { transport: ['sms'] },
        signal: ac.signal,
      } as CredentialRequestOptions)
      .then((otpCredential) => {
        if (otpCredential && 'code' in otpCredential) {
          const code = (otpCredential as { code: string }).code;
          onOtpReceived(code);
        }
      })
      .catch((err) => {
        // AbortError is normal when the component unmounts or step changes
        if (err.name !== 'AbortError') {
          console.warn('WebOTP error:', err);
        }
      });

    return () => {
      ac.abort();
    };
  }, [enabled, onOtpReceived]);
};
