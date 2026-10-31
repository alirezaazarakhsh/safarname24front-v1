import React, { useEffect } from 'react';
import { useForm, FormProvider, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { AuthFormValues } from '../model/types';
import { useAuthModal } from '../model/auth-modal-context';
import { useWebOtp } from '@/lib/hooks/use-web-otp';
import { OtpCountdown } from './otp-countdown';

import { useMediaQuery } from '@/lib/hooks/use-media-query';
import { isValidIranianMobile, normalizeIranianMobile } from '../model/utils';

import { AuthHeader } from './auth-header';
import { PhoneStep } from './phone-step';
import { OtpStep } from './otp-step';
import { AuthFooter } from './auth-footer';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Drawer, DrawerContent } from '@/components/ui/drawer';
import { otpStepSchema, phoneStepSchema } from '../model/schema';

export const AuthModal: React.FC = () => {
  const { isOpen, closeAuthModal, step, handlePhoneSubmit, handleOtpSubmit } =
    useAuthModal();

  const isDesktop = useMediaQuery('(min-width: 640px)');

  // Explicitly typed active schema for the current step
  const activeSchema = step === 'phone' ? phoneStepSchema : otpStepSchema;

  const methods = useForm<AuthFormValues>({
    // Explicitly enforce Resolver<AuthFormValues> to prevent fallback to FieldValues
    resolver: zodResolver(activeSchema) as Resolver<AuthFormValues>,
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
      otp: '',
    },
  });

  // Re-evaluate form validation immediately when step changes
  useEffect(() => {
    methods.trigger();
  }, [step, methods]);

  const onSubmit = (data: AuthFormValues) => {
    if (step === 'phone') {
      // Normalize number (+98 / 9... -> 09...) right before calling context handler
      const normalizedPhone = normalizeIranianMobile(data.phoneNumber);
      handlePhoneSubmit(normalizedPhone);
    } else {
      if (!data.otp || data.otp.length !== 4) return;
      handleOtpSubmit(data.otp);
    }
  };

  // Fixed container layout with reactive content slots
  const modalContent = (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="p-4 pt-6 sm:p-0"
      >
        <AuthHeader />

        <div className="my-8">
          {step === 'phone' ? <PhoneStep /> : <OtpStep />}
        </div>

        <AuthFooter />
      </form>
    </FormProvider>
  );

  // Desktop render -> Dialog
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeAuthModal()}>
        <DialogContent className={'p-7'}>{modalContent}</DialogContent>
      </Dialog>
    );
  }

  // Mobile render -> Bottom Sheet
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && closeAuthModal()}>
      <DrawerContent>{modalContent}</DrawerContent>
    </Drawer>
  );
};
