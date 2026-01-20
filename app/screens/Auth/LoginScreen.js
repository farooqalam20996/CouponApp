import React, { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import { loginAction } from './action';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password || password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const authData = await loginAction({ email, password });

      // Update Context
      login(authData);
      setLoading(false);
    } catch (err) {
      alert(err.message || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#F8F8F8', padding: 24 }}
    >
      <View style={{ marginTop: 80 }}>
        <Text style={{ fontSize: 28, fontWeight: '700', color: '#111' }}>
          Welcome Back 👋
        </Text>
        <Text style={{ color: '#777', marginTop: 6 }}>
          Login to unlock exclusive coupons
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <CustomInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          error={errors.email}
        />

        <CustomInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          showToggle
          error={errors.password}
        />

        {errors.general && (
          <Text style={{ color: '#E53935', textAlign: 'center', marginBottom: 8 }}>
            {errors.general}
          </Text>
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={{ alignSelf: 'flex-end', marginBottom: 10 }}
        >
          <Text style={{ color: '#121212', fontWeight: '500' }}>
            Forgot Password?
          </Text>
        </TouchableOpacity>

        <PrimaryButton title="Login" onPress={handleLogin} loading={loading} />
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 30 }}>
        <Text style={{ color: '#777' }}>Don’t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={{ marginLeft: 6, fontWeight: '600', color: '#121212' }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
