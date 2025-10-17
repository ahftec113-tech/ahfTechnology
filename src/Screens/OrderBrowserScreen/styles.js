import { StyleSheet } from 'react-native';
import { Colors } from '../../Theme/Variables';
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

  timeZoneContainer: {
    width: wp('75'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  timeZoneButton: {
    width: wp('35'),
    // alignSelf: 'center',
    borderWidth: 0,
    borderRadius: 50,
    height: 'auto',
    paddingVertical: hp('0.5'),
    // paddingHorizontal: wp('2'),
  },
  bulkOrderButton: {
    width: wp('90'),
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5'),
    height: 'auto',
    backgroundColor: 'white',
    marginVertical: hp('1'),
    // marginTop: hp('5'),
  },
  bulkOrderText: {
    textAlign: 'left',
    color: 'black',
    lineHeight: hp('2.5'),
  },
  bulkOrderImage: {
    width: wp('20'),
    height: hp('12'),
  },
  header: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  activeHeader: {
    backgroundColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    padding: 15,
    backgroundColor: '#fff',
  },
  selectorView: {
    width: wp('92'),
    // paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    marginVertical: hp('1'),
    height: hp('6'),
  },
});
