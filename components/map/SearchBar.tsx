import { StyleSheet, TextInput, View } from 'react-native';
import { SearchBarProps } from '../../types/map';

export const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  colorScheme,
  isRoutingMode 
}: SearchBarProps) => (
  <TextInput
    style={[
      styles.searchInput,
      { 
        backgroundColor: colorScheme === 'dark' ? '#333' : '#fff',
        color: colorScheme === 'dark' ? '#fff' : '#000' 
      },
    ]}
    placeholder={isRoutingMode ? "Enter destination..." : "Search location..."}
    placeholderTextColor={colorScheme === 'dark' ? '#999' : '#666'}
    value={searchQuery}
    onChangeText={onSearchChange}
  />
);

const styles = StyleSheet.create({
  searchInput: {
    height: 44,
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});