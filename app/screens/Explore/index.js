import React, { useState, useMemo, useContext, useEffect } from 'react';
import { View, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Entypo"
//Local
import SearchBar from '../../components/SearchBar';
import CategoryItem from '../../components/CategoryItem';
import BrandItem from '../../components/BrandItem';
import SearchResultCard from '../../components/SearchResultCard';
import { categories, topPicks, CouponItems_List } from '../../database/coupon_data';
import styles from './styles';
import { ThemeContext } from '../../theme/ThemeContext';
import CouponCard from '../../components/CouponCard';
import { COLORS } from '../../Utils/colors';

const FilterChip = ({label, onRemove}) => {
  return(
    <TouchableOpacity style={styles.filterChips} onPress={onRemove}>
      <Text style={styles.filterChipText}>{label}</Text>
      <Icon
        name="cross"
        size={hp('1.6%')}
        color={COLORS.primary}
        style={{ marginLeft: hp('0.6%') }}
      />
    </TouchableOpacity>
  )
}

export default function Explore({ navigation }) {
  const { t, i18n } = useTranslation();
  const { dark, setDark, theme } = useContext(ThemeContext);
  const [query, setQuery] = useState('');
  const route = useRoute();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [filteredCoupons, setFilteredCoupons] = useState(CouponItems_List);

  // 👇 handle navigation params
  useEffect(() => {
    if (route.params?.type === 'category') {
      setSelectedCategory(route.params.value);
      setSelectedBrand(null);
    }

    if (route.params?.type === 'brand') {
      setSelectedBrand(route.params.value);
      setSelectedCategory(null);
    }

    if (!route.params) {
      setSelectedCategory(null);
      setSelectedBrand(null);
    }
  }, [route.params]);

 useEffect(() => {
  let data = CouponItems_List;

  if (selectedCategory) {
    data = data.filter(item => item.category === selectedCategory);
  }

  if (selectedBrand) {
    data = data.filter(item => item.brand === selectedBrand);
  }

  setFilteredCoupons(data);
}, [selectedCategory, selectedBrand]);

  const searchResults = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();

    return CouponItems_List.filter(item =>
      item.brand.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) 
    );
  }, [query]);

  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.background}]} showsVerticalScrollIndicator={false}>
      <SearchBar value={query} onChange={setQuery} />

      {/** Filtered Chips */}
      <View style={styles.filtersRow}>
        {selectedCategory && (
          <FilterChip
            label={selectedCategory}
            onRemove={() => setSelectedCategory(null)}
          />
        )}
        {selectedBrand && (
          <FilterChip
            label={selectedBrand}
            onRemove={() => setSelectedBrand(null)}
          />
        )}
      </View>

      {/* Categories */}
      <View>
        <Text style={[styles.sectionTitle, {color:theme.text}]}>{t('category')}</Text>
        <FlatList
          data={categories}
          horizontal
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return(
              <CategoryItem 
                item={item}
                selected={
                  item.title === 'All'
                    ? !selectedCategory && !selectedBrand
                    : item.title === selectedCategory
                }
                onPress={() => {
                   if (item.title === 'All') {
                      setSelectedCategory(null);
                      setSelectedBrand(null);
                    } else {
                      setSelectedCategory(item.title);
                    }
                }} 
              />
            )
          }}
          showsHorizontalScrollIndicator={false}
        />

        {/* Search Results */}
        {query ? (
          <FlatList
            data={searchResults}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <SearchResultCard item={item} xOnpress={()=> navigation.navigate('CouponDetail', { couponId: item.id })}  />}
            ListEmptyComponent={<Text style={styles.empty}>No results found</Text>}
          />
        ) : (
          <>
            {/* Top Brands */}
            <Text style={[styles.sectionTitle, {color:theme.text}]}>{t('top-picks')}</Text>
            <FlatList
              data={topPicks}
              horizontal
              keyExtractor={item => item.id}
              renderItem={({ item }) => {
              return(
                  <BrandItem 
                    item={item}
                    selected={item.name === selectedBrand}
                    onPress={() => {
                      setSelectedBrand(item.name);
                    }} 
                  />
                )
              }}
              showsHorizontalScrollIndicator={false}
            />

            {/** All Coupons  */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={[styles.sectionTitle, {color:theme.text}]}>{t('All Coupons')}</Text>
              </View>
      
              <FlatList
                data={filteredCoupons}
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
                ListEmptyComponent={({})=> {
                  return(
                    <View style={{flex:1, alignItems:"center", justifyContent:"center", paddingTop: hp('10%')}} >
                      <Text style={{color: theme.text}} >No coupons available</Text>
                    </View>
                  )
                }}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}
