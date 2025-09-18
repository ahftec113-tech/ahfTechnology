import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  flatListContainer: {
    flexGrow: 1,
    // alignSelf: 'center',
    paddingTop: hp('2'),
    paddingHorizontal: wp('2'),
    paddingBottom: hp('30'),
  },
  topHomeCompContainer: {
    flexDirection: 'row',
    paddingVertical: hp('2'),
    flexWrap: 'wrap',
    paddingHorizontal: wp('2'),
  },
});
