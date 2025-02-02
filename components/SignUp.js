import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert, 
  ActivityIndicator, 
  Keyboard, 
  TouchableWithoutFeedback 
} from 'react-native';
import logo from '../assets/logotrans.png';

const BASE_URL = 'https://eventmobile-server.onrender.com';

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPasswordValid, setPasswordValid] = useState(true);

  const handleSignUp = async () => {
    // Basic Validation
    if (!email || !username || !phoneNumber || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailValid(false);
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }
    setEmailValid(true);

    if (password.length < 6) {
      setPasswordValid(false);
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }
    setPasswordValid(true);

    // Set loading state
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, phoneNumber, password }),
      });

      const data = await response.json();

      if (response.status === 201) {
        Alert.alert('Success', 'User registered successfully');
        const { userID } = data; // Get userID from the response
        // Optionally, store userID in AsyncStorage or navigate accordingly
        setEmail('');
        setUsername('');
        setPhoneNumber('');
        setPassword('');
        navigation.navigate('Login');
      } else if (response.status === 409) {
        // Handle the case where the email is already in use
        Alert.alert('Error', 'This email is already registered. Please use a different email.');
      } else if (response.status === 400) {
        Alert.alert('Validation Error', data.error || 'Check the provided data');
      } else {
        Alert.alert('Error', data.error || 'Failed to register');
      }
    } catch (error) {
      if (error.message.includes('Network request failed')) {
        Alert.alert('Network Error', 'Please check your internet connection');
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>Create Account</Text>

        <TextInput
          style={[styles.input, !isEmailValid && styles.inputError]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[styles.input, !isPasswordValid && styles.inputError]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <TextInput
          style={[styles.input, !isPasswordValid && styles.inputError]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#B5C99A',
  },
  logo: {
    width: 350,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  inputInvalid: {
    borderColor: 'red',
  },
  button: {
    backgroundColor: '#718355',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  switchText: {
    color: '#06402B',
    textAlign: 'center',
    marginTop: 20,
  },
  link: {
    marginTop: 10,
    color: '#06402B',
    textAlign: 'center'
  },
});
export default SignUp;
