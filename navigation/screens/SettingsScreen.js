import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure to install this package
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local storage of token

export default function SettingsScreen({ navigation }) {
  const [collapsed, setCollapsed] = React.useState({
    about: true,
    privacy: true,
    terms: true,
    contact: true,
    social: true,
    developer: true,
    package: true,
  });

  const [activeSection, setActiveSection] = React.useState(null); // Track the active section

  const toggleSection = (section) => {
    setCollapsed((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
    setActiveSection(activeSection === section ? null : section); // Update the active section
  };

  const handleLogout = async () => {
    try {
      // Remove the token and any relevant user data from storage
      await AsyncStorage.removeItem('userToken'); // Adjust this key based on where you store the token
      navigation.navigate('Login'); // Navigate to the login screen after logout
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={[styles.header, activeSection === 'about' && styles.activeHeader]}
        onPress={() => toggleSection('about')}
      >
        <Icon name="info" size={24} color={activeSection === 'about' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'about' && styles.activeHeaderText]}>About App</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.about}>
        <View style={styles.content}>
          <Text>
            Welcome to the Events Place Management System, your all-in-one solution for planning and booking unforgettable events! Whether you’re organizing a birthday party, wedding, or reunion, our app makes it easy to find the perfect venue that suits your needs. With a user-friendly interface and intuitive navigation, you can explore a variety of venues, compare packages, and book with just a few taps.{"\n\n"}
            Our app is designed to streamline the event planning process, providing you with detailed descriptions and stunning images for each venue. Say goodbye to the stress of planning and hello to seamless event management at your fingertips!
          </Text>
        </View>
      </Collapsible>

      {/* New Package Information Section */}
      <TouchableOpacity
        style={[styles.header, activeSection === 'package' && styles.activeHeader]}
        onPress={() => toggleSection('package')}
      >
        <Icon name="assignment" size={24} color={activeSection === 'package' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'package' && styles.activeHeaderText]}>Package Information</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.package}>
        <View style={styles.content}>
          <Text>
            Event Venue Packages
            We offer three amazing packages for your event: Basic, Standard, and Deluxe. Each package is designed to cater to different needs and preferences, so you can choose the one that fits your event perfectly! {"\n\n"}"Please note that some details may vary depending on the venue owner."
            {"\n\n"}
            {"  "}"BASIC Package"{"\n"}
            Perfect for smaller gatherings, the Basic Package includes:{"\n"}

            • Up to 20 attendees{"\n"}
            • Basic seating arrangements (tables and chairs){"\n"}
            • Access to restrooms and parking space{"\n"}
            • Important Note: Decor and additional services are not included.{"\n"}
            {"\n\n"}
            {"  "}"STANDARD Package"{"\n"}
            Ideal for medium-sized events, the Standard Package offers more features:{"\n"}

            • Up to 30 attendees{"\n"}
            • Standard seating arrangements with tablecloths{"\n"}
            • Sound system for announcements/hosting and background music{"\n"}
            • Access to restrooms and parking space{"\n"}
            • One complimentary beverage per guest{"\n"}
            • Important Note: Customized decor can be arranged for an additional fee.{"\n"}
            {"\n\n"}
            {"  "}"DELUXE Package"{"\n"}
            For those looking for the ultimate experience, the Deluxe Package includes:{"\n"}

            • Up to 50 attendees{"\n"}
            • Elegant seating arrangements with premium decor{"\n"}
            • Advanced sound and lighting system for announcements and entertainment{"\n"}
            • Access to restrooms and parking space{"\n"}
            • Two complimentary beverages per guest{"\n"}
            • Full catering service available (menu to be discussed){"\n"}
            • Important Note: A dedicated event coordinator to assist you throughout your event.{"\n"}
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={[styles.header, activeSection === 'privacy' && styles.activeHeader]}
        onPress={() => toggleSection('privacy')}
      >
        <Icon name="lock" size={24} color={activeSection === 'privacy' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'privacy' && styles.activeHeaderText]}>Privacy Policy</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.privacy}>
        <View style={styles.content}>
          <Text>
            At Events Place Management System, we are committed to protecting your privacy. This policy outlines how we collect, use, and safeguard your personal information when you use our app. {"\n\n"}
            Information We Collect: {"\n"}We may collect personal information, such as your name, email address, and phone number, when you create an account or make a booking. Additionally, we may gather non-personal information through cookies and analytics to enhance your app experience.{"\n\n"}
            How We Use Your Information:{"\n"}Your information is used to process bookings, communicate important updates, and improve our services. We may also use your data to send promotional materials and offers that may interest you, but you can opt-out at any time.{"\n\n"}
            Data Security:{"\n"}We take the security of your personal information seriously. We implement appropriate technical and organizational measures to protect your data from unauthorized access, disclosure, or misuse.{"\n\n"}
            Third-Party Services:{"\n"}We do not sell or share your personal information with third parties without your consent, except as required by law or to provide our services (e.g., payment processing).{"\n\n"}
            Your Rights:{"\n"}You have the right to access, correct, or delete your personal information at any time.{"\n\n"}
            By using our app, you consent to our Privacy Policy. We may update this policy from time to time, and we encourage you to review it periodically.
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={[styles.header, activeSection === 'terms' && styles.activeHeader]}
        onPress={() => toggleSection('terms')}
      >
        <Icon name="description" size={24} color={activeSection === 'terms' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'terms' && styles.activeHeaderText]}>Terms and Conditions</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.terms}>
        <View style={styles.content}>
          <Text>1. Acceptance of Terms{"\n"}
            By using the Events Place Management System app, you agree to these Terms and Conditions. If you do not agree, please do not use the app.{"\n\n"}
            2. User Accounts{"\n"}
            Users must create an account to access certain features of the app. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.{"\n\n"}
            3. Booking and Payment{"\n"}
            All bookings made through the app are subject to availability and must be paid for using the app's payment methods. You agree to provide accurate payment information and understand that charges will be applied as per the chosen booking.{"\n\n"}
            4. Cancellations and Refunds{"\n"}
            Cancellation policies may vary by venue. Please review the specific venue’s cancellation policy during the booking process. Refunds will be processed according to the venue's terms.{"\n\n"}
            5. Limitation of Liability{"\n"}
            The app is provided on an "as-is" basis, and the developers do not guarantee that the app will be error-free. To the maximum extent permitted by law, the developers are not liable for any damages arising from your use of the app.
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={[styles.header, activeSection === 'contact' && styles.activeHeader]}
        onPress={() => toggleSection('contact')}
      >
        <Icon name="phone" size={24} color={activeSection === 'contact' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'contact' && styles.activeHeaderText]}>Contact and Support Information</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.contact}>
        <View style={styles.content}>
          <Text>For support, contact us at support@example.com.</Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={[styles.header, activeSection === 'social' && styles.activeHeader]}
        onPress={() => toggleSection('social')}
      >
        <Icon name="share" size={24} color={activeSection === 'social' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'social' && styles.activeHeaderText]}>Social Media Links</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.social}>
        <View style={styles.content}>
          <Text>Follow us on social media: Facebook, Twitter, Instagram.</Text>
        </View>
      </Collapsible>

      <TouchableOpacity
        style={[styles.header, activeSection === 'developer' && styles.activeHeader]}
        onPress={() => toggleSection('developer')}
      >
        <Icon name="person" size={24} color={activeSection === 'developer' ? '#fff' : '#000'} />
        <Text style={[styles.headerText, activeSection === 'developer' && styles.activeHeaderText]}>Developer</Text>
      </TouchableOpacity>
      <Collapsible collapsed={collapsed.developer}>
        <View style={styles.content}>
          <Text>Developed by GROUP 1.{"\n"}Contact: Group1@example.com.</Text>
        </View>
      </Collapsible>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Logout Section */}
      <View style={styles.logoutSection}>
        <Icon name="logout" size={24} color="#fff" />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B5C99A',
  },
  header: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeHeader: {
    backgroundColor: '#718355',
  },
  headerText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  activeHeaderText: {
    color: '#fff',
  },
  content: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginVertical: 5,
    elevation: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#000',
    marginVertical: 20,
    marginTop:80,
    marginBottom:50,
  },
  logoutSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#718355',
    padding: 15,
    borderRadius: 5,
    width: '80%', // Use a percentage to keep it responsive
    alignSelf: 'center',
    marginBottom: 20, // Space from the bottom
  },
  logoutButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', // Center the text vertically
    paddingVertical: 10, // Add vertical padding for height
    borderRadius: 5, // Rounded corners
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20, // Spacing between the icon and text
  },
});
