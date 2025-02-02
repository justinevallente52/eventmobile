import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function ProfileScreen({ route, navigation }) {
    const { username, email, profilePic, phone, userID } = route.params || {};
    const [userInfo, setUserInfo] = useState({
        name: username || 'Username',
        email: email || 'abcdefghijklmn@example.com',
        profilePic: profilePic ? { uri: profilePic } : require('../assets/profile.png'),
    });

    const [isQRCodeVisible, setQRCodeVisible] = useState(false);
    const [payments, setPayments] = useState([]);

    // Update userInfo if new data is passed from navigation
    useEffect(() => {
        if (route.params?.updatedUsername || route.params?.updatedEmail || route.params?.updatedProfilePic) {
            setUserInfo({
                name: route.params.updatedUsername || userInfo.name,
                email: route.params.updatedEmail || userInfo.email,
                profilePic: route.params.updatedProfilePic ? { uri: route.params.updatedProfilePic } : userInfo.profilePic,
            });
        }
    }, [route.params]);

    // Fetch user payments on component mount and refresh every 3-5 seconds
    useEffect(() => {
        if (userID) {
            const fetchPayments = () => {
                fetch(`https://eventmobile-server.onrender.com/api/payments/user?userID=${userID}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setPayments(data.payments || []);
                    })
                    .catch((error) => {
                        console.error('Error fetching payments:', error);
                    });
            };

            // Initial fetch
            fetchPayments();

            // Set interval to refresh payments every 3-5 seconds
            const intervalId = setInterval(fetchPayments, 3000 + Math.random() * 2000); // 3-5 seconds interval

            // Clean up the interval when the component unmounts or userID changes
            return () => clearInterval(intervalId);
        }
    }, [userID]);

    const qrCodeValue = "UserReservation123456"; // This value should represent the user's reservation info

    return (
        <ScrollView style={styles.container}>
            {/* User Info Section */}
            <View style={styles.profileContainer}>
                <Image source={userInfo.profilePic} style={styles.profileImage} />
                <Text style={styles.userName}>{userInfo.name}</Text>
                <Text style={styles.userEmail}>{userInfo.email}</Text>

                {/* Edit Profile and Show QR Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.editProfileButton}
                        onPress={() => navigation.navigate('EditProfile', {
                            username: userInfo.name,
                            email: userInfo.email,
                            profilePic: userInfo.profilePic.uri,
                        })}
                    >
                        <Text style={styles.editProfileButtonText}>Edit Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* QR Code Section */}
            <Text style={styles.yourb}>Your Payments</Text>

            {payments.length > 0 ? (
  payments.map((payment, index) => (
    <TouchableOpacity
      key={index}
      style={styles.bookingItem}
      onPress={() => navigation.navigate('PaymentDetails', { payment })}
    >
      <Text style={styles.bookingName}>{payment.venueName}</Text>
      <Text style={styles.bookingDate}>
        {new Date(payment.date).toLocaleDateString()}
      </Text>
      <Text style={styles.bookingEventType}>Event Type: {payment.eventType}</Text>
      <Text style={styles.bookingDayFormat}>Day Format: {payment.dayFormat}</Text>  
      <Text style={styles.paymentStatus}>
        Payment Status: {payment.paymentStatus === 'Paid' ? 'Paid' : 'Not Paid'}
      </Text>
      <Text style={styles.totalPrice}>Total Price: ${payment.price}</Text>
    </TouchableOpacity>
  ))
) : (
  <Text>No payments found.</Text>
)}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B5C99A',
        padding: 15,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        paddingBottom: 10,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#666',
    },
    yourb: {
        marginTop: 0,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 15,
    },
    editProfileButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#718355',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    editProfileButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    bookingItem: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginBottom: 9,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 1,
    },
    bookingName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bookingDate: {
        color: '#666',
    },
    paymentStatus: {
        color: '#666',
        fontWeight: 'bold',
    },
    totalPrice: {
        fontWeight: 'bold',
    },
});
