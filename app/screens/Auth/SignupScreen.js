import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';

import CustomInput from '../../components/CustomInput';
import PrimaryButton from '../../components/PrimaryButton';
import CountryPicker from '../../components/CountryPicker';
import PhoneInput from '../../components/PhoneInput';
import { SignUpAction } from './action';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignupScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState({ dial: '+49', name: 'Germany' });
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPicker, setShowPicker] = useState(false);

    const validate = () => {
        let e = {};

        if (!name.trim()) e.name = 'Name is required';
        if (!emailRegex.test(email)) e.email = 'Enter a valid email';
        if (!phone || phone.length < 7) e.phone = 'Enter a valid phone number';
        if (password.length < 6) e.password = 'Minimum 6 characters';
        if (password !== retypePassword)
            e.retypePassword = 'Passwords do not match';

        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSignup = async () => {
        if (!validate()) return;

        setLoading(true);
        const result = await SignUpAction(
            name,
            email,
            phone,
            password
        );
        if (result.success) {
            setName('');
            setPhone('');
            setEmail('');
            setPassword('');
            setRetypePassword('');
            setLoading(false);
            navigation.navigate('EmailVerification', { email: email });
        }
        else {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={{ flex: 1, backgroundColor: '#F8F8F8', padding: 24 }}
        >
            <View style={{ marginTop: 60 }}>
                <Text style={{ fontSize: 28, fontWeight: '700', color: '#111' }}>
                    Create Account ✨
                </Text>
                <Text style={{ color: '#777', marginTop: 6 }}>
                    Join to unlock exclusive discounts
                </Text>
            </View>

            <View style={{ marginTop: 30 }}>
                <CustomInput
                    label="Full Name"
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                    error={errors.name}
                />

                <CustomInput
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    error={errors.email}
                />

                {/* Phone with Country Code */}
                {/* <Text style={{ marginBottom: 6, fontSize: 14, color: '#333' }}>
          Phone Number
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: errors.phone ? '#E53935' : '#DDD',
            borderRadius: 12,
            height: 52,
            backgroundColor: '#fff',
            paddingHorizontal: 10,
            marginBottom: 6,
          }}
        >
          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <Text style={{ fontSize: 15, marginRight: 10 }}>
              {country.dial}
            </Text>
          </TouchableOpacity>

          <View style={{ width: 1, height: 24, backgroundColor: '#DDD' }} />

          <CustomInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Phone number"
            keyboardType="phone-pad"
          />
        </View> */}

                <View>
                    <PhoneInput
                        label="Phone Number"
                        country={country}
                        phone={phone}
                        onPressCountry={() => setShowPicker(true)}
                        onChangePhone={setPhone}
                        error={errors.phone}
                    />
                </View>

                {errors.phone && (
                    <Text style={{ color: '#E53935', fontSize: 12, marginBottom: 10 }}>
                        {errors.phone}
                    </Text>
                )}

                <CustomInput
                    label="Password"
                    placeholder="Create password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    showToggle
                    error={errors.password}
                />

                <CustomInput
                    label="Retype Password"
                    placeholder="Confirm password"
                    value={retypePassword}
                    onChangeText={setRetypePassword}
                    secureTextEntry
                    showToggle
                    error={errors.retypePassword}
                />

                <PrimaryButton
                    title="Create Account"
                    onPress={handleSignup}
                    loading={loading}
                />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
                <Text style={{ color: '#777' }}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={{ marginLeft: 6, fontWeight: '600', color: '#121212' }}>
                        Login
                    </Text>
                </TouchableOpacity>
            </View>

            <CountryPicker
                visible={showPicker}
                onClose={() => setShowPicker(false)}
                onSelect={setCountry}
            />
        </KeyboardAvoidingView>
    );
}
