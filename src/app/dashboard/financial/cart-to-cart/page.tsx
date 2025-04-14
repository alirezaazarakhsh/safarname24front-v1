// Forcing next.js to render this component as client side component
'use client';

// Importing part
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import CreditCardSelection from '@/components/dashboard/financialCartToCart/creditCardSelection';
import Emergencies from '@/components/dashboard/financialCartToCart/emergencies';
import Introduction from '@/components/dashboard/financialCartToCart/introduction';
import Upload from '@/components/dashboard/financialCartToCart/upload';
import { ReactNode, useState } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartoToCartFinancialPage(): ReactNode {
  // Defining hooks of component
  const [selctedCard, setSelectedCard] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();

  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <section className="flex gap-5 items-start">
        <div className="flex flex-col gap-5 items-start w-[70%] h-[474px] overflow-hidden">
          <div className="grid grid-cols-3 gap-5 grid-rows-1 col-span-2 h-fit w-full shrink-0">
            <Introduction />
            <IconedPrice
              icon="Wallet"
              title="موجودی شما"
              price={112459000}
              iconVariant="outline"
            />
          </div>
          <div className="h-[calc(100%-100px)] flex gap-5 w-full">
            <CreditCardSelection onChange={(card) => setSelectedCard(card)} />
            <Upload onChange={(file) => setFile(file)} />
          </div>
        </div>
        <Emergencies
          previousInfos={{
            card: selctedCard,
            file,
          }}
        />
      </section>
    </main>
  );
}
