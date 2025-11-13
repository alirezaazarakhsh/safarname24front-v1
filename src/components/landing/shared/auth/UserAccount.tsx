'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useMediaQuery } from '@/hooks';
import PhoneNumber from './molecules/user-account/PhoneNumber';

import useControlBodyOverflow from '@/hooks/useControlBodyOverflow';
import { useUserAccountContext } from '@/context/UserAccountContext';
import OTPVerification from './molecules/user-account/OTPVerification';
import DialogCloseButton from './molecules/user-account/molecules/DialogCloseButton';

type DialogStep = 'phone-number' | 'otp-verification';

// --------------------------------------------

export default function UserAccount() {
  const { isOpen, toggle } = useUserAccountContext();
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [dialogStep, setDialogStep] = useState<DialogStep>('phone-number');
  const [phoneNumber, setPhoneNumber] = useState('');

  // Control Body-Overflow
  useControlBodyOverflow(isOpen);

  return (
    <>
      {/* Dialog */}
      <div
        className={`fixed inset-y-0 z-40 w-full h-dvh bg-white transition-all duration-500 ease-in-out md:bg-black/50 md:left-0 md:duration-300 ${isOpen ? 'visible left-0 md:opacity-100' : 'invisible left-full md:opacity-0'}`}
        onClick={() => isDesktop && toggle()}
      >
        <div
          className={`absolute z-50 bg-white full-size text-zinc-800 grid grid-rows-[auto_1fr] transition-all duration-500 ease-in-out md:w-[26rem] md:h-[25rem] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-2xl md:duration-300 ${isOpen ? 'opacity-100 md:scale-100' : 'opacity-0 md:scale-95'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Dialog-Close-Button */}
          <DialogCloseButton
            dialogStep={dialogStep}
            closeDialog={() => toggle()}
            returnBack={() => setDialogStep('phone-number')}
          />

          {/* Dialog-Logo | Title */}
          <div className="mt-8 flex flex-col items-center gap-1 md:mt-6">
            <div className="relative w-20 aspect-square">
              <Image
                fill
                alt="logo"
                sizes="100%"
                src="/image/logo/red.png"
                className="object-contain"
              />
            </div>

            <h1 className="font-inter font-bold capitalize md:hidden">
              safarname 24 hotel
            </h1>
          </div>

          {/* Dialog-Content */}
          <div className="relative mx-8 mb-8 mt-12 md:mt-2 md:mx-12">
            <AnimatePresence mode="wait">
              {dialogStep === 'phone-number' ? (
                <motion.div
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.1, type: 'tween' },
                  }}
                  key={'phone-number'}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, x: -10 }}
                  className="absolute inset-0"
                >
                  <PhoneNumber
                    setDialogStep={() => setDialogStep('otp-verification')}
                    setPhoneNumber={setPhoneNumber}
                  />
                </motion.div>
              ) : (
                <motion.div
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: { delay: 0.1, type: 'tween' },
                  }}
                  key={'otp-verification'}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  initial={{ opacity: 0, x: 10 }}
                  className="absolute inset-0"
                >
                  <OTPVerification
                    phoneNumber={phoneNumber}
                    setDialogStep={() => setDialogStep('phone-number')}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
