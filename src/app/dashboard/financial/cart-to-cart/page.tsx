// Importing part
import CartToCart from '@/components/dashboard/financialCartToCart/section/cartToCart';
import { ReactNode } from 'react';

// Creating and exporting CartToCart financial page as default
export default function CartToCartFinancialPage(): ReactNode {
  // Returning JSX
  return (
    <main className="lg:p-5 lg:pb-5 p-0 pt-[24px] pb-[50px] flex flex-col lg:gap-5 gap-[24px]">
      <CartToCart />
    </main>
  );
}
