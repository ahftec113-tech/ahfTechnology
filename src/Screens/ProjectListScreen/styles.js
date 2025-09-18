import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('3'),
    paddingVertical: hp('1'),
    backgroundColor: '#fff',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 50,
    // flex: 1,
    marginRight: wp('3'),
    width: wp('45'),
    justifyContent: 'center',
    height: hp('5'),
    display: 'none',
  },
  icon: {
    width: wp('4'),
    height: wp('4'),
    tintColor: '#777',
    marginRight: wp('2'),
  },
  input: {
    fontSize: wp('4'),
    color: '#333',
    width: wp('20'),
  },
  clearText: {
    color: 'white',
    fontSize: wp('4'),
    marginRight: wp('3'),
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: wp('13'),
    width: wp('82'),
    justifyContent: 'flex-end',
  },
  toggleIcon: {
    width: wp('8'),
    height: wp('8'),
    // tintColor: '#1e88e5',
    marginLeft: wp('2'),
  },
  flatListContainer: {
    flexGrow: 1,
    // alignSelf: 'center',
    paddingTop: hp('2'),
    paddingHorizontal: wp('2'),
    paddingBottom: hp('10'),
  },
});
