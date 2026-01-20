import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BottomTabs from './BottomTab';
import CouponDetailScreen from '../screens/CouponDetail';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignupScreen';
import EmailVerificationScreen from '../screens/Auth/EmailVerificationScreen';
import ForgotPasswordScreen from '../screens/Auth/ForgotPasswordScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createNativeStackNavigator();

export default function RootStack() {
    const { user } = useContext(AuthContext);
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/** Main Tabs */}
      
      <Stack.Screen name="MainTabs" component={BottomTabs} />
      
      {/** Detail Page */}
      <Stack.Screen name="CouponDetail" component={CouponDetailScreen} />
      
      {/** Auth Stack */}

      {
        !user && 
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen name="EmailVerification" component={EmailVerificationScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </> 
      }
      
    </Stack.Navigator>
  );
}
