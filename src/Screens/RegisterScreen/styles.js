import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  ImgBg: {
    flex: 1,
    justifyContent: 'center',
  },
  logInMain: {
    paddingHorizontal: wp('4'),
    alignItems: 'center',
  },
  signInText: {
    // marginTop: hp('-1.5'),
    fontSize: hp('2.5'),
    fontWeight: '700',
    textAlign: 'center',
  },
  loginTop: {
    // alignItems: 'flex-start',
    // marginBottom: hp('2'),
    paddingHorizontal: wp('1.5'),
  },
  mainImage: {
    width: wp('100'),
    height: hp('40'),
  },
  logo: {
    width: wp('60'),
    height: hp('9'),
  },
  loginBottom: {
    // flex: 1,
    paddingHorizontal: wp('3.5'),
    justifyContent: 'center',
    // backgroundColor: 'red'
  },

  rememberInner: {
    flexDirection: 'row',
    // marginTop: hp('1'),
    // flex: 1,
    // marginBottom: hp('3.5'),
    alignItems: 'center',
  },
  tickIcon: {
    marginRight: wp('2'),
    resizeMode: 'contain',
    height: hp('3'),
    width: wp('6'),
  },
  tickText: {
    color: Colors.gray,
    fontSize: hp('1.9'),
    fontWeight: '400',
    // marginBottom: hp('1'),
  },
  logInMain: {
    paddingHorizontal: wp('4'),
    alignItems: 'center',
  },
  buttonStyle: {
    borderRadius: 10,
    height: hp('5'),
    width: wp('90'),
    alignSelf: 'flex-end',
    // marginTop: hp('3'),
  },
  lockstyle: {
    flex: 0.3,
  },

  userIconStyle: {
    flex: 2,
  },
  userInputStyle: {
    width: '83%',
  },
  dontHave: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: hp('1'),
    marginBottom: hp('1'),
  },
  dontHaveText: {
    fontSize: hp('1.5'),
    fontWeight: '400',
    color: Colors.black,
    marginRight: wp('4'),
  },
  signUpText: {
    color: Colors.primaryColor,
    fontSize: hp('1.5'),
    fontWeight: '600',
  },
  lastNameSt: {
    // position: 'absolute',
    right: wp('0'),
  },
  termsMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
    marginBottom: hp('3.5'),
  },
  termsText: {
    color: Colors.gray,
    fontSize: hp('1.9'),
    fontWeight: '400',
    textDecorationColor: Colors.black,
    textDecorationLine: 'underline',
  },
  barMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: hp('4'),
    marginTop: hp('2'),
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
  },
});
