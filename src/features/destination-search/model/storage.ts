import { CitiesMapping } from './types';
import { INITIAL_CITIES_MAPPING } from './cities-mapping';

const STORAGE_KEY = 'app_cities_mapping';
const CACHE_VERSION = 1;
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;

interface CachedPayload {
  version: number;
  expiry: number;
  data: CitiesMapping;
}

// // Safely retrieves mapping from storage with expiration check
// export const getStoredCitiesMapping = (): CitiesMapping => {
//   if (typeof window === 'undefined') return INITIAL_CITIES_MAPPING;

//   try {
//     const raw = localStorage.getItem(STORAGE_KEY);
//     if (!raw) return INITIAL_CITIES_MAPPING;

//     const payload: CachedPayload = JSON.parse(raw);

//     // Verify cache expiration and schema version
//     if (Date.now() > payload.expiry || payload.version !== CACHE_VERSION) {
//       localStorage.removeItem(STORAGE_KEY);
//       return INITIAL_CITIES_MAPPING;
//     }

//     return payload.data;
//   } catch (error) {
//     // Fallback if parsing fails or storage is inaccessible
//     return INITIAL_CITIES_MAPPING;
//   }
// };

// Safely saves fetched mapping to local storage
export const setStoredCitiesMapping = (data: CitiesMapping): void => {
  if (typeof window === 'undefined') return;

  try {
    const payload: CachedPayload = {
      version: CACHE_VERSION,
      expiry: Date.now() + ONE_WEEK_MS,
      data,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    // Silently handle quota exceeded or privacy mode errors
  }
};

// storage.ts
export const getStoredCitiesMapping = (): CitiesMapping => {
  if (typeof window === 'undefined') return INITIAL_CITIES_MAPPING;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    // If storage is empty, initialize it automatically with mock data
    if (!raw) {
      setStoredCitiesMapping(INITIAL_CITIES_MAPPING);
      return INITIAL_CITIES_MAPPING;
    }

    const payload: CachedPayload = JSON.parse(raw);

    // Check expiration or version mismatch
    if (Date.now() > payload.expiry || payload.version !== CACHE_VERSION) {
      // Refresh cache with fresh mock data
      setStoredCitiesMapping(INITIAL_CITIES_MAPPING);
      return INITIAL_CITIES_MAPPING;
    }

    return payload.data;
  } catch (error) {
    // Return fallback data on storage access errors
    return INITIAL_CITIES_MAPPING;
  }
};
