import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import PrimaryButton from '../../components/PrimaryButton';
import { EmailVerificationCodeAction } from './action';

export default function EmailVerificationScreen({ navigation, route }) {
  const { type = 'signup', email } = route.params || {};

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  
  const inputs = useRef([]);
  const [timer, setTimer] = useState(60);

  /* Countdown Timer */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const formattedTime = `00:${timer < 10 ? `0${timer}` : timer}`;

  const handleVerify = async () => {
    const otp = code.join('');
    if (otp.length < 6) return;

    // API integration later
    if (type === 'forgot-password') {
      navigation.navigate('ResetPassword', { email });
    } else {
      setLoading(true);
      const result = await EmailVerificationCodeAction(
          email,
          otp
      );
      if (result.success) {
          setLoading(false);
          navigation.navigate('Login')
      }
      else {
          setLoading(false);
      }
    }
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
          Verification Code 🔐
        </Text>
        <Text style={{ color: '#777', marginTop: 6 }}>
          Enter the 6-digit code sent to your email
        </Text>

        {email && (
          <Text style={{ color: '#111', marginTop: 4, fontWeight: '500' }}>
            {email}
          </Text>
        )}
      </View>

      {/* OTP Inputs */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 40,
        }}
      >
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputs.current[index] = ref)}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            onKeyPress={(e) => handleBackspace(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            style={{
              width: 48,
              height: 56,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#DDD',
              backgroundColor: '#fff',
              textAlign: 'center',
              fontSize: 20,
              fontWeight: '600',
            }}
          />
        ))}
      </View>

      {/* Timer */}
      <Text
        style={{
          marginTop: 20,
          textAlign: 'center',
          color: '#777',
        }}
      >
        Code expires in{' '}
        <Text style={{ fontWeight: '600', color: '#111' }}>
          {formattedTime}
        </Text>
      </Text>

      {/* Resend */}
      <TouchableOpacity
        disabled={timer !== 0}
        onPress={() => setTimer(60)}
        style={{ marginTop: 10 }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: timer === 0 ? '#121212' : '#AAA',
            fontWeight: '500',
          }}
        >
          Resend Code
        </Text>
      </TouchableOpacity>

      {/* Verify Button */}
      <View style={{ marginTop: 30 }}>
        <PrimaryButton
          title="Verify Code"
          onPress={handleVerify}
          loading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
