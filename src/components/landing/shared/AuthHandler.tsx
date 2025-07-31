// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { useUserAccountContext } from '@/context/UserAccountContext';
import { useSearchParams } from 'next/navigation';
import Cookies from 'js-cookie';
import { ReactNode, useEffect } from 'react';

// Exporting AuthHandler component which checks if url includes auth_open as search params
// And do auth things
export default function AuthHandler(): ReactNode {
  // Defining hooks
  const searchParams = useSearchParams();
  const authOpen = searchParams.get('auth_open') || 'false';
  const { isOpen, toggle } = useUserAccountContext();
  const authVal = Cookies.get('auth');

  // Using useEffect to open auth dialog if search param exists and its value is true
  useEffect(() => {
    if (authOpen === 'true' && !isOpen && !authVal) {
      toggle();
    }
  }, [authOpen, isOpen, toggle, authVal]);

  // Returning no react node
  return false;
}
