import { StyleSheet } from 'react-native';
import { wp, hp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  // Header Row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
    marginBottom: hp('10'),
    marginTop: hp('2'),
  },
  logo: {
    width: wp('35'),
    height: hp('10'),
  },
  logoutButton: {
    width: wp('40'),
  },
  logoutImage: {
    tintColor: 'white',
  },
});
