import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType = 'default',
  error,
  showToggle = false,
}) => {
  const [hidePassword, setHidePassword] = useState(secureTextEntry);

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
          paddingHorizontal: 14,
          height: 52,
          backgroundColor: '#fff',
        }}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={hidePassword}
          keyboardType={keyboardType}
          autoCapitalize="none"
          style={{ flex: 1, fontSize: 15 }}
        />

        {showToggle && (
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Icon
              name={hidePassword ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color="#777"
            />
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={{ color: '#E53935', fontSize: 12, marginTop: 4 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInput;
