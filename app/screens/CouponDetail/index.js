import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
// local
import { CouponItems_List } from '../../database/coupon_data';
import { favoriteCoupons } from '../../database/favorites_data';
import CouponCard from '../../components/CouponCard';
import styles from './styles';
import { AuthContext } from '../../context/AuthContext';

const { width } = Dimensions.get('window');


export default function CouponDetail({ route }) {
  const { user } = useContext(AuthContext);
  const { couponId } = route.params;
  const navigation = useNavigation();

  // 🔑 Single lookup
  const coupon = CouponItems_List.find(c => c.id === couponId);

  if (!coupon) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* <Image source={{ uri: coupon.images[0].image }} style={styles.headerImage} /> */}

      <FlatList
        data={coupon.images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          return(
          <View style={{
            width: width,
            height: 250,
          }}>
            <Image
              source={{ uri: item.image }}
              style={{
                  width: '100%',
                  height: 250,
                  // borderRadius: 14,
              }}
              resizeMode="cover"
            />
          </View>
        )
        }}
      />

      <TouchableOpacity style={styles.back} activeOpacity={0.5} onPress={() => navigation.goBack()}>
        <Icon name={"arrow-left"} color={"#fff"} size={hp('1.75%')} />
        {/* <Text style={styles.backTxt} >back</Text> */}
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>{coupon.title}</Text>
        <Text style={styles.brand}>{coupon.brand}</Text>

        <Text style={styles.discount}>{coupon.discount}% OFF</Text>

        <Text style={styles.desc}>{coupon.description}</Text>

        <Text style={styles.meta}>
          ⭐ {coupon.rating} · {coupon.reviews} reviews
        </Text>

        {
          !user?
          <TouchableOpacity style={styles.qrButton} onPress={()=> navigation.navigate('Login')} >
            <Text style={styles.qrText}>Show QR / Barcode</Text>
          </TouchableOpacity>
          :
            <>
              {/* Coupon Code */}
              <View style={styles.codeBox}>
                <Text style={styles.code}>{coupon.couponCode}</Text>
              </View>

              {/* QR / Barcode */}
              <TouchableOpacity style={styles.qrButton}>
                <Text style={styles.qrText}>Show QR / Barcode</Text>
              </TouchableOpacity>
            </>
        }


      </View>

      {/* Related Coupons */}
      <Text style={styles.relatedTitle}>More Coupons</Text>
      <FlatList
        data={CouponItems_List.filter(c => c.id !== coupon.id)}
        horizontal
        renderItem={({ item }) => {
          return (
            <CouponCard
              item={item}
              xOnpress={() => navigation.navigate('CouponDetail', { couponId: item.id })}
            />
          )
        }}
        showsHorizontalScrollIndicator={false}
      />

    </ScrollView>
  );
}
