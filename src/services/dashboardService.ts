import { apiClient } from './apiClient';

export interface PassengerType {
  id?: string | number;
  first_name?: string;
  last_name?: string;
  national_code?: string;
  [key: string]: unknown;
}

export interface TicketType {
  id?: string | number;
  title?: string;
  status?: string;
  [key: string]: unknown;
}

export interface FinancialReportType {
  id?: string | number;
  amount?: number;
  date?: string;
  [key: string]: unknown;
}

export interface FavoriteItemType {
  id?: string | number;
  title?: string;
  [key: string]: unknown;
}

/**
 * Service handling all API calls for the Dashboard section.
 */
export const dashboardService = {
  /** Get user profile details */
  async getProfile() {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  /** Update user profile */
  async updateProfile(data: Record<string, unknown>) {
    const response = await apiClient.put('/user/profile', data);
    return response.data;
  },

  /** Get user passengers list */
  async getPassengers(): Promise<PassengerType[]> {
    const response = await apiClient.get('/user/passengers');
    return response.data;
  },

  /** Add a new passenger */
  async addPassenger(passenger: Omit<PassengerType, 'id'>) {
    const response = await apiClient.post('/user/passengers', passenger);
    return response.data;
  },

  /** Get tickets list */
  async getTickets(): Promise<TicketType[]> {
    const response = await apiClient.get('/user/tickets');
    return response.data;
  },

  /** Get financial report */
  async getFinancialReport(): Promise<FinancialReportType[]> {
    const response = await apiClient.get('/user/financial-reports');
    return response.data;
  },

  /** Get user favorites */
  async getFavorites(): Promise<FavoriteItemType[]> {
    const response = await apiClient.get('/user/favorites');
    return response.data;
  },
};
