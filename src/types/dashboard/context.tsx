// Importing part
import { GETNotifications } from './api/get';

// Creating and exporting type of contexts of dashboard pages
export interface NotificationsContext {
  data: GETNotifications;
  refetch?: () => void;
}
