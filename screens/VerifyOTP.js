import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the back arrow

const VerifyOTP = ({ route, navigation }) => {
  const { email } = route.params; // Get email from navigation parameters
  const [otp, setOtp] = useState('');

  // After OTP verification is successful
  const handleVerifyOTP = async () => {
    if (otp) {
      try {
        const response = await fetch('https://eventmobile-server.onrender.com/api/verify-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, otp }), // Send email and OTP
        });

        const data = await response.json();
        if (data.success) {
          Alert.alert('Success', 'OTP verified successfully.');
          // Redirect to ResetPassword screen with email
          navigation.navigate('ResetPassword', { email });
        } else {
          Alert.alert('Error', data.message || 'Invalid OTP.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter the OTP.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#718355" />
      </TouchableOpacity>

      <Text style={styles.title}>Verify OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#B5C99A' },
  backButton: { position: 'absolute', top: 40, left: 20, zIndex: 1 }, // Positioned at the top left
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f1f1f1', padding: 15, borderRadius: 10, marginBottom: 15 },
  button: { backgroundColor: '#718355', padding: 15, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#000', fontSize: 16 },
});

export default VerifyOTP;
