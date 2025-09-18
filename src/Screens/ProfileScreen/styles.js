import { Dimensions, StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('10'),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('90'),
    alignSelf: 'center',
  },
  profileInfo: {
    height: hp('10'),
    justifyContent: 'space-between',
  },
  basicBtn: {
    borderRadius: 20,
    paddingVertical: hp('0.5'),
    paddingHorizontal: wp('-30'),
  },
  circleBtnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: wp('90'),
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: hp('2'),
    marginTop: hp('3'),
    alignSelf: 'center',
  },
  circleBtn: {
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width * 0.27,
    height: Dimensions.get('window').width * 0.27,
    borderRadius: Math.round(
      Dimensions.get('window').width + Dimensions.get('window').height,
    ),
  },
  circleBtnImage: {
    width: wp('5'),
    height: hp('3'),
    marginBottom: hp('1'),
  },
  circleBtnText: {
    textAlign: 'center',
  },
  postAdContainer: {
    width: wp('80'),
    alignSelf: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
    marginVertical: hp('5'),
    overflow: 'hidden',
  },
  postAdInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: wp('10'),
    paddingVertical: hp('3'),
    backgroundColor: 'white',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: Colors.primaryColor,
  },
  postAdImage: {
    width: wp('5'),
    height: hp('3'),
  },
  postAdText: {
    textAlign: 'center',
    paddingVertical: hp('1'),
  },
  bottomBtnContainer: {
    width: wp('84'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'space-between',
    gap: hp('2'),
  },
  bottomBtn: {
    width: wp('40'),
  },
});
