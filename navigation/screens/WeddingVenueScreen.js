// WeddingVenueScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WeddingVenueScreen = () => {
  const [venues, setVenues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVenues, setFilteredVenues] = useState([]);
  const navigation = useNavigation();
  const [likedVenues, setLikedVenues] = useState(new Set());

  useEffect(() => {
    const fetchWeddingVenues = async () => {
      try {
        const response = await fetch("https://eventmobile-server.onrender.com/api/venues/wedding");
        const data = await response.json();
        if (data.success) {
          setVenues(data.venues);
          setFilteredVenues(data.venues); 
        } else {
          console.error('Failed to fetch wedding venues');
        }
      } catch (error) {
        console.error('Error fetching wedding venues:', error);
      }
    };

    fetchWeddingVenues();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredVenues(venues);
    } else {
      const filtered = venues.filter((venue) =>
        venue.venueName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVenues(filtered);
    }
  }, [searchQuery, venues]);

  const toggleLike = (venueID) => {
    setLikedVenues((prev) => {
      const updated = new Set(prev);
      if (updated.has(venueID)) {
        updated.delete(venueID);
      } else {
        updated.add(venueID);
      }
      return updated;
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#718355" />
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search venues..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <ScrollView contentContainerStyle={styles.venuesContainer}>
        {filteredVenues.length === 0 ? (
          <Text>No Wedding venues found</Text>
        ) : (
           filteredVenues.map((venue) => (
            <Animated.View key={venue.venueID} style={styles.venueCard}>
              <TouchableOpacity
              onPress={() =>
                navigation.navigate('BookingScreen', {
                  venue: venue,               // Pass the entire venue object
                  eventType: "Wedding",      // Event type
                  venueName: venue.venueName, // Venue name
                  venuePrice: venue.venuePrice, // Venue price
                })
              }
            >
              {venue.venuePicture && (
                <View style={styles.imageWrapper}>
                  <Image style={styles.venueImage} source={{ uri: venue.venuePicture }} />
                  <View style={styles.gradientOverlay} />
                </View>
              )}
              <Text style={styles.venueName}>{venue.venueName}</Text>
              <Text style={styles.venueLocation}>{venue.venueLocation}</Text>
              <Text numberOfLines={2} style={styles.venueDetails}>
                {venue.venueDetails}
              </Text>
            </TouchableOpacity>

              
            </Animated.View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B5C99A',
  },
  backButton: {
    position: 'absolute',
    top: 25,
    left: 15,
    zIndex: 1,
  },
  searchInput: {
    height: 40,
    borderColor: '#718355',
    borderWidth: 3,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 10,
    marginLeft: 40,
  },
  venuesContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  venueCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    position: 'relative',
  },
  imageWrapper: {
    position: 'relative',
  },
  venueImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
  },
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  venueLocation: {
    fontSize: 16,
    color: '#666',
  },
  venueDetails: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  likeButton: {
    position: 'absolute',
    top: 1,
    right: 1,
  },
});

export default WeddingVenueScreen;
