import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SortFilter({ selected, onChange }) {
  return (
    <View style={styles.container}>
      {['time', 'discount'].map(type => (
        <TouchableOpacity
          key={type}
          onPress={() => onChange(type)}
          style={[
            styles.button,
            selected === type && styles.active,
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === type && styles.activeText,
            ]}
          >
            Sort by {type}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F1F1F1',
    marginRight: 10,
  },
  active: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 12,
  },
  activeText: {
    color: '#fff',
  },
});
