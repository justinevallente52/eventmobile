import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PaymentSuccessScreen = ({ route }) => {
    const { qrCode, paymentID } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Payment Successful</Text>
            <Text style={styles.detail}>Payment ID: {paymentID}</Text>
            <Text style={styles.detail}>Scan this QR code at the venue:</Text>
            <Image source={{ uri: qrCode }} style={styles.qrCode} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    detail: { fontSize: 18, marginVertical: 10 },
    qrCode: { width: 200, height: 200, marginTop: 20 },
});

export default PaymentSuccessScreen;
