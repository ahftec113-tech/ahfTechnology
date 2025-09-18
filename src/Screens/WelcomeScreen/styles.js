import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  imageBackground: {
    alignItems: 'center',
    paddingHorizontal: wp('3'),
    width: wp('100'),
    height: hp('110'),
    marginTop: hp('-1'),
  },
  homeIcon: {
    width: wp('30'),
    height: hp('4'),
    alignSelf: 'center',
    marginTop: hp('10'),
  },
  welcomeText: {
    marginTop: hp('10'),
  },
  hiThereText: {
    marginTop: hp('3'),
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
  learnSkillsText: {
    marginTop: hp('2'),
    fontStyle: 'italic',
  },
  createAccountButton: {
    marginVertical: hp('5'),
    marginTop: hp('10'),
  },
});
