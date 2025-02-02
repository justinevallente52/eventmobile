import React, { useState } from 'react'; 
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Function to update the user profile in the database
const updateUserProfile = async (profileData) => {
    try {
        const response = await fetch('https://eventmobile-server.onrender.com/api/user/update', {
            method: 'PUT', // Use PUT for updating
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData), // Send the profileData object
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to update profile');
        }

        return data; // Return updated user data
    } catch (error) {
        console.error('Error updating user:', error);
        throw error; // Rethrow error for handling in the calling function
    }
};

export default function EditProfileScreen({ navigation, route }) {
    const { username, email, profilePic } = route.params; // Get current username, email, and profile picture
    const [newUsername, setNewUsername] = useState(username || '');
    const [newEmail, setNewEmail] = useState(email || '');
    const [phone, setPhone] = useState(''); // New state for phone number
    const [newProfilePic, setNewProfilePic] = useState(profilePic || null);

    // Function to handle picking a new profile picture
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setNewProfilePic(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        const profileData = {
            currentEmail: email, // Use the current email from route params
        };

        // Add fields only if they have changed
        if (newUsername !== username) profileData.username = newUsername;
        if (newEmail !== email) profileData.newEmail = newEmail; // Only include new email if it's different
        if (phone) profileData.phoneNumber = phone; // Only include if phone is provided
        if (newProfilePic) profileData.profilePic = newProfilePic;

        try {
            // Update the profile using the helper function
            const updatedUser = await updateUserProfile(profileData);

            // If successful, navigate back to Profile screen with updated data
            Alert.alert('Success', 'Profile updated successfully!');
            navigation.navigate('Profile', {
                updatedUsername: updatedUser.username || newUsername,
                updatedEmail: updatedUser.email || newEmail,
                updatedPhone: phone,
                updatedProfilePic: newProfilePic,
            });
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>

            {/* Profile Picture Section */}
            <TouchableOpacity onPress={pickImage}>
                <Image 
                    source={newProfilePic ? { uri: newProfilePic } : require('../assets/profile.png')} 
                    style={styles.profileImage} 
                />
                <Text style={styles.changePicText}>Change Profile Picture</Text>
            </TouchableOpacity>

            {/* Current Username Input */}
            <TextInput
                placeholder="Current Username"
                value={username}
                editable={false} // Prevent editing of current username
                style={styles.input}
            />

            {/* New Username Input */}
            <TextInput
                placeholder="New Username (optional)"
                value={newUsername}
                onChangeText={setNewUsername}
                style={styles.input}
            />

            {/* Current Email Input */}
            <TextInput
                placeholder="Current Email"
                value={email}
                editable={false} // Prevent editing of current email
                style={styles.input}
            />

            {/* New Email Input */}
            <TextInput
                placeholder="New Email (optional)"
                value={newEmail}
                onChangeText={setNewEmail}
                style={styles.input}
            />

            {/* Phone Input */}
            <TextInput
                placeholder="New Phone Number (optional)"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad" // Set keyboard type for phone number
            />

            {/* Save Button */}
            <TouchableOpacity 
                style={styles.saveButton} 
                onPress={handleSave} // Use the handleSave function
            >
                <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#B5C99A',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 30,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 20,
    },
    changePicText: {
        textAlign: 'center',
        color: '#06402B',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#718355',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    saveButton: {
        backgroundColor: '#718355',  // Button background color
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#000',  // Text color for the button
        fontSize: 16,
        fontWeight: 'bold',
    },
});
