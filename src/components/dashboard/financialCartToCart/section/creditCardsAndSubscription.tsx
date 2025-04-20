// Importing part
import { ReactNode } from 'react';
import YourBankAccout from '../yourBankAccount';
import ManagerBankAccount from '../managerBankAccount';
import Subscription from '../subscription';

// Creating and exporting CreditCardsAndSubscription section of cart to cart financial page as default
export default function CreditCardsAndSubscription(): ReactNode {
  // Returning JSX
  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-5">
      <YourBankAccout />
      <ManagerBankAccount />
      <Subscription />
      <div className="bg-red-600 row-span-1 col-span-1" />
    </section>
  );
}
