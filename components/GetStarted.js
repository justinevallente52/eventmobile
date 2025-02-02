import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import logo from '../assets/logopngg.png';

const GetStarted = ({ navigation }) => {
  return (
    <ImageBackground
      source={{ uri: 'https://your-image-url.com/background.jpg' }} // Make sure this URL is valid
      style={styles.container}
    >
      <View style={styles.overlay} />
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>
        Transform your events into unforgettable experiences! With our Events Place App, planning is just a tap away.
      </Text>
      {/* Login Button */}
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Login')}
        accessible={true}
        accessibilityLabel="Login"
        accessibilityHint="Navigates to the Login screen"
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* SignUp Button */}
      <TouchableOpacity 
        style={[styles.button, styles.signupButton]} 
        onPress={() => navigation.navigate('SignUp')}
        accessible={true}
        accessibilityLabel="Sign Up"
        accessibilityHint="Navigates to the Sign Up screen"
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#B5C99A', // Adjust the overlay color as needed
    opacity: 0.7, // Optional: Adjust opacity for better text visibility
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#000000',
    marginVertical: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#718355',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  signupButton: {
    backgroundColor: '#f0ad4e', // Different color for SignUp button
    marginTop: 10, // Add space between buttons
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
});

export default GetStarted;
