import React, { useState, useMemo, useContext } from 'react';
import { View, FlatList, Alert, Text, TouchableOpacity } from 'react-native';

import SearchBar from '../../components/SearchBar';
import SortFilter from '../../components/SortFilter';
import FavoriteCouponCard from '../../components/FavoriteCouponCard';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { CouponItems_List } from '../../database/coupon_data';
import { ThemeContext } from '../../theme/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

export default function Favorites() {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const favListItem = CouponItems_List.filter(item => item.isFavorites);
    const { dark, setDark, theme } = useContext(ThemeContext);
  
  const [query, setQuery] = useState('');
  const [sortType, setSortType] = useState('time');
  const [favorites, setFavorites] = useState(favListItem);

  const handleRemove = (item) => {
    Alert.alert(
      'Remove Favorite',
      'If you remove (unlike) this item, it will be removed from your favorites.\n\nAre you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavorites(prev =>
              prev.filter(fav => fav.id !== item.id)
            );
          },
        },
      ]
    );
  };

  const data = useMemo(() => {
    let list = favorites.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.brand.toLowerCase().includes(query.toLowerCase())
    );

    if (sortType === 'discount') {
      list.sort((a, b) => b.discount - a.discount);
    } else {
      list.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    return list;
  }, [favorites, query, sortType]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <SearchBar value={query} onChange={setQuery} />
      <SortFilter selected={sortType} onChange={setSortType} />

      {
        !user ?
          <View style={{
            flex: 1, 
            alignItems:"center",
            justifyContent:"center",
          }} >
             <TouchableOpacity style={styles.loginButton} onPress={()=> navigation.navigate('Login')} >
                <Text style={styles.loginText}>Login First</Text>
              </TouchableOpacity>
          </View>
          :
          <FlatList
            data={data}
            numColumns={2}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <FavoriteCouponCard
                item={item}
                onRemove={handleRemove}
                xOnpress={()=> navigation.navigate('CouponDetail', { couponId: item.id })} 
              />
            )}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            showsVerticalScrollIndicator={false}
          />

      }

    </View>
  );
}