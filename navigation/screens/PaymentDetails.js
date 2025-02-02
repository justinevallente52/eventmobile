import React from 'react';
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons'; // Import Ionicons

export default function PaymentDetails({ route, navigation }) {
    const { payment } = route.params || {};

    if (!payment) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Payment details not available.</Text>
            </View>
        );
    }

    const handleCancelBooking = () => {
        Alert.alert(
            'Confirm Cancellation',
            'Are you sure you want to cancel this booking?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel', // This button will not perform any action
                },
                {
                    text: 'Yes',
                    style: 'destructive', // This button will cancel the booking
                    onPress: async () => {
                        try {
                            const response = await fetch(`https://eventmobile-server.onrender.com/api/cancel-booking`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ bookingID: payment.bookingID }),
                            });

                            const data = await response.json();
                            if (data.success) {
                                alert("Booking cancelled successfully!");
                                navigation.goBack(); // Navigate back after successful cancellation
                            } else {
                                alert("Failed to cancel booking.");
                            }
                        } catch (error) {
                            alert("Error canceling booking: " + error.message);
                        }
                    },
                },
            ],
            { cancelable: false } // Prevents closing the dialog when tapping outside of it
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={30} color="#718355" />
            </TouchableOpacity>

            <Text style={styles.title}>Payment Details</Text>
            <Text style={styles.text}>Booking ID: {payment.bookingID}</Text>  
            <Text style={styles.text}>Venue Name: {payment.venueName}</Text>
            <Text style={styles.text}>Date: {new Date(payment.date).toLocaleDateString()}</Text>
            <Text style={styles.text}>Day Format: {payment.dayFormat}</Text>  
            <Text style={styles.text}>Event Type: {payment.eventType}</Text>
            <Text style={styles.text}>Selected Package: {payment.selectedPackage}</Text>
            <Text style={styles.text}>
                Payment Status: {payment.paymentStatus === 'Paid' ? 'Paid' : 'Not Paid'}
            </Text>
            <Text style={styles.text}>Total Price: ${payment.price}</Text>
            {payment.qrcode && (
                <View style={styles.qrCodeContainer}>
                    <Image
                        source={{ uri: payment.qrcode }}
                        style={styles.qrCodeImage}
                    />
                </View>
            )}
            <View style={styles.buttonContainer}>
                <Button title="Cancel Booking" onPress={handleCancelBooking} color="#d9534f" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#B5C99A',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 10,
        zIndex: 1, // Ensure the back button is above other elements
    },
    title: {
        marginTop: 30,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },
    text: {
        fontSize: 16,
        marginBottom: 12,
        color: '#444',
        textAlign: 'left',
    },
    qrCodeContainer: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    qrCodeImage: {
        width: 200,
        height: 200,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        marginBottom: 20,
    },
});
