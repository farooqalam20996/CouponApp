import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = () => {
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setLoading(true);

    // API integration later
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('EmailVerification', {
        type: 'forgot-password',
        email,
      });
    }, 1200);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{
        flex: 1,
        backgroundColor: '#F8F8F8',
        padding: 24,
      }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#111' }}>
          Forgot Password 🔐
        </Text>
        <Text style={{ color: '#777', marginTop: 6 }}>
          Enter your email to receive a verification code
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <CustomInput
          label="Email Address"
          placeholder="Enter your registered email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={error}
        />

        <PrimaryButton
          title="Send Verification Code"
          onPress={handleSendCode}
          loading={loading}
        />
      </View>

      <Text
        onPress={() => navigation.goBack()}
        style={{
          marginTop: 24,
          textAlign: 'center',
          color: '#121212',
          fontWeight: '500',
        }}
      >
        Back to Login
      </Text>
    </KeyboardAvoidingView>
  );
}
