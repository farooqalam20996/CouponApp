import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SearchResultCard({ item, xOnpress }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={xOnpress} style={styles.card}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.discount}>{item.discount}% OFF</Text>
      </View>
      <Image source={{ uri: item.images[0].image }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 3,
    flexDirection:'row',
    alignItems:"center",
    justifyContent:"space-between"
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
  brand: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  discount: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: '700',
    color: '#2E7D32',
  },
  image: {
    height: 60,
    width: '30%',
    borderRadius:hp('1%')
  },
});
