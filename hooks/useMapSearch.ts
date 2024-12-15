import { useState, useEffect } from 'react';
import { SearchResult } from '../types/map';

export const useMapSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const searchLocations = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`,
        {
          headers: {
            'User-Agent': 'ExpoMapApp/1.0',
            'Accept': 'application/json'
          }
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching locations:', error);
      setSearchResults([]);
      setErrorMsg('Failed to search locations. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) searchLocations(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    isSearching,
    errorMsg,
  };
};