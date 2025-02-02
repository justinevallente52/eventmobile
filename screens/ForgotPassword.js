import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendOTP = async () => {
    if (email) {
      try {
        const response = await fetch('https://eventmobile-server.onrender.com/api/forgot-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (data.success) {
          Alert.alert('Success', 'OTP sent to your email.');
          navigation.navigate('VerifyOTP', { email });
        } else {
          Alert.alert('Error', data.message || 'Failed to send OTP.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid email address.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#718355" />
      </TouchableOpacity>

      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
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

export default ForgotPassword;
