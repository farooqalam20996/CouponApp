import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../../Utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: hp('0.5%'),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginHorizontal: 16,
    marginVertical: 12,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
  },
  filterChips: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: hp('1.4%'),
    paddingVertical: hp('0.6%'),
    marginRight: hp('1%'),
    marginBottom: hp('0.8%'),
    borderRadius: 999, // pill shape
    borderWidth: 1,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '15', // light tint
  },
  filterChipText: {
    fontSize: hp('1.6%'),
    color: COLORS.primary,
    fontWeight: '500',
  },
});
