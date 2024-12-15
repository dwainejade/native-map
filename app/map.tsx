import { View } from 'react-native';
import { Stack } from 'expo-router';
import Map from '@/components/map/Map';

export default function MapScreen(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Map',
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
      <Map />
    </View>
  );
}