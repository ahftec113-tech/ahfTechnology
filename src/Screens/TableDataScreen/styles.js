import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  // Header Section
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

  // Titles
  selectedOrderText: {
    textAlign: 'center',
  },
  totalResultText: {
    textAlign: 'center',
    marginTop: hp('1'),
  },

  // Card Container
  cardContainer: {
    width: wp('95'),
    borderRadius: 10,
    paddingHorizontal: wp('3'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    backgroundColor: 'white',
    elevation: 9,
    alignSelf: 'center',
    paddingBottom: hp('2'),
    marginVertical: hp('1'),
  },

  // Totals Rows (key-value rows inside card)
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  totalsText: {
    fontSize: hp('1.5'),
    color: '#1e293b',
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
    color: '#1e293b',
    width: wp('50'),
    textAlign: 'right',
  },

  // Special for clickable Code
  codeValue: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
    color: 'blue',
    textDecorationLine: 'underline',
  },

  // Log Button
  logButton: {
    marginHorizontal: wp('2'),
    alignSelf: 'center',
  },
  logIcon: {
    width: wp('10'),
    height: hp('3'),
    alignSelf: 'flex-end',
    // backgroundColor: 'red',
    right: hp('-2.5'),
  },

  // Show more Button
  showMoreButton: {
    width: wp('50'),
    alignSelf: 'center',
    marginTop: hp('2'),
  },
});
