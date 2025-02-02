import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

const venues = [
  {
    id: '1',
    name: 'Venue 1',
    address: '123 Street, City',
    description: 'A beautiful place for all your events.',
    packages: [
      { id: '1', label: 'Basic Package', price: 100 },
      { id: '2', label: 'Premium Package', price: 200 },
      { id: '3', label: 'Deluxe Package', price: 300 },
    ],
    image: { uri: 'https://example.com/venue1.jpg' },
  },
  {
    id: '2',
    name: 'Venue 2',
    address: '456 Avenue, City',
    description: 'An elegant place for weddings.',
    packages: [
      { id: '1', label: 'Standard Package', price: 150 },
      { id: '2', label: 'Luxury Package', price: 250 },
    ],
    image: { uri: 'https://example.com/venue2.jpg' },
  },
  // Add more venues as needed
];

const VenueListScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('VenueDetail', { venueData: item })}>
      <Text style={styles.venueName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={venues}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  venueName: {
    fontSize: 18,
    marginVertical: 10,
    color: 'blue',
  },
});

export default VenueListScreen;
