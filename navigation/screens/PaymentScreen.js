import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const { 
    venueName, 
    date, 
    dayFormat,
    eventType, 
    selectedPackage, 
    price, 
    userID, 
    username, 
    paymentStatus,
    bookingID,
  } = route.params;

  const [showWebView, setShowWebView] = useState(false);
  const [approvalUrl, setApprovalUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'Cancel Booking?',
        'Do you want to cancel your booking?',
        [
          {
            text: 'No',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              // Delete booking from the server
              try {
                const response = await fetch('https://eventmobile-server.onrender.com/api/bookings/' + bookingID, {
                  method: 'DELETE',
                });

                const data = await response.json();
                if (data.success) {
                  Alert.alert('Booking Cancelled', 'Your booking has been cancelled.');
                  navigation.navigate('BookingScreen'); // Navigate back to BookingScreen
                } else {
                  Alert.alert('Error', 'Could not cancel booking.');
                }
              } catch (error) {
                console.error(error);
                Alert.alert('Error', 'An error occurred while canceling the booking.');
              }
            },
          },
        ],
        { cancelable: false }
      );
      return true; // Prevent default back action
    };

    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction);
    };
  }, [navigation, bookingID]);

  const handlePayment = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const response = await fetch('https://eventmobile-server.onrender.com/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create PayPal order.');

      if (data.approvalUrl) {
        setApprovalUrl(data.approvalUrl);
        setShowWebView(true);
      } else {
        Alert.alert('Error', 'PayPal approval URL not found.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const onNavigationStateChange = async (navState) => {
    const { url } = navState;
  
    if (url.includes('token') && url.includes('PayerID') && !paymentProcessed) {
      setPaymentProcessed(true); // Prevent duplicate requests
      const urlParams = new URLSearchParams(url.split('?')[1]);
      const token = urlParams.get('token');
      const payerID = urlParams.get('PayerID');
  
      try {
        const response = await fetch('https://eventmobile-server.onrender.com/api/execute-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: token, payerID }),
        });

        const data = await response.json();
        if (response.ok) {
          // Call the payment success API to store details
          await fetch('https://eventmobile-server.onrender.com/api/payment/success', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              venueName,
              date,
              eventType,
              selectedPackage,
              price,
              userID,
              username,
              dayFormat,
              bookingID
            }),
          });

          Alert.alert('Success', 'Payment completed and stored successfully.');
          
          // Redirect to Home screen after successful payment
          navigation.navigate('Home');
        } else {
          Alert.alert('Error', data.error || 'Payment failed.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred while processing the payment.');
      } finally {
        setShowWebView(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* All text content wrapped inside <Text> components */}
      <Text style={styles.detail}>Username: {username}</Text>
      <Text style={styles.detail}>Booking ID: {bookingID}</Text>
      <Text style={styles.detail}>Venue: {venueName}</Text>
      <Text style={styles.detail}>Event Type: {eventType}</Text>
      <Text style={styles.detail}>Date: {new Date(date).toLocaleDateString()}</Text>
      <Text style={styles.detail}>Day Format: {dayFormat}</Text>
      <Text style={styles.detail}>Package: {selectedPackage}</Text>
      <Text style={styles.detail}>Price: ₱ {price}</Text>
      <Text style={styles.detail}>Payment Status: {paymentStatus}</Text>

      {showWebView ? (
        <WebView
          source={{ uri: approvalUrl }}
          onNavigationStateChange={onNavigationStateChange}
        />
      ) : (
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          {isProcessing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.payButtonText}>Pay with PayPal</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#B5C99A' },
  title: { fontSize: 25, fontWeight: 'bold', marginTop: 40, marginBottom: 15, textAlign: 'center' },
  detail: { fontSize: 18, marginVertical: 5, fontWeight: 'bold' },
  payButton: {
    backgroundColor: '#718355',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 180,
    alignSelf: 'center',
  },
  payButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default PaymentScreen;
