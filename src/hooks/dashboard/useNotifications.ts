// Importing part
import { notificationContext } from '@/components/dashboard/page';
import { GETNotifications } from '@/types/dashboard/api/get';
import { useContext } from 'react';

// Creating and exporting useNotification custom hook which takes notifications of user which was once fetched while getting inside dashboard pages
// and is passed Via React context
export default function useNotification(): GETNotifications {
  const context = useContext(notificationContext);
  const data: GETNotifications = context ? context : [];

  return data;
}
