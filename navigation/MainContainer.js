import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import BirthdayVenueScreen from './screens/BirthdayVenueScreen';
import PartyVenueScreen from './screens/PartyVenueScreen';
import PoolVenueScreen from './screens/PoolVenueScreen';
import WeddingVenueScreen from './screens/WeddingVenueScreen';
import BookingScreen from './screens/BookingScreen';
import PaypalPaymentScreen from './screens/PaypalPaymentScreen';
import BookingDetails from './screens/BookingDetails';
import PaymentScreen from './screens/PaymentScreen';

// Screen names
const homeName = 'Home';
const profileName = 'Profile';
const settingsName = 'Settings';

const Tab = createBottomTabNavigator();

export default function MainContainer({ route }) {
  const { userID, username, email, profilePic, qrcode, bookingID, token } = route.params || {}; // Destructure userID and token here

  return (
    <Tab.Navigator
      initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === profileName) {
            iconName = focused ? 'list' : 'list-outline';
          } else if (rn === settingsName) {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#718355',
        tabBarInactiveTintColor: '#000',
        tabBarLabelStyle: {
          paddingBottom: 1,
          fontSize: 10,
        },
        tabBarStyle: {
          display: 'flex',
          height: 50,
          
        },
      })}
      
    >
      <Tab.Screen 
        name={homeName} 
        component={HomeScreen} 
        initialParams={{ userID, username, token }} // Passing token to HomeScreen
      />
      <Tab.Screen 
        name="BirthdayVenue" 
        component={BirthdayVenueScreen} 
        options={{ tabBarButton: () => null }} 
      />
      <Tab.Screen 
        name="PartyVenue" 
        component={PartyVenueScreen} 
        options={{ tabBarButton: () => null }} 
      />
      <Tab.Screen 
        name="PoolVenue" 
        component={PoolVenueScreen} 
        options={{ tabBarButton: () => null }} 
      />
      <Tab.Screen 
        name="WeddingVenue" 
        component={WeddingVenueScreen} 
        options={{ tabBarButton: () => null }} 
      />
      <Tab.Screen 
        name="PaypalPaymentScreen" 
        component={PaypalPaymentScreen} 
        options={{ tabBarButton: () => null }} 
        initialParams={{ userID, username, bookingID }}
      />
      <Tab.Screen
        name="BookingScreen"
        component={BookingScreen}
        initialParams={{ userID, username }} // Passing userID and username
        options={{ tabBarButton: () => null }} // Hides from Tab Bar
      />
      <Tab.Screen
        name="BookingDetails"
        component={BookingDetails}
        options={{
          tabBarButton: () => null, // Hides it from the Tab bar
          headerShown: false,       // Hides the header
        }}
      />
      <Tab.Screen
        name={profileName}
        component={ProfileScreen}
        initialParams={{ userID, username, email, profilePic, qrcode, token }} // Pass token along with other data
      />
      <Tab.Screen 
        name={settingsName} 
        component={SettingsScreen} 
        initialParams={{ token }} // Passing token to SettingsScreen
      />
    </Tab.Navigator>
  );
}
