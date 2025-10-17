import { StyleSheet } from 'react-native';
import { wp, hp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  bgImage: {
    flex: 1,
  },
  container: {
    paddingHorizontal: wp(3),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('95'),
    alignSelf: 'center',
    marginBottom: hp('2'),
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

  // Accordion
  header: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('0.5'),
  },
  headerText: {
    fontSize: hp('1.8'),
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcon: {
    width: wp('5'),
    height: hp('3'),
  },
  content: {
    backgroundColor: '#fff',
  },
  contentBox: {
    width: 'auto',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.8'),
    paddingHorizontal: wp('2'),
    marginVertical: hp('1'),
    height: 'auto',
  },
  accordionBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    paddingVertical: hp('2'),
    paddingHorizontal: wp('1.5'),
  },

  // Rows
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('2'),
  },
  threeColRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Buttons
  halfButton: {
    width: wp('45'),
  },
  smallButton: {
    width: wp('27'),
    marginTop: hp('1'),
  },
  doneButton: {
    width: wp('27'),
    height: hp('4'),
  },

  // Icons
  themeIcon: {
    tintColor: Colors.primaryColor,
  },
  whiteIcon: {
    tintColor: 'white',
  },

  // Text
  centerText: {
    textAlign: 'center',
  },

  // Search
  searchBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('1'),
  },
  searchInput: {
    backgroundColor: Colors.bgGray,
    borderRadius: 10,
    width: wp('27'),
    fontSize: hp('1.5'),
    height: hp('5'),
    color: 'black',
    marginTop: hp('1'),
  },
});
