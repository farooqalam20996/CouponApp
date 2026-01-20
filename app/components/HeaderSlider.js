import React from 'react';
import { FlatList, Image, View, StyleSheet, Dimensions } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { width } = Dimensions.get('window');

export default function HeaderSlider({ data }) {
  return (
    <FlatList
      data={data}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.container}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: hp('22%'),
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 14,
  },
});
