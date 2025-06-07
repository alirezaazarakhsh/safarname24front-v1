// Importing part

import { userFetchedInfoContext } from '@/components/dashboard/page';
import { GETPersonalProfileItem } from '@/types/dashboard/api/get';
import { useContext } from 'react';

// Creating and exporting useUserInfo custom hook which takes info of user which was once fetched while getting inside dashboard pages
// Via React context
export default function useUserInfo(): GETPersonalProfileItem {
  const context = useContext(userFetchedInfoContext);
  const data: GETPersonalProfileItem = context
    ? context[0]
    : {
        address: '',
        email: '',
        first_name: '',
        image: '',
        last_name: '',
        level: 0,
        national_code: '',
        postal_code: '',
      };

  return data;
}
