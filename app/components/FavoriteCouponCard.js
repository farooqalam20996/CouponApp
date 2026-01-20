import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function FavoriteCouponCard({ item, onRemove, xOnpress }) {
  return (
    <TouchableOpacity activeOpacity={0.5} style={styles.card} onPress={xOnpress}>
      <Image source={{ uri: item.images[0].image }} style={styles.image} />

      {/* Discount badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.discount}% OFF</Text>
      </View>

      {/* Heart button */}
      <TouchableOpacity
        style={styles.heart}
        onPress={() => onRemove(item)}
        activeOpacity={0.7}
      >
        <Text style={styles.heartText}>❤️</Text>
      </TouchableOpacity>

      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.brand}>{item.brand}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 12,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    height: 110,
    width: '100%',
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#E53935',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  heartText: {
    fontSize: 20,
  },
  title: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  brand: {
    fontSize: 11,
    color: '#777',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
