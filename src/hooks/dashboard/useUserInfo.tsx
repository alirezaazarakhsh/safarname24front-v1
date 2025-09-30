// Importing part
import { userFetchedInfoContext } from '@/components/dashboard/page';
import { GETPersonalProfile } from '@/types/dashboard/api/get';
import { useContext } from 'react';

// Creating and exporting useUserInfo custom hook which takes info of user which was once fetched while getting inside dashboard pages
// Via React context
export default function useUserInfo(): GETPersonalProfile {
  const context = useContext(userFetchedInfoContext);
  const data: GETPersonalProfile = context
    ? context.data
    : {
        level_name: '',
        address: '',
        email: '',
        first_name: '',
        image: '',
        last_name: '',
        level: 0,
        national_code: '',
        postal_code: '',
        phone_number: '',
        card_numbers: [
          {
            account_holder_name: 'Unknown',
            card_number: '',
            iban: '',
            id: 1,
          },
        ],
      };

  return data;
}
