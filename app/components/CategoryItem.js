import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../Utils/colors';

export default function CategoryItem({ item, selected, onPress }) {
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
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  icon: {
    fontSize: hp('3%'),
  },
  text: {
    marginTop: 5,
    fontSize: hp('1.5%'),
  },
});
