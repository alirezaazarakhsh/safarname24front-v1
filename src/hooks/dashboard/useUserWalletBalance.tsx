// Importing part
import { userWalletBalanceContext } from '@/components/dashboard/page';
import { GETWalletBalance } from '@/types/dashboard/api/get';
import { useContext } from 'react';

// Creating and exporting useUserWalletBalance custom hook which takes info of user wallet balance which was once fetched while getting inside dashboard pages
// Via React context
export default function useUserWalletBalance(): GETWalletBalance {
  const context = useContext(userWalletBalanceContext);
  const data: GETWalletBalance = context
    ? context
    : {
        balance: 0,
      };

  return data;
}
