// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import YourBankAccout from '../yourBankAccount';
import ManagerBankAccount from '../managerBankAccount';
import Subscription from '../subscription';
import CreditCardsSubmit from '../creditCardsSubmit';
import { CreditCardType } from '@/types/dashboard/component';

// Defining fake credit cards data to render
const creditCards: CreditCardType[] = [
  {
    owner: 'علی رضایی',
    number: {
      shaba: '820540102680020817909002',
      card: '6037997512345678',
    },
    name: {
      english: 'Mellat Bank',
      persian: 'بانک ملت',
    },
  },
  {
    owner: 'سارا محمدی',
    number: {
      shaba: '580170000000109802515001',
      card: '5892101234567890',
    },
    name: {
      english: 'Saman Bank',
      persian: 'بانک سامان',
    },
  },
  {
    owner: 'حسین کریمی',
    number: {
      shaba: '320570000000202041056008',
      card: '6274123456789012',
    },
    name: {
      english: 'Parsian Bank',
      persian: 'بانک پارسیان',
    },
  },
];

// Creating and exporting CreditCardsAndSubscription section of cart to cart financial page as default
export default function CreditCardsAndSubscription(): ReactNode {
  // Defining states of component
  const [selectedCreditCard, setSelectedCreditCard] = useState<
    CreditCardType | undefined
  >(creditCards[0]);

  // Returning JSX
  return (
    <section className="grid grid-cols-3 grid-rows-2 gap-5">
      <YourBankAccout
        onChange={(creditCard) => setSelectedCreditCard(creditCard)}
        setSelectedCard={setSelectedCreditCard}
        selectedCard={selectedCreditCard}
        creditCards={creditCards}
      />
      <ManagerBankAccount selectedCreditCard={selectedCreditCard} />
      <Subscription />
      <CreditCardsSubmit selectedCreditCard={selectedCreditCard} />
    </section>
  );
}
