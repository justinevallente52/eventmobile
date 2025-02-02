import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaypalPaymentScreen = ({ route }) => {
  const { bookingID, userID, username } = route.params; // Accessing the passed parameters

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Payment Details</Text>
      <Text>Booking ID: {bookingID}</Text>
      <Text>User ID: {userID}</Text>
      <Text>Username: {username}</Text>
      {/* You can add payment-related logic and UI here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PaypalPaymentScreen;
