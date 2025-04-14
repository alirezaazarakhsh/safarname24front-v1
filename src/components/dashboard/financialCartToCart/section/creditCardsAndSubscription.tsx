// Importing part
import { ReactNode } from 'react';

// Creating and exporting CreditCardsAndSubscription section of cart to cart financial page as default
export default function CreditCardsAndSubscription(): ReactNode {
  // Returning JSX
  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-5 h-[500px]">
      <div className="bg-red-600 row-span-2 col-span-1" />
      <div className="bg-red-600 row-span-2 col-span-1" />
      <div className="bg-red-600 row-span-1 col-span-1" />
      <div className="bg-red-600 row-span-1 col-span-1" />
    </section>
  );
}
