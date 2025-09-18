import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Controller } from 'react-hook-form';
import { Colors } from '../Theme/Variables';
import { Touchable } from './Touchable';
import { hp, wp } from '../Hooks/useResponsive';
import { eye, eyeOff } from '../Assets';
import { TextComponent } from './TextComponent';

export const InputComponent = ({
  minLength,
  placeholder,
  isRequired,
  isSecure,
  control,
  name,
  errors,
  type,
  autoCapitalize = 'none',
  defaultValue = '',
  isDisabled,
  maxLength,
  editable,
  viewStyle,
  isImage,
  forPasswordStyle,
  textStyle,
  inputIconStyle,
  inputLines,
  multiline,
  rightText,
  placeholderTextColor,
  selectionColor,
  errorStyle,
  rightIconColor,
  headingStyles,
  heading,
}) => {
  const [show, setShow] = useState(!isSecure);
  const handleClick = () => setShow(!show);
  const keyboardType = ['number', 'reset_code', 'phone', 'zip_code'].includes(
    name,
  )
    ? 'phone-pad'
    : 'default';
  return (
    <>
      {heading && (
        <TextComponent
          text={heading}
          styles={{
            color: 'rgba(0, 0, 0, 0.6)',
            marginBottom: hp('-1'),
            fontSize: hp('1.8'),
            marginTop: hp('2'),
            marginBottom: hp('0.5'),
            ...headingStyles,
          }}
        />
      )}
      <Controller
        render={({ field: { onChange, value } }) => (
          <View style={{ ...styles.textfield, ...viewStyle }}>
            {isImage && (
              <Image
                tintColor={Colors.gray}
                source={isImage}
                style={{
                  resizeMode: 'contain',
                  ...styles.inputIcon,
                  ...inputIconStyle,
                }}
              />
            )}
            <TextInput
              type={type}
              maxLength={maxLength}
              style={{ ...forPasswordStyle }}
              numberOfLines={inputLines}
              multiline={multiline}
              {...{
                value,
                isDisabled,
                selectionColor: selectionColor ?? Colors.gray,
                placeholder,
                keyboardType,
                style: {
                  ...styles.input(isSecure),
                  ...(isImage
                    ? { paddingHorizontal: wp('2'), paddingLeft: wp('3') }
                    : {}),
                  ...textStyle,
                },
                secureTextEntry: !show,
                onChangeText: onChange,
                placeholderTextColor: placeholderTextColor ?? Colors.gray,
                fontSize: hp('1.8'),
                autoCapitalize,
                autoCorrect: false,
                spellCheck: false,
                editable,
              }}
            />
            {isSecure && (
              <Touchable style={styles.eyeContainer} onPress={handleClick}>
                <Image
                  source={show ? eye : eyeOff}
                  style={{
                    resizeMode: 'contain',
                    tintColor: rightIconColor ?? Colors.gray,
                  }}
                />
              </Touchable>
            )}
            {rightText && (
              <TextComponent
                text={'edit'}
                styles={{ color: Colors.textGray, paddingRight: wp('2') }}
              />
            )}
          </View>
        )}
        {...{
          name,
          control,
          defaultValue,
          rules: { required: Boolean(isRequired), minLength },
        }}
      />
      {errors[name]?.message && (
        <View
          style={
            {
              // width: Platform.OS == 'ios' ? width * 0.875 : Sizes.width * 0.9,
              // width: Sizes.width * 0.9,
            }
          }
        >
          <Text style={{ ...styles.error, ...errorStyle }}>
            {errors[name]?.message}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  textfield: {
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 10,
    height: hp('7'),
    // borderRadius: 15,
    marginVertical: hp('1'),
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: Colors.gray,
    marginTop: hp('1'),
    paddingHorizontal: wp('4'),
  },
  input: isSecure => ({
    height: '100%',
    width: isSecure ? '85%' : '90%',
    // paddingHorizontal: wp('2'),
    // paddingLeft: wp('3'),
    fontWeight: '400',
    color: 'black',
  }),
  eyeContainer: {
    width: 15,
    height: 15,
    // top: '30%',
    right: '5%',
    // marginRight: 10,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    fontSize: hp('1.4'),
    marginLeft: wp('3'),
    color: 'red',
  },
  inputIcon: {
    // marginLeft: hp('2'),
    // width: wp('7'),
    flex: 0.3,
  },
});
