'use client';

import { HotelActiveSectionProvider } from '@/context/HotelActiveSectionContext';

type Props = Readonly<{
  children: React.ReactNode;
}>;

// ----------------------------

export default function HotelWrapper(props: Props) {
  return (
    <>
      <HotelActiveSectionProvider>{props.children}</HotelActiveSectionProvider>
    </>
  );
}
