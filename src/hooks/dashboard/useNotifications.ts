// Importing part
import { notificationContext } from '@/components/dashboard/page';
import { NotificationsContext } from '@/types/dashboard/context';
import { useContext } from 'react';

// Creating and exporting useNotification custom hook which takes notifications of user which was once fetched while getting inside dashboard pages
// and is passed Via React context
export default function useNotification(): NotificationsContext {
  const context = useContext(notificationContext);
  const data: NotificationsContext = context
    ? context
    : {
        data: [],
        refetch: () => console.error('Notification error'),
      };

  return data;
}
