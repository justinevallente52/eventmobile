import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput, BackHandler, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Images
import birthday from '../assets/birthday.jpg'; 
import wedding from '../assets/wedding.jpg'; 
import party from '../assets/party.jpg'; 
import pool from '../assets/pool.jpg'; 

const HomeScreen = () => {
  const navigation = useNavigation();
  const [birthdayVenues, setBirthdayVenues] = useState([]);
  const [partyVenues, setPartyVenues] = useState([]);
  const [poolVenues, setPoolVenues] = useState([]);
  const [weddingVenues, setWeddingVenues] = useState([]); // State for wedding venues
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBirthdayVenues = async () => {
      try {
        const response = await fetch("https://eventmobile-server.onrender.com/api/venues/birthday");
        const data = await response.json();
        if (data.success) {
          setBirthdayVenues(data.venues);
        } else {
          console.error('Failed to fetch birthday venues');
        }
      } catch (error) {
        console.error('Error fetching birthday venues:', error);
      }
    };

    const fetchPartyVenues = async () => {
      try {
        const response = await fetch("https://eventmobile-server.onrender.com/api/venues/party");
        const data = await response.json();
        if (data.success) {
          setPartyVenues(data.venues);
        } else {
          console.error('Failed to fetch party venues');
        }
      } catch (error) {
        console.error('Error fetching party venues:', error);
      }
    };

    const fetchPoolVenues = async () => {
      try {
        const response = await fetch("https://eventmobile-server.onrender.com/api/venues/pool");
        const data = await response.json();
        if (data.success) {
          setPoolVenues(data.venues);
        } else {
          console.error('Failed to fetch pool venues');
        }
      } catch (error) {
        console.error('Error fetching pool venues:', error);
      }
    };

    const fetchWeddingVenues = async () => {
      try {
        const response = await fetch("https://eventmobile-server.onrender.com/api/venues/wedding");
        const data = await response.json();
        if (data.success) {
          setWeddingVenues(data.venues);
        } else {
          console.error('Failed to fetch wedding venues');
        }
      } catch (error) {
        console.error('Error fetching wedding venues:', error);
      }
    };

    fetchBirthdayVenues();
    fetchPartyVenues();
    fetchPoolVenues();
    fetchWeddingVenues(); // Fetch wedding venues

    const backAction = () => {
      if (navigation.isFocused()) {
        // Only allow back action on HomeScreen
        Alert.alert(
          "Are you sure?",
          "Do you want to logout?",
          [
            {
              text: "No",
              onPress: () => null, // Do nothing, stay on HomeScreen
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: () => navigation.navigate('Login'), // Navigate to LoginScreen
            },
          ]
        );
        return true; // Prevent default back action
      }
      return false; // Allow default back action for other screens
    };

    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [navigation]);

  const renderVenue = (item) => (
    <TouchableOpacity
      style={styles.venueItem}
      onPress={() => navigation.navigate('BookingScreen', {
        venue: item,
        eventType: item.eventType,
        venueName: item.venueName,
        venuePrice: item.venuePrice,
      })}
    >
      <Image source={{ uri: item.venuePicture }} style={styles.venueImage} />
      <Text style={styles.venueLabel}>{item.venueName}</Text>
    </TouchableOpacity>
  );

  const mergeVenues = () => {
    return [
      ...birthdayVenues.map((venue) => ({ ...venue, eventType: 'Birthday' })),
      ...partyVenues.map((venue) => ({ ...venue, eventType: 'Party' })),
      ...poolVenues.map((venue) => ({ ...venue, eventType: 'Pool' })),
      ...weddingVenues.map((venue) => ({ ...venue, eventType: 'Wedding' })), // Include wedding venues
    ];
  };

  const filteredVenues = mergeVenues().filter(venue =>
    venue.venueName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search Venues"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      {/* Recommended Venues Section */}
      <Text style={styles.subTitle}>Recommended Venues</Text>
      <FlatList
        data={filteredVenues}
        horizontal={true}
        keyExtractor={(item) => item.venueID}
        renderItem={({ item }) => renderVenue(item)}
        showsHorizontalScrollIndicator={false}
      />

      {/* Explore More Categories Section */}
      <Text style={styles.subTitle}>Explore More Categories</Text>
      <FlatList
        data={[ 
          { id: '1', image: birthday, screen: 'BirthdayVenue', label: 'Birthday' },
          { id: '2', image: party, screen: 'PartyVenue', label: 'Party' },
          { id: '3', image: pool, screen: 'PoolVenue', label: 'Pool' },
          { id: '4', image: wedding, screen: 'WeddingVenue', label: 'Wedding' },
        ]}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.imageWithTextContainer}>
              <Image source={item.image} style={styles.clickableImage} />
              <View style={styles.overlayTextContainer}>
                <Text style={styles.overlayText}>{item.label}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#B5C99A', padding: 10 },
  subTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  searchInput: {
    height: 40,
    borderColor: '#718355',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
  },
  venueItem: { marginRight: 10, alignItems: 'center' },
  venueImage: { width: 160, height: 100, borderRadius: 10, borderWidth: 2, borderColor: '#718355' },
  venueLabel: { marginTop: 5, textAlign: 'center', fontWeight: 'bold' },
  gridItem: { flex: 1, alignItems: 'center', marginBottom: 10 },
  clickableImage: { width: 160, height: 100, borderRadius: 10, borderWidth: 2, borderColor: '#718355' },
  imageWithTextContainer: { position: 'relative' },
  overlayTextContainer: {
    position: 'absolute', textAlign: 'center', top: '50%', left: '50%',
    transform: [{ translateX: -40 }, { translateY: -10 }],
    backgroundColor: 'rgba(0, 0, 0, 0.3)', paddingVertical: 5, borderRadius: 5
  },
  overlayText: { fontSize: 18, color: '#fff', textAlign: 'center' },
});

export default HomeScreen;
