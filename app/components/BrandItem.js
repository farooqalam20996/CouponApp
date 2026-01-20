import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SvgUri } from 'react-native-svg';
import { COLORS } from '../Utils/colors';

export default function BrandItem({ item, selected, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.box,
        {
          backgroundColor: selected ? COLORS.primary : COLORS.card,
        },
      ]}
    >
      <Image source={{ uri: item.logo }} style={styles.logo} />
       {/* <SvgUri
        uri={item.logo}
        width={60}
        height={24}
      /> */}
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 90,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  logo: {
    width: 60,
    height: 30,
    resizeMode: 'contain',
  },
});
