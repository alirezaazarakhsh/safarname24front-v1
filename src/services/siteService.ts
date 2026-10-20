import { apiClient } from './apiClient';

/**
 * Service handling all API calls for the Main Site / Landing pages.
 */
export const siteService = {
  /** Search hotels by city or query */
  async searchHotels(params: { city?: string; checkIn?: string; checkOut?: string; guests?: number }) {
    const response = await apiClient.get('/hotels/search', { params });
    return response.data;
  },

  /** Get best selling hotels for homepage */
  async getBestSellingHotels() {
    const response = await apiClient.get('/hotels/best-selling');
    return response.data;
  },

  /** Get customer reviews */
  async getCustomerReviews() {
    const response = await apiClient.get('/reviews');
    return response.data;
  },
};
