// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Introduction from '../introduction';
import IconedPrice from '../../financial/iconedPrice';
import CreditCardSelection from '../creditCardSelection';
import Upload from '../upload';
import Emergencies from '../emergencies';

// Creating and exporting CartToCart section of its financial page as default
export default function CartToCart(): ReactNode {
  // Defining hooks of component
  const [selctedCard, setSelectedCard] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();

  // Returning JSX
  return (
    <section className="gap-5 grid grid-cols-3">
      <div className="flex flex-col gap-5 items-start overflow-hidden col-span-2">
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
      <Emergencies previousInfos={{ card: selctedCard, file }} />
    </section>
  );
}
