import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

const VenueDetailScreen = ({ route }) => {
  const { venue } = route.params;
  const navigation = useNavigation();

  const [selectedPackage, setSelectedPackage] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const packages = [
    { id: '1', label: 'Basic Package', price: 10000 },
    { id: '2', label: 'Standard Package', price: 20000 },
    { id: '3', label: 'Premium Package', price: 30000 },
  ];

  const handleBook = () => {
    const selectedPrice = selectedPackage ? packages.find(pkg => pkg.label === selectedPackage).price : 0;

    navigation.navigate('PaymentScreen', {
      venueName: venue.name,
      venueAddress: venue.address,
      venueImage: venue.image,
      selectedPackage: selectedPackage,
      date: date.toISOString(),
      time: time.toISOString(),
      price: selectedPrice,
    });
  };


  return (
    <ScrollView style={styles.container}>
      <Image source={venue.image} style={styles.image} />
      <Text style={styles.name}>{venue.name}</Text>
      <Text style={styles.address}>{venue.address}</Text>
      <Text style={styles.description}>{venue.description}</Text>

     {/* More Images Section */}
<Text style={styles.subTitle}>More Images</Text>
<ScrollView horizontal showsHorizontalScrollIndicator={false}>
  {venue.additionalImages && venue.additionalImages.length > 0 ? (
    venue.additionalImages.map((image, index) => (
      <Image key={index} source={image} style={styles.additionalImage} resizeMode="cover" />
    ))
  ) : (
    <Text style={styles.nothingText}>Nothing to show</Text>
  )}
</ScrollView>



      <Text style={styles.label}>Select Package:</Text>
      <Picker
        selectedValue={selectedPackage}
        onValueChange={(itemValue) => setSelectedPackage(itemValue)}
      >
        {packages.map((pkg) => (
          <Picker.Item key={pkg.id} label={pkg.label} value={pkg.label} />
        ))}
      </Picker>

      <Text style={styles.price}>
        Price: ₱{selectedPackage ? packages.find(pkg => pkg.label === selectedPackage).price : 0}
      </Text>

      {/* Date and Time Pickers */}
      <View style={styles.dateTimeContainer}>
        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateTimeText}>Pick Date: {date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || date;
              setShowDatePicker(false);
              setDate(currentDate);
            }}
          />
        )}

        <TouchableOpacity style={styles.dateTimeButton} onPress={() => setShowTimePicker(true)}>
          <Text style={styles.dateTimeText}>Pick Time: {time.toLocaleTimeString()}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              const currentTime = selectedTime || time;
              setShowTimePicker(false);
              setTime(currentTime);
            }}
          />
        )}
      </View>

      {/* Book Now Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
        <Text style={styles.bookButtonText}>Book Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    backgroundColor: '#B5C99A',
  },
  image: {
    width: '100%',
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },
  address: {
    fontSize: 15,
    marginVertical: 5,
    alignSelf: 'center',
  },
  description: {
    fontSize: 14,
    marginVertical: 5,
    color: '#555',
    padding: 10,
  },
  label: {
    fontSize: 16,
  },
  price: {
    fontSize: 20,
    marginVertical: 5,
    left: 240,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    flexWrap: 'wrap',
  },
  dateTimeButton: {
    width: '48%', // Each button takes up almost half the width
    marginVertical: 5,
  },
  dateTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#718355',
    color: '#000',
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#718355',
    paddingVertical: 10,
    width: 150,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    alignSelf: 'center',
    marginBottom: 30,
  },
  bookButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
  },
  additionalImage: {
    width: 100,
    height: 75,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 30,
  },
  nothingText: {
  fontSize: 16,
  color: '#555',
  padding: 15,
  bottom: 20,
  left: 5,
  alignSelf: 'center',
},

});

export default VenueDetailScreen;
