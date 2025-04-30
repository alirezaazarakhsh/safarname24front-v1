// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import YourBankAccout from '../yourBankAccount';
import ManagerBankAccount from '../managerBankAccount';
import Subscription from '../subscription';
import CreditCardsSubmit from '../creditCardsSubmit';
import { CreditCardType } from '@/types/dashboard/component';
import moment from 'jalali-moment';

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
    subscription: {
      chart: [
        { month: 'فروردین', price: 12000 },
        { month: 'اردیبهشت', price: 13500 },
        { month: 'خرداد', price: 15000 },
        { month: 'تیر', price: 12500 },
        { month: 'مرداد', price: 14000 },
        { month: 'شهریور', price: 15500 },
        { month: 'مهر', price: 13000 },
        { month: 'ابان', price: 14500 },
        { month: 'اذر', price: 16000 },
        { month: 'دی', price: 17000 },
        { month: 'بهمن', price: 16500 },
        { month: 'اسفند', price: 17500 },
      ],
      discountCode: 'SAF1HI20R8H',
      endsAt: moment().add(2, 'days').toISOString(),
      price: 42000000,
      type: 'free',
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
];

// Creating and exporting CreditCardsAndSubscription section of cart to cart financial page as default
export default function CreditCardsAndSubscription(): ReactNode {
  // Defining states of component
  const [selectedCreditCard, setSelectedCreditCard] = useState<
    CreditCardType | undefined
  >(creditCards[0]);

  // Returning JSX
  return (
    <section className="grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-5 gap-[20px] lg:px-0 px-[24px]">
      <YourBankAccout
        onChange={(creditCard) => setSelectedCreditCard(creditCard)}
        setSelectedCard={setSelectedCreditCard}
        selectedCard={selectedCreditCard}
        creditCards={creditCards}
      />
      <ManagerBankAccount selectedCreditCard={selectedCreditCard} />
      <Subscription subscription={selectedCreditCard?.subscription} />
      <CreditCardsSubmit selectedCreditCard={selectedCreditCard} />
    </section>
  );
}
