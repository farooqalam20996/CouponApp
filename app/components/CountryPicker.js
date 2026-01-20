import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Modal } from 'react-native';

const countries = [
  { code: 'DE', dial: '+49', name: 'Germany' },
  { code: 'US', dial: '+1', name: 'USA' },
  { code: 'PK', dial: '+92', name: 'Pakistan' },
  { code: 'IN', dial: '+91', name: 'India' },
];

export default function CountryPicker({ visible, onClose, onSelect }) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            maxHeight: '60%',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>
            Select Country
          </Text>

          <FlatList
            data={countries}
            keyExtractor={(item) => item.code}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
                style={{
                  paddingVertical: 14,
                  borderBottomWidth: 1,
                  borderBottomColor: '#EEE',
                }}
              >
                <Text style={{ fontSize: 16 }}>
                  {item.name} ({item.dial})
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
