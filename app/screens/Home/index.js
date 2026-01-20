import React, { useContext } from 'react';
import { ScrollView, FlatList, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import HeaderSlider from '../../components/HeaderSlider';
import CategoryItem from '../../components/CategoryItem';
import BrandItem from '../../components/BrandItem';
import CouponCard from '../../components/CouponCard';
import styles from './styles';

import {
  headerBanners,
  categories,
  topPicks,
  CouponItems_List,
} from '../../database/coupon_data';
import { ThemeContext } from '../../theme/ThemeContext';
import { useTranslation } from 'react-i18next';
import { heightPercentageToDP } from 'react-native-responsive-screen';

export default function HomeScreen() {
  const { dark, setDark, theme } = useContext(ThemeContext);
  const navigation = useNavigation();
    const { i18n, t } = useTranslation();

  return (
    <>
      {/* <View  style={{
        height: heightPercentageToDP('7%'),
        backgroundColor: 'red',
      }} >
        <Text> Header ...</Text>
      </View> */}
      <ScrollView style={[styles.container, {backgroundColor: theme.background}]} showsVerticalScrollIndicator={false}>
        <HeaderSlider data={headerBanners} />

        {/* Categories */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color:theme.text}]}>{t('category')}</Text>
          </View>
 
          <FlatList
            data={categories}
            horizontal
            renderItem={({ item }) => {
              return(
                <View>
                  <CategoryItem 
                    item={item} 
                    onPress={() =>
                    navigation.navigate('Explore', {
                      type: 'category',
                      value: item.title,
                    })
                  }
                  />
                </View>  
              )
            }}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Top Picks */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color:theme.text}]}>{t('top-picks')}</Text>
            <Text style={styles.seeAll} onPress={() => navigation.navigate('Explore')}>{t('see-all')}</Text>
          </View>

          <FlatList
            data={topPicks}
            horizontal
            renderItem={({ item }) => {
              return(
                <View>
                  <BrandItem 
                    item={item}
                    onPress={() =>
                      navigation.navigate('Explore', {
                        type: 'brand',
                        value: item.name,
                      })
                    }  
                  />
                </View>
              )
            }}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, {color:theme.text}]}>{t('featured')}</Text>
            <Text style={styles.seeAll} onPress={() => navigation.navigate('Explore')}>{t('see-all')}</Text>
          </View>

          <FlatList
            data={CouponItems_List.filter(item=> item.isFeatured)}
            numColumns={2}
            renderItem={({ item }) => {
              return(
                <CouponCard 
                  item={item} 
                  xOnpress={()=> navigation.navigate('CouponDetail', { couponId: item.id })} 
                />
              )
            }}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </>
  );
}

