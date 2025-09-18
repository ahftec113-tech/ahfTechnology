import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  // Header Row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
    marginBottom: hp('2'),
    marginTop: hp('5'),
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
  //

  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    width: wp('95'),
    alignSelf: 'center',
  },
  totalsText: {
    fontSize: 13,
    color: '#1e293b',
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#1e293b',
  },
});
