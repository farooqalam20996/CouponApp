import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/Octicons";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';

export default function CouponCard({ item, xOnpress }) {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const images = item.images[0].image ? item.images[0].image : "https://d25thuhsbcr6yb.cloudfront.net/m/s/28889/28879096/a-0072.png";

  const fFavoriteItems = () => {
    if(!user){
      navigation.navigate('Login');
    }
  }

  return (
    <TouchableOpacity style={styles.card} onPress={xOnpress} activeOpacity={0.75} >
      <Image source={{ uri: images }} style={styles.image} />
      <View style={styles.content}>
          <Text style={styles.discount}>{item.discount}% OFF</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.brand}>{item.brand}</Text>
      </View>
      <TouchableOpacity
        style={styles.heart}
        onPress={()=> fFavoriteItems()}
        activeOpacity={0.7}
      >
        {
          item.isFavorites?
            <Icon name="heart-fill" color={'red'} size={hp('2.5%')} />
            :
            <Icon name="heart" color={'white'} size={hp('2.5%')} />
        }
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    backgroundColor: '#fff',
    elevation: 4, // Android
    shadowColor: '#000', // iOS
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    overflow: 'hidden',
  },

  image: {
    height: 120,
    width: '100%',
  },

  content: {
    padding: 10,
  },

  discount: {
    color: '#FF6B00',
    fontWeight: '700',
    fontSize: 14,
  },

  title: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
  },

  brand: {
    fontSize: 12,
    color: '#7A7A7A',
  },
  heart: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  heartText: {
    fontSize: 20,
  },
});

