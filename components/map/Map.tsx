import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polyline, Region } from 'react-native-maps';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useRef, useState } from 'react';
import { ThemedText } from '../ThemedText';
import { MapComponentProps, SearchResult } from '../../types/map';
import { useLocation } from '../../hooks/useLocation';
import { useMapSearch } from '../../hooks/useMapSearch';
import { SearchBar } from './SearchBar';
import { SearchResultsList } from './SearchResultsList';
import { RouteInfo } from './RouteInfo';
import { MyLocationButton } from './MyLocationButton';
import { getDirections } from '../../services/directions';

export default function Map({ customMapProps }: MapComponentProps): JSX.Element {
  const colorScheme = useColorScheme();
  const mapRef = useRef<MapView | null>(null);
  const { location, errorMsg: locationError } = useLocation();
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    isSearching, 
    errorMsg: searchError 
  } = useMapSearch();
  
  const [selectedLocation, setSelectedLocation] = useState<Region | null>(null);
  const [destination, setDestination] = useState<Region | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<RouteCoordinates>([]);
  const [isRoutingMode, setIsRoutingMode] = useState(false);
  const [routeDistance, setRouteDistance] = useState<string>('');
  const [routeDuration, setRouteDuration] = useState<string>('');

  const initialRegion: Region = location ? {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  } : {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleLocationSelect = async (item: SearchResult) => {
    const selectedRegion = {
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    if (isRoutingMode && location) {
      setDestination(selectedRegion);
      try {
        const route = await getDirections(
          location.coords.latitude,
          location.coords.longitude,
          selectedRegion.latitude,
          selectedRegion.longitude
        );
        setRouteCoordinates(route.coordinates);
        setRouteDistance(route.distance);
        setRouteDuration(route.duration);
      } catch (error) {
        console.error('Error getting directions:', error);
      }
    } else {
      setSelectedLocation(selectedRegion);
    }

    mapRef.current?.animateToRegion(selectedRegion, 1000);
    setSearchQuery(item.display_name);
  };

  const handleMyLocationPress = () => {
    if (location) {
      const userRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      mapRef.current?.animateToRegion(userRegion, 1000);
    }
  };

  const toggleRoutingMode = () => {
    setIsRoutingMode(!isRoutingMode);
    setRouteCoordinates([]);
    setDestination(null);
    setRouteDistance('');
    setRouteDuration('');
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={initialRegion}
        userInterfaceStyle={colorScheme}
        showsUserLocation
        // Remove the showsMyLocationButton prop since we're using a custom button
        {...customMapProps}
      >
        {selectedLocation && !isRoutingMode && (
          <Marker coordinate={selectedLocation} />
        )}
        {destination && (
          <Marker coordinate={destination} pinColor="green" />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={3}
            strokeColor="#2196F3"
          />
        )}
      </MapView>

      {/* Add custom MyLocationButton */}
      <MyLocationButton onPress={handleMyLocationPress} />
      
      <SafeAreaView style={styles.searchContainer} edges={['top']}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={[
              styles.routingButton,
              isRoutingMode && styles.routingButtonActive,
            ]}
            onPress={toggleRoutingMode}
          >
            <ThemedText>
              {isRoutingMode ? 'Cancel Navigation' : 'Get Directions'}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          colorScheme={colorScheme}
          isRoutingMode={isRoutingMode}
        />

        {routeDistance && routeDuration && (
          <RouteInfo distance={routeDistance} duration={routeDuration} />
        )}

        {isSearching && (
          <ThemedText style={styles.searchingText}>Searching...</ThemedText>
        )}

        {(locationError || searchError) && (
          <ThemedText style={styles.errorText}>
            {locationError || searchError}
          </ThemedText>
        )}

        {searchResults.length > 0 && (
          <SearchResultsList
            results={searchResults}
            onSelect={handleLocationSelect}
            colorScheme={colorScheme}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    position: 'absolute',
    width: '90%',
    zIndex: 1,
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  routingButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
  },
  routingButtonActive: {
    backgroundColor: '#2196F3',
  },
  searchingText: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
  },
  errorText: {
    marginTop: 5,
    color: '#ff6b6b',
    textAlign: 'center',
    fontSize: 14,
  },
});