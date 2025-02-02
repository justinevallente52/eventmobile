import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const ResetPassword = ({ route, navigation }) => {
  const { email } = route.params; // Get email from navigation params
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    if (newPassword) {
      try {
        const response = await fetch('https://eventmobile-server.onrender.com/api/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, newPassword }), // Send email and new password
        });

        const data = await response.json();
        if (data.success) {
          Alert.alert('Success', 'Password reset successfully.');
          // Redirect to Login or any other screen
          navigation.navigate('Login');
        } else {
          Alert.alert('Error', data.message || 'Failed to reset password.');
        }
      } catch (error) {
        Alert.alert('Error', 'An error occurred. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please enter a new password.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={30} color="#718355" />
      </TouchableOpacity>

      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
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

export default ResetPassword;
