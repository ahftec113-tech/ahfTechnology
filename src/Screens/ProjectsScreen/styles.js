import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('2'),
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    marginVertical: hp('1'),
    backgroundColor: Colors.grayFaded,
    paddingVertical: hp('2'),
    justifyContent: 'space-between',
  },
  homeIcon: {
    width: wp('15'),
    height: hp('2'),
  },
  venturesText: {
    marginBottom: hp('1'),
    marginLeft: wp('4'),
  },
  scrollView: {
    maxHeight: hp('6'),
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: wp('4'),
  },
  flatListContainer: {
    flexGrow: 1,
    // alignSelf: 'center',
    paddingTop: hp('2'),
    paddingHorizontal: wp('2'),
    paddingBottom: hp('10'),
  },
});
