// Forcing next.js to render this component as client side component
'use client';

// Importing part
import { ReactNode, useState } from 'react';
import Introduction from '../introduction';
import IconedPrice from '../../financial/iconedPrice';
import CreditCardSelection from '../creditCardSelection';
import Emergencies from '../emergencies';
import Upload from '../../upload/upload';
import useUserWalletBalance from '@/hooks/dashboard/useUserWalletBalance';

// Creating and exporting CartToCart section of its financial page as default
export default function CartToCart(): ReactNode {
  // Defining hooks of component
  const [selctedCard, setSelectedCard] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();
  const wallet = useUserWalletBalance();

  // Returning JSX
  return (
    <section className='lg:px-0 px-[24px]'>
      <div className='gap-5 lg:grid hidden grid-cols-3'>
        <div className='lg:flex hidden flex-col gap-5 items-start h-[474px] overflow-hidden col-span-2'>
          <div className='grid grid-cols-3 gap-5 grid-rows-1 col-span-2 h-fit w-full shrink-0'>
            <Introduction />
            <IconedPrice
              icon='Wallet'
              title='موجودی شما'
              price={wallet.balance}
              iconVariant='outline'
            />
          </div>
          <div className='h-[calc(100%-100px)] flex flex-row gap-5 w-full'>
            <CreditCardSelection onChange={(card) => setSelectedCard(card)} />
            <Upload
              onChange={(file) => setFile(file)}
              fetchURL='/juridical-profile-documents/'
            />
          </div>
        </div>
        <Emergencies previousInfos={{ card: selctedCard, file }} />
      </div>
      <div className='lg:hidden flex flex-col gap-[20px]'>
        <IconedPrice
          icon='Wallet'
          title='موجودی شما'
          price={112459000}
          iconVariant='outline'
        />
        <Emergencies previousInfos={{ card: selctedCard, file }} />
        <CreditCardSelection onChange={(card) => setSelectedCard(card)} />
        <Upload onChange={(file) => setFile(file)} />
      </div>
    </section>
  );
}
