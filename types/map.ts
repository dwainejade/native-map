// src/types/map.ts

import { MapViewProps } from 'react-native-maps';
import { LocationObject } from 'expo-location';

// Main Map Component Props
export interface MapComponentProps {
  customMapProps?: Partial<MapViewProps>;
}

// Search Related Types
export interface SearchResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

// Route Related Types
export type RouteCoordinates = {
  latitude: number;
  longitude: number;
}[];

// Component Props Types
export interface RouteInfoProps {
  distance: string;
  duration: string;
}

export interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  colorScheme: string;
  isRoutingMode: boolean;
}

export interface SearchResultsListProps {
  results: SearchResult[];
  onSelect: (item: SearchResult) => void;
  colorScheme: string;
}

// Hook Return Types
export interface UseLocationResult {
  location: LocationObject | null;
  errorMsg: string | null;
}

export interface UseMapSearchResult {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults: SearchResult[];
  isSearching: boolean;
  errorMsg: string | null;
}

// Service Types
export interface DirectionsResult {
  coordinates: RouteCoordinates;
  distance: string;
  duration: string;
}