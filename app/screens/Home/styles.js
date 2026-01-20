import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../Utils/colors';
import { ThemeContext } from '../../theme/ThemeContext';
import { useContext } from 'react';

export default StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.background,
  },

  section: {
    marginTop: hp('2%'),
    paddingHorizontal: wp('4%'),
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },

  sectionTitle: {
    fontSize: hp('2.1%'),
    fontWeight: '600',
    color: COLORS.secondary,
  },

  seeAll: {
    fontSize: hp('1.6%'),
    color: COLORS.primary,
  },
});
