import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    paddingTop: hp('5'),
  },

  // Header Row
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
    marginBottom: hp('10'),
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

  // Order Browser Main Button
  orderButton: {
    width: wp('90'),
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    borderRadius: 25,
    height: hp('7'),
    marginVertical: hp('2'),
  },
  orderImage: {
    width: wp('8'),
  },

  // Order Touchable
  orderTouchable: {
    width: wp('90'),
    paddingHorizontal: wp('2'),
    paddingVertical: hp('2'),
    borderWidth: 2,
    borderColor: Colors.grayBorder,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  arrowIcon: {
    width: wp('5'),
    height: hp('3'),
  },

  // Already existing styles
  innerContainer: {
    width: wp('90'),
    alignSelf: 'center',
    marginTop: hp('-12'),
  },
  buttonWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp('1'),
  },
  recommendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  flatListContainer: {
    justifyContent: 'space-between',
    marginTop: hp('1'),
  },
  container: {
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: wp('80'),
    marginBottom: hp('2'),
    marginTop: hp('1'),
  },
  card: {
    width: wp('25'),
    height: hp('6'),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  selectedCard: {
    backgroundColor: Colors.primaryColor,
    borderColor: Colors.primaryColor,
  },
  unselectedCard: {
    backgroundColor: 'white',
    borderColor: Colors.primaryColor,
  },
  text: {
    fontWeight: 'bold',
  },
  subText: {},
  selectedText: {
    color: 'white',
  },
});
