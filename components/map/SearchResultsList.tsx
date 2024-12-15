import { FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SearchResultsListProps } from '../../types/map';

export const SearchResultsList = ({ 
  results, 
  onSelect, 
  colorScheme 
}: SearchResultsListProps) => (
  <FlatList
    data={results}
    style={[
      styles.searchResults,
      { backgroundColor: colorScheme === 'dark' ? '#333' : '#fff' }
    ]}
    keyExtractor={(item) => item.place_id.toString()}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={styles.resultItem}
        onPress={() => onSelect(item)}
      >
        <ThemedText numberOfLines={2}>{item.display_name}</ThemedText>
      </TouchableOpacity>
    )}
  />
);

const styles = StyleSheet.create({
  searchResults: {
    marginTop: 5,
    borderRadius: 8,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});