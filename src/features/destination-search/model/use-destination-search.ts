import { useState, useRef, useMemo, useEffect } from 'react';
import { Destination, DestinationState } from '../model/types';
import { MOCK_DESTINATIONS } from '../model/constants';
import { useDebounce } from '@/lib/hooks/use-debounce';
import { getStoredCitiesMapping } from './storage';

interface UseDestinationSearchProps {
  value: DestinationState | null;
  onChange: (item: DestinationState | null) => void;
  onClose?: () => void; // برای بستن خودکار مودال/دراور بعد از انتخاب
}

interface UseDestinationSearchProps {
  value: DestinationState | null;
  onChange: (item: DestinationState | null) => void;
  onClose?: () => void;
}

export const useDestinationSearch = ({
  value,
  onChange,
  onClose,
}: UseDestinationSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync state from URL query parameter on initial mount
  useEffect(() => {
    // Only proceed on client side when no destination is currently selected
    if (typeof window === 'undefined' || value !== null) return;

    const searchParams = new URLSearchParams(window.location.search);
    const citySlug = searchParams.get('city')?.toLowerCase().trim();

    if (!citySlug) return;

    // Retrieve cached cities mapping dictionary
    const mapping = getStoredCitiesMapping();
    const matchedCity = mapping[citySlug];

    if (matchedCity) {
      // Hydrate parent state with matching destination details
      onChange({
        slug: matchedCity.slug,
        name: matchedCity.name,
        type: 'city',
      });
    }
  }, []); // Run strictly once on mount

  // Debounced input search term
  const debouncedSearch = useDebounce(searchTerm);
  const isSearching = searchTerm.trim().length > 0;

  // Type-safe filtering across hotels and destinations
  const filteredList = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return MOCK_DESTINATIONS;

    return MOCK_DESTINATIONS.filter((item) => {
      if (item.type === 'city') {
        const matchCity = item.city.toLowerCase().includes(query);
        const matchProvince = item.province.toLowerCase().includes(query);
        return matchCity || matchProvince;
      } else {
        const matchHotel = item.hotel.toLowerCase().includes(query);
        const matchCity = item.city.toLowerCase().includes(query);
        const matchAddress = item.address.toLowerCase().includes(query);
        return matchHotel || matchCity || matchAddress;
      }
    });
  }, [debouncedSearch]);

  // Unified items list for display
  const displayItems = useMemo(() => {
    if (!isSearching) {
      return MOCK_DESTINATIONS.filter((item) => item.type === 'city');
    }
    return filteredList;
  }, [isSearching, filteredList]);

  // Clear search input text
  const handleClearInput = () => {
    setSearchTerm('');
    inputRef.current?.focus();
  };

  // Direct selection handler
  const handleSelectItem = (item: Destination) => {
    const selectedState: DestinationState = {
      slug: item.slug,
      name: item.type === 'city' ? item.city : item.hotel,
      type: item.type,
    };

    onChange(selectedState);
    onClose?.();
  };

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    selectedItem: value,
    inputRef,
    displayItems,
    hasResults: filteredList.length > 0,
    handleClearInput,
    handleSelectItem,
  };
};
