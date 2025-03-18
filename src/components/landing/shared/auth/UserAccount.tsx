'use client';

import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import PhoneNumber from './molecules/user-account/PhoneNumber';
import OTPVerification from './molecules/user-account/OTPVerification';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';

type DialogStep = 'phone-number' | 'otp-verification';

type Props = {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

// --------------------------------------------

export default function UserAccount(props: Props) {
  const { isOpen, setOpen } = props;
  const [dialogStep, setDialogStep] = useState<DialogStep>('phone-number');

  // Reset dialogStep when dialog is closed
  useEffect(() => {
    if (!isOpen) setTimeout(() => setDialogStep('phone-number'), 300);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="max-w-[22rem] h-[22rem] text-cs75 font-semibold p-7 pb-6 flex flex-col items-center gap-0 overflow-hidden">
        <DialogTitle className="hidden"></DialogTitle>
        <DialogDescription className="hidden"></DialogDescription>

        {/* Close-Button */}
        <DialogClose className="absolute top-6 left-6 w-8 h-8 bg-zinc-100/80 flex-center group rounded-lg transition-colors duration-300 ease-in-out hover:bg-zinc-200/50">
          <IoClose size={20} className="text-zinc-400" />
        </DialogClose>

        {/* Dialog-Logo */}
        <div className="bg-cs-red w-[3.7rem] h-[3.7rem] p-2 flex-center overflow-hidden rounded-xl">
          <Image
            alt="logo"
            width={200}
            height={200}
            src={'/image/logo/white.webp'}
            className="w-full aspect-auto"
          />
        </div>

        {/* Dialog-Content */}
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
              className="absolute inset-x-0 bottom-6 flex-1"
            >
              <PhoneNumber
                setDialogStep={() => setDialogStep('otp-verification')}
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
              className="absolute inset-x-0 bottom-6 flex-1"
            >
              <OTPVerification
                setDialogStep={() => setDialogStep('phone-number')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
