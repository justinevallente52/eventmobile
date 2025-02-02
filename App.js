import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import GetStarted from './components/GetStarted';
import SignUp from './components/SignUp';
import Login from './components/Login';
import ForgotPassword from './screens/ForgotPassword';
import VerifyOTP from './screens/VerifyOTP';
import ResetPassword from './screens/ResetPassword';
import MainContainer from './navigation/MainContainer';
import VenueDetailScreen from './navigation/screens/VenueDetailScreen';
import VenueListScreen from './navigation/screens/VenueListScreen';
import CategoryScreen from './navigation/screens/CategoryScreen';
import PaymentScreen from './navigation/screens/PaymentScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import PaymentDetails from './navigation/screens/PaymentDetails';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="MainContainer" component={MainContainer} />
        <Stack.Screen name="VenueDetail" component={VenueDetailScreen} />
      <Stack.Screen name="VenueList" component={VenueListScreen} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen}/>
      <Stack.Screen name="PaymentDetails" component={PaymentDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
