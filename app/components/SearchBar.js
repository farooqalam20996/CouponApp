import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search brands, products..."
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  input: {
    height: 46,
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 14,
    fontSize: 14,
  },
});
