// Forcning Next.js to render this component as client side component
'use client';

// Importing part
import EmergencieForm, {
  formType,
} from '@/components/dashboard/financialCartToCart/emergencieForm';
import SelectMode from '@/components/dashboard/financialCartToCart/selectMode';
import UserCreditCard from '@/components/dashboard/financialCartToCart/userCreditCard';
import CartBalance from '@/components/dashboard/profile/cartBalance';
import Upload from '@/components/dashboard/upload/upload';
import useUserInfo from '@/hooks/dashboard/useUserInfo';
import { CartToCartFinancialMode } from '@/types/dashboard/component';
import { JSX, useState } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): JSX.Element {
  // Defining hooks
  const [mode, setMode] = useState<CartToCartFinancialMode>('custom');
  const [file, setFile] = useState<File | undefined>(undefined);
  const userInfo = useUserInfo();
  const [emergeniceFormValue, setEmergencieFormValue] = useState<
    formType | undefined
  >();
  const [selectedCreditCard, setSelectedCreditCard] = useState(
    userInfo.card_numbers[0] ? userInfo.card_numbers[0] : undefined,
  );

  // Returning JSX
  return (
    <main className="p-5 lg:pb-5 pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <SelectMode
        value={mode}
        onValueChange={setMode}
        submitDisabled={false}
        onSubmit={() => {
          console.log({
            mode,
            file,
            selectedCreditCard,
            emergeniceFormValue,
          });
        }}
      />
      <div className="grid grid-cols-3 lg:gap-5 gap-[24px]">
        <UserCreditCard
          data={userInfo.card_numbers}
          onValueChange={setSelectedCreditCard}
        />
        <div className="flex items-center justify-between flex-col lg:gap-5 gap-[24px]">
          <CartBalance hasMobileView className="shrink-0 w-full" />
          <div className="w-full h-full">
            <Upload
              onChange={(data) => setFile(data)}
              className="lg:w-full w-full h-full"
            />
          </div>
        </div>
        <EmergencieForm onChange={setEmergencieFormValue} />
      </div>
    </main>
  );
}
