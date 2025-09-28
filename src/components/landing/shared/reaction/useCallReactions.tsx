'use client';

import { openDrawer } from './Drawer';
import { useMediaQuery } from '@/hooks';
import { showCustomToast } from '@/components/landing/shared/toast';

type ReactionProps = {
  title: string;
  description?: string;
  type: 'success' | 'error';
};

// -----------------------------

export function useCallReactions() {
  const isDesktop = useMediaQuery('(min-width: 640px)');

  const callReaction = ({ title, description, type }: ReactionProps) => {
    if (isDesktop) {
      showCustomToast({ title, subtitle: description ?? '', type });
    } else {
      openDrawer({ title, subtitle: description ?? '', type });
    }
  };

  return callReaction;
}
