// Importing part
import { customerClubPointsContext } from '@/components/dashboard/page';
import { CustomerClubPointsContext } from '@/types/dashboard/context';
import { useContext } from 'react';

// Creating and exporting useCustomerClubPoints custom hook which takes points of user which was once fetched while getting inside dashboard pages
// and is passed Via React context
export default function useCustomerClubPoints(): CustomerClubPointsContext {
  const context = useContext(customerClubPointsContext);
  const data: CustomerClubPointsContext = context
    ? context
    : {
        points: 0,
        refetch: () => console.error('Customer Club Points error'),
      };

  return data;
}
