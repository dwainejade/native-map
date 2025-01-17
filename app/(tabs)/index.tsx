import { View } from 'react-native';
import { Stack } from 'expo-router';
import Map from '@/components/map/Map';

export default function HomeScreen(): JSX.Element {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: 'Home',
          headerTransparent: true,
          headerBlurEffect: 'regular',
        }}
      />
      <Map />
    </View>
  );
}