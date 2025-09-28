// Importing part
import { GETNotifications, GETPersonalProfile } from './api/get';

// Creating and exporting type of contexts of dashboard pages
export interface NotificationsContext {
  data: GETNotifications;
  refetch?: () => void;
}

export interface PsersonalInfoContext {
  data: GETPersonalProfile;
  refetch?: () => void;
}

export interface CustomerClubPointsContext {
  points: number;
  refetch?: () => void;
}
