// Importing part
import IconedPrice from '@/components/dashboard/financial/iconedPrice';
import Introduction from '@/components/dashboard/financialCartToCart/introduction';
import { ReactNode } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartoToCartFinancialPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <div className="grid grid-cols-3 gap-5">
        <div className="grid grid-cols-3 gap-5 col-span-2">
          <Introduction />
          <IconedPrice icon="Wallet" title="موجودی شما" price={112459000} />
        </div>
      </div>
    </main>
  );
}
