import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

export default function PhoneInput({
  label,
  country,
  phone,
  onPressCountry,
  onChangePhone,
  error,
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      {label && (
        <Text style={{ marginBottom: 6, fontSize: 14, color: '#333' }}>
          {label}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: error ? '#E53935' : '#DDD',
          borderRadius: 12,
          height: 52,
          backgroundColor: '#fff',
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity onPress={onPressCountry}>
          <Text style={{ fontSize: 15, fontWeight: '500' }}>
            {country.dial}
          </Text>
        </TouchableOpacity>

        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: '#DDD',
            marginHorizontal: 10,
          }}
        />

        <TextInput
          value={phone}
          onChangeText={onChangePhone}
          placeholder="Phone number"
          keyboardType="phone-pad"
          style={{
            flex: 1,
            fontSize: 15,
          }}
          maxLength={17}
        />
      </View>

      {error && (
        <Text style={{ color: '#E53935', fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
}
