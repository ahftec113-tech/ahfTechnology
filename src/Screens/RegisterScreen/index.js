import React, { memo } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  ImageBackground,
} from 'react-native';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import {
  email,
  lock,
  userIcon,
  phone,
  logo,
  rememberImg,
  rememberEmpty,
  username,
  emailIcon,
  passwordIcon,
  company,
  google,
  facebook,
  apple,
  locksetting,
  sms,
  user,
  signupBg,
  logoImg,
  tickSquare,
  homeIcon,
} from '../../Assets';
import { InputComponent } from '../../Components/InputComponent';
import { Controller } from 'react-hook-form';
import { Touchable } from '../../Components/Touchable';
import useRegister from './useRegisterScreen';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { LoginBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { HeaderComponent } from '../../Components/HeaderComp';
import SocialBottomComp from '../../Components/SocialBottomComp';
// import SocialBottomComp from '../../Components/SocialBottomComp';

const RegisterScreen = ({ navigation }) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    goBack,
    loginNav,
    signUpButton,
    PolicyValue,
    policy,
    socialLoginFun,
  } = useRegister(navigation);
  return (
    <ImageBackground source={LoginBg} style={styles.ImgBg}>
      <HeaderComponent isBack />
      {/* <Image source={logoImg} resizeMode="contain" style={styles.logoImage} /> */}
      <KeyBoardWrapper
        styles={styles.logInMain}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={homeIcon}
          resizeMode="contain"
          style={{ width: wp('35'), height: hp('10'), alignSelf: 'center' }}
        />
        <View style={styles.loginTop}>
          <TextComponent
            text={'Create Your Account'}
            styles={styles.signInText}
          />
          <TextComponent
            text={
              'Ready to continue your learning journey \nYour path is right there'
            }
            styles={{
              textAlign: 'center',
              marginTop: hp('2'),
              marginBottom: hp('2'),
            }}
          />
        </View>

        <InputComponent
          {...{
            name: 'full_name',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter full name',
            defaultValue: __DEV__ ? 'first' : '',
            isImage: user,
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.5 },
          }}
        />

        <InputComponent
          {...{
            name: 'email',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter email',
            isImage: sms,
            defaultValue: __DEV__ ? 'dd@gmail.com' : '',
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.5 },
          }}
        />
        <InputComponent
          {...{
            name: 'password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter password',
            isImage: locksetting,
            defaultValue: __DEV__ ? 'Test@123' : '',
            isSecure: true,
            inputIconStyle: styles.lockstyle,
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.4 },
          }}
        />
        <InputComponent
          {...{
            name: 'confirm_password',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter confirm password',
            isImage: locksetting,
            defaultValue: __DEV__ ? 'Test@123' : '',
            isSecure: true,
            inputIconStyle: styles.lockstyle,
            viewStyle: { height: hp('5') },
            inputIconStyle: { flex: 0.4 },
          }}
        />
        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={tickSquare}
            resizeMode="contain"
            style={{ width: wp('5') }}
          />
          <TextComponent
            text={'I agree to the terms of use and privacy policy'}
            fade
            styles={{ fontSize: hp('1.5'), marginLeft: wp('2') }}
          />
        </View> */}
        <View style={{ paddingVertical: hp('5') }}>
          <ThemeButton
            title={'Get Started'}
            // onPress={() => navigation.navigate('HomeScreen')}
            onPress={handleSubmit(signUpButton)}
            style={styles.buttonStyle}
            isTheme
            textStyle={{ fontSize: hp('1.5') }}
          />
        </View>
        {/* <View style={styles.barMain}>
          <View style={styles.barLine}></View>
          <TextComponent
            text={'Or Continue With'}
            styles={styles.barText}
            isThemeColor
            family={'400'}
          />
          <View style={styles.barLine}></View>
        </View> */}
        {/* <SocialBottomComp onSocialPress={socialLoginFun} /> */}
        <View style={styles.dontHave}>
          <TextComponent
            text={'Already have an account?'}
            styles={styles.dontHaveText}
          />
          <Touchable onPress={loginNav}>
            <Text style={styles.signUpText}>Log in</Text>
          </Touchable>
        </View>
      </KeyBoardWrapper>
    </ImageBackground>
  );
};
export default memo(RegisterScreen);
