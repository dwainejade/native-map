import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface MyLocationButtonProps {
  onPress: () => void;
}

export const MyLocationButton = ({ onPress }: MyLocationButtonProps) => {
  return (
    <TouchableOpacity 
      style={styles.button}
      onPress={onPress}
    >
      <MaterialIcons name="my-location" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    // Position it above the bottom navigation
    bottom: 100,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});