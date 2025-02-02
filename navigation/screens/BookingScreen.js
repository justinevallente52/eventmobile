import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';

const BookingScreen = ({ route, navigation }) => {
  const { venue, eventType, userID, username, venueName, venuePrice } = route.params;

  const [bookingDate, setBookingDate] = useState(new Date());
  const [dayFormat, setDayFormat] = useState('Day'); // Updated state for dayFormat
  const [userDetails, setUserDetails] = useState(username || '');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState('Standard');
  const [totalPrice, setTotalPrice] = useState(venuePrice);

  const packagePrices = {
    Standard: 2000,
    Deluxe: 6500,
    Premium: 10000,
  };

  const handlePackageChange = (itemValue) => {
    setSelectedPackage(itemValue);
    setTotalPrice(venuePrice + packagePrices[itemValue]);
  };

  const handleBooking = async () => {
    if (!userDetails) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
  
    const bookingData = {
      venueID: venue._id,
      eventType,
      userID,
      userName: userDetails,
      bookingDate: bookingDate.toISOString(),
      dayFormat, // Updated field
      venueName,
      venuePrice,
      package: selectedPackage,
      totalPrice,
      paymentStatus: 'Not Paid',
    };
  
    try {
      const response = await fetch('https://eventmobile-server.onrender.com/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
  
      const data = await response.json();
      if (data.success) {
        const { bookingID } = data;
  
        Alert.alert(
          'Booking Confirmed',
          `Booking ID: ${bookingID}\nSuccessfully booked ${venueName} (${venuePrice} PHP) for a ${eventType} event on ${bookingDate.toLocaleDateString()} with the ${dayFormat} format and ${selectedPackage} package. Total Price: ${totalPrice} PHP. \n\nPayment Status: Not Paid`
        );
  
        navigation.navigate('PaymentScreen', {
          userID,
          username,
          venueName,
          date: bookingDate.toISOString(),
          dayFormat, // Updated field
          eventType,
          selectedPackage,
          paymentStatus: 'Not Paid',
          price: totalPrice,
          bookingID,
        });
      } else {
        Alert.alert('Booking Failed', data.message); // Show failure message from backend
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Booking Failed', 'There was an error with your booking.');
    }
  };
  


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Book Your {eventType} Event</Text>
      <View style={styles.venueDetailsContainer}>
        <Text style={styles.venueInfo}>
          <Text style={styles.venueLabel}>Venue: </Text>
          <Text style={styles.venueName}>{venueName}</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={userDetails}
          onChangeText={setUserDetails}
        />

        <Text style={styles.venueInfo}>
          <Text style={styles.venueLabel}>Price: </Text>
          <Text style={styles.venuePrice}>{venuePrice} PHP</Text>
        </Text>
      </View>

      <View style={styles.packageContainer}>
        <Text style={styles.packageLabel}>Select Package</Text>
        <Picker
          selectedValue={selectedPackage}
          onValueChange={handlePackageChange}
          style={styles.picker}
        >
          <Picker.Item label="Standard Package" value="Standard" />
          <Picker.Item label="Deluxe Package" value="Deluxe" />
          <Picker.Item label="Premium Package" value="Premium" />
        </Picker>
      </View>

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateTimeButton}>
        <Text style={styles.dateTimeText}>
          Select Date: {bookingDate.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setBookingDate(date);
          }}
        />
      )}

      <View style={styles.packageContainer}>
        <Text style={styles.packageLabel}>Select Time Format</Text>
        <Picker
          selectedValue={dayFormat}
          onValueChange={(itemValue) => setDayFormat(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Day" value="Day" />
          <Picker.Item label="Night" value="Night" />
          <Picker.Item label="Whole Day" value="Whole Day" />
          <Picker.Item label="Overnight" value="Overnight" />
        </Picker>
      </View>

      <Text style={styles.totalPriceText}>Total Price: {totalPrice} PHP</Text>

      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#B5C99A', // Matching palette
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  dateTimeButton: {
    marginTop: 5,
    padding: 15,
    marginBottom: 5,
    backgroundColor: '#718355', // Accent color
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#fff',
  },
  input: {
    marginTop: 5,
    height: 50,
    borderColor: '#718355',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    color: '#333',
    fontSize: 16,
    marginBottom: 5,
  },
  bookButton: {
    padding: 15,
    backgroundColor: '#4A7C59',
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  bookButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  venueInfo: {
    marginVertical: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F8F8F8', // Light gray for subtle contrast
    borderWidth: 1,
    borderColor: '#718355',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  venueLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A7C59',
  },
  venueName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark gray for text emphasis
  },
  venuePrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B22222', // Highlighted price in dark red
  },
  packageContainer: {
    marginVertical: 3,
  },
  packageLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A7C59',
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#718355',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B22222', // Highlight total price
    textAlign: 'center',
    marginVertical: 15,
  },
});

export default BookingScreen;
