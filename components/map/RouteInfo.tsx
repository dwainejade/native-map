import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { RouteInfoProps } from '../../types/map';

export const RouteInfo = ({ distance, duration }: RouteInfoProps) => (
  <View 
  style={styles.routeInfo}
  >
    <ThemedText>Distance: {distance}</ThemedText>
    <ThemedText>Duration: {duration}</ThemedText>
  </View>
);

const styles = StyleSheet.create({
  routeInfo: {
    // marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // borderRadius: 8,
    // flexDirection: 'row',
    justifyContent: 'space-around',
  },
});