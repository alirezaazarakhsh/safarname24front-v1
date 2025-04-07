// Importing part
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import Emergencies from '@/components/dashboard/financialCartToCart/emergencies';
import Introduction from '@/components/dashboard/financialCartToCart/introduction';
import { ReactNode } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartoToCartFinancialPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <div className="grid grid-cols-3 gap-5 grid-rows-3">
        <div className="grid grid-cols-3 gap-5 grid-rows-1 col-span-2 row-span-1 h-fit">
          <Introduction />
          <IconedPrice
            icon="Wallet"
            title="موجودی شما"
            price={112459000}
            iconVariant="outline"
          />
        </div>
        <Emergencies />
      </div>
    </main>
  );
}
