'use client';

import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAuthModal } from '@/features/auth/model/auth-modal-context';

// ---------------------------------

export function LoginTrigger() {
  const { openAuthModal } = useAuthModal();

  return (
    <Button onClick={openAuthModal} className={'sm:px-5'}>
      <LogIn />
      <span>ورود</span>
    </Button>
  );
}
