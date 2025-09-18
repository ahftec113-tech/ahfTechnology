import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  logInMain: {
    paddingHorizontal: wp('4'),
    // alignItems: 'center',
  },
  ImgBg: {
    flex: 1,
    justifyContent: 'center',
  },
  loginTop: {
    alignItems: 'flex-start',
    marginTop: hp('-5'),
    marginBottom: hp('2'),
    paddingHorizontal: wp('1.5'),
  },
  remStyle: {
    color: Colors.white,
    fontSize: hp('1.8'),
    paddingLeft: wp('1'),
  },
  checkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  barMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: hp('4'),
    marginTop: hp('3'),
    marginBottom: hp('2'),
  },
  barLine: {
    width: wp('28'),
    borderBottomWidth: 1,
    height: hp('.2'),
    backgroundColor: Colors.grayFaded,
  },
  barText: {
    paddingHorizontal: wp('4'),
    fontSize: hp('1.5'),
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('75'),
    alignSelf: 'center',
    paddingBottom: hp('2'),
  },
  socialIcons: {
    width: wp('15'),
    height: hp('7.5'),
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  socialImage: {
    width: wp('7'),
    height: hp('3.5'),
    resizeMode: 'contain',
  },
  mainImage: {
    width: wp('100'),
    height: hp('40'),
  },
  logo: {
    width: wp('60'),
    height: hp('9'),
  },
  signInText: {
    marginTop: hp('5'),
    fontSize: hp('2.5'),
    fontWeight: '500',
  },
  loginBottom: {
    flex: 1,
    paddingHorizontal: wp('3.5'),
    justifyContent: 'center',
    marginTop: hp('-20'),
  },
  rememberSec: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: hp('1'),
  },
  rememberInner: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tickIcon: {
    marginRight: wp('2'),
    resizeMode: 'contain',
    height: hp('3'),
    width: wp('6'),
  },
  tickText: {
    fontSize: hp('1.8'),
    fontWeight: '400',
  },
  forgetText: {
    flex: 1,
    textAlign: 'right',
    fontSize: hp('1.5'),
  },
  lockstyle: {
    flex: 0.4,
  },
  dontHave: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: hp('8'),
    alignItems: 'center',
    paddingBottom: hp('2'),
    // position: 'absolute',
    marginTop: hp('5'),
    // left: 0,
    // right: 0,
    // bottom: hp('2')
  },
  dontHaveText: {
    fontSize: hp('1.5'),
    fontWeight: '400',
    marginRight: wp('2'),
  },
  signUpText: {
    color: Colors.primaryColor,
    fontSize: hp('1.5'),
    fontWeight: '600',
  },
  imageStyle: { width: wp('30'), height: hp('15') },
  buttonStyle: {
    borderRadius: 10,
    height: hp('5'),
    width: wp('42'),
    // alignSelf: 'flex-end',
    // marginTop: hp('3'),
  },
  logoImage: {
    width: wp('40'),
    marginTop: hp('15'),
    height: hp('8'),
    alignSelf: 'center',
  },
  forgotContainer: {
    paddingVertical: hp('1'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonRow: {
    width: wp('92'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: hp('2'),
  },
  buttonText: {
    fontSize: hp('1.5'),
  },
});
