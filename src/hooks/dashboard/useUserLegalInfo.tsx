// Importing part
import { legalProfileInfoContext } from '@/components/dashboard/page';
import { LegalUserInfoContext } from '@/types/dashboard/context';
import { useContext } from 'react';

// Creating and exporting useUserLegalInfo custom hook which takes info of legal profile of user which was once fetched while getting inside dashboard pages
// Via React context
export default function useUserLegalInfo(): LegalUserInfoContext {
  const context = useContext(legalProfileInfoContext);
  const data: LegalUserInfoContext = context
    ? context
    : {
        refetch: () => {},
        data: {
          documents: null,
          address: '',
          card_numbers: [],
          economical_code: '',
          email: '',
          image: '',
          national_id: '',
          organization_name: '',
          phone_number: '',
          postal_code: '',
          registeration_number: '',
          reject_reason: '',
          status: 'rejected',
        },
      };

  return data;
}
