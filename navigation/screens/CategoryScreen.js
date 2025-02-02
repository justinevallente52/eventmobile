import * as React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const categoryVenues = {
  Birthday: [
    { id: '1', name: 'Birthday Venue 1', address: '123 Party St, City', image: require('../assets/bday.jpg'), description: 'A fun-filled venue perfect for kids and adults alike!' },
    { id: '2', name: 'Birthday Venue 2', address: '456 Celebration Ave, City', image: require('../assets/bdayy.jpg'), description: 'An elegant space for unforgettable birthday celebrations!' },
    { id: '3', name: 'Birthday Venue 3', address: '789 Happy Blvd, City', image: require('../assets/bdayyy.jpg'), description: 'A vibrant venue with lots of activities for all ages!' },
    { id: '4', name: 'Birthday Venue 4', address: '101 Fun Rd, City', image: require('../assets/bdayyyy.jpg'), description: 'A spacious area with an outdoor setting for a joyful party!' },
    { id: '5', name: 'Birthday Venue 5', address: '202 Party Central, City', image: require('../assets/bdayyyyy.jpg'), description: 'A charming place to host your next birthday bash!' },
  ],
  Wedding: [
    { id: '1', name: 'Wedding Venue 1', address: '123 Love St, City', image: require('../assets/weds.jpg'), description: 'A romantic venue with stunning views for your big day!' },
    { id: '2', name: 'Wedding Venue 2', address: '456 Romance Ave, City', image: require('../assets/wedss.jpg'), description: 'A beautiful space adorned with flowers and love!' },
    { id: '3', name: 'Wedding Venue 3', address: '789 Bliss Blvd, City', image: require('../assets/wedsss.jpg'), description: 'A perfect setting for a fairy tale wedding!' },
    { id: '4', name: 'Wedding Venue 4', address: '101 Vows Rd, City', image: require('../assets/wedssss.jpg'), description: 'An exquisite venue for a memorable celebration of love!' },
    { id: '5', name: 'Wedding Venue 5', address: '202 Union Central, City', image: require('../assets/wedsssss.jpg'), description: 'A unique venue for couples looking to tie the knot in style!' },
  ],
  Party: [
    { id: '1', name: 'Party Venue 1', address: '123 Party Lane, City', image: require('../assets/party.jpg'), description: 'A lively place for unforgettable parties!' },
    { id: '2', name: 'Party Venue 2', address: '456 Dance Ave, City', image: require('../assets/partyy.jpg'), description: 'Dance the night away in this vibrant venue!' },
    { id: '3', name: 'Party Venue 3', address: '789 Celebrate Blvd, City', image: require('../assets/partyyy.jpg'), description: 'The perfect venue for all types of celebrations!' },
    { id: '4', name: 'Party Venue 4', address: '101 Groove St, City', image: require('../assets/partyyyy.jpg'), description: 'A modern venue with a fantastic atmosphere for parties!' },
    { id: '5', name: 'Party Venue 5', address: '202 Fun Central, City', image: require('../assets/partyyyyy.jpg'), description: 'A fun venue designed for a night to remember!' },
  ],
  Pool: [
    { id: '1', name: 'Pool Venue 1', address: '123 Splash St, City', image: require('../assets/pool.jpg'), description: 'A refreshing venue ideal for pool parties!' },
    { id: '2', name: 'Pool Venue 2', address: '456 Swim Ave, City', image: require('../assets/poollll.jpg'), description: 'Enjoy the sun and fun in this fabulous pool venue!' },
    { id: '3', name: 'Pool Venue 3', address: '789 Dive Blvd, City', image: require('../assets/poolllll.jpg'), description: 'A perfect place for summer parties by the pool!' },
    { id: '4', name: 'Pool Venue 4', address: '101 Water Rd, City', image: require('../assets/poolllll.jpg'), description: 'An exciting venue for unforgettable water-themed events!' },
    { id: '5', name: 'Pool Venue 5', address: '202 Aqua Central, City', image: require('../assets/poool.jpg'), description: 'A beautiful space for relaxation and celebration by the water!' },
],

};

const CategoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { category } = route.params || {}; // Default to an empty object if params is undefined

  // Check if category is defined and is a string
  const categoryName = typeof category === 'string' ? category : category ? category.label : 'Unknown Category'; // Adjust based on your data

  // Fetch the venues based on the selected category
  const venues = categoryVenues[categoryName] || []; // Ensure venues is an array

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Best Places for {categoryName}</Text>
      <FlatList
        data={venues}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('VenueDetail', { venue: item })}>
            <View style={styles.venueContainer}>
              <Image source={item.image} style={styles.venueImage} />
              <View style={styles.textContainer}>
                <Text style={styles.venueName}>{item.name}</Text>
                <Text style={styles.venueAddress}>{item.address}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5C99A',
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    top: 30,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    margin: 15,
    paddingHorizontal: 10,
  },
  venueContainer: {
    marginBottom: 20,
  },
  venueImage: {
    width: '100%',
    height: 300,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    padding: 10,
  },
  venueName: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  venueAddress: {
    fontSize: 14,
    color: '#fff',
  },
});

export default CategoryScreen;

