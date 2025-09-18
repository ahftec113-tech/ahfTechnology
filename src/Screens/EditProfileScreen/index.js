import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { CircleImage } from '../../Components/CircleImage';
import { hp, wp } from '../../Hooks/useResponsive';
import { Touchable } from '../../Components/Touchable';
import { callGray, lock, upload, uploadBtn, user } from '../../Assets';
import KeyBoardWrapper from '../../Components/KeyBoardWrapper';
import { InputComponent } from '../../Components/InputComponent';
import useEditProfileScreen from './useEditProfileScreen';
import { styles } from './styles';
import { Colors } from '../../Theme/Variables';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';

const EditProfileScreen = ({ navigation }) => {
  const {
    handleSubmit,
    errors,
    reset,
    control,
    getValues,
    userData,
    profileUPdate,
  } = useEditProfileScreen(navigation);
  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Edit Profile'} isBack />
      <View style={{ alignSelf: 'center', marginTop: hp('5') }}>
        <CircleImage
          uri={true}
          image={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
          size={0.4}
        />
        {/* <Touchable
          style={{ position: 'absolute', right: wp('-3'), bottom: hp('2') }}
        >
          <Image
            source={upload}
            resizeMode="contain"
            style={{ width: wp('10'), height: hp('5') }}
          />
        </Touchable> */}
      </View>
      <KeyBoardWrapper
        styles={styles.logInMain}
        showsVerticalScrollIndicator={false}
      >
        <InputComponent
          {...{
            name: 'name',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter Name',
            isImage: user,
            defaultValue: userData?.name,
            viewStyle: { height: hp('5'), marginTop: hp('10') },
            inputIconStyle: { flex: 0.4 },
          }}
        />
        {userData?.role == 1 && (
          <InputComponent
            {...{
              name: 'phone',
              handleSubmit,
              errors,
              reset,
              control,
              getValues,
              placeholder: 'Enter phone number',
              isImage: callGray,
              defaultValue: userData?.phone,
              viewStyle: { height: hp('5'), marginTop: hp('2') },
              inputIconStyle: { flex: 0.4 },
            }}
          />
        )}
        <InputComponent
          {...{
            name: 'passsword',
            handleSubmit,
            errors,
            reset,
            control,
            getValues,
            placeholder: 'Enter new passsword',
            isImage: lock,
            // defaultValue: userData?.pass,
            viewStyle: { height: hp('5'), marginTop: hp('2') },
            inputIconStyle: { flex: 0.4 },
            isSecure: true,
          }}
        />
        {/* <Touchable
          style={{
            width: wp('92'),
            paddingVertical: hp('1'),
            paddingHorizontal: wp('2'),
            borderRadius: 10,
            borderWidth: 0.5,
            borderColor: Colors.dkBorderColor,
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: hp('2'),
          }}
        >
          <Image
            source={lock}
            resizeMode="contain"
            style={{ width: wp('5'), height: hp('3'), marginRight: wp('3') }}
            tintColor={'gray'}
          />
          <TextComponent text={'****************'} />
        </Touchable> */}
        <ThemeButton
          title={'Update Profile'}
          style={{ marginTop: hp('30') }}
          onPress={handleSubmit(profileUPdate)}
        />
      </KeyBoardWrapper>
    </View>
  );
};

export default memo(EditProfileScreen);
