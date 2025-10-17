import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '../Theme/Variables';
import { Touchable } from './Touchable';
import { share } from '@/Assets/Images';
import { hp, wp } from '../Hooks/useResponsive';

const ThemeButton = ({
  title,
  onPress,
  image,
  style,
  textStyle,
  imageStyle,
  isDisable,
  isTheme,
  isTransparent,
  isTopImg,
  topImgStyles,
  isWhite,
  isRight,
  numberOfLine,
}) => {
  const topImgStyle = {
    alignItems: 'center',
    flexDirection: 'colume',
  };
  return (
    // <ShadowButton>
    <Touchable
      Opacity={0.7}
      onPress={onPress}
      disabled={isDisable}
      style={[
        styles.button,
        {
          justifyContent: 'center',
          backgroundColor: isTheme
            ? Colors.primaryColor
            : isTransparent
            ? 'transparent'
            : isWhite
            ? Colors.white
            : Colors.backgroundTheme,
          borderColor: isTransparent ? Colors.primaryColor : 'transperent',
          borderWidth: isTransparent ? 1 : 0,
          ...(isTopImg && topImgStyle),
          ...style,
        },
      ]}
    >
      {isTopImg && (
        <Image
          source={isTopImg}
          style={{
            ...styles.image,
            // marginRight: isTopImg ? wp('1') : 0,
            ...topImgStyles,
          }}
          resizeMode="contain"
        />
      )}
      {image && !isRight && (
        <Image
          source={image}
          style={{
            ...styles.image,
            marginRight: image ? wp('1') : 0,
            ...imageStyle,
          }}
          resizeMode="contain"
        />
      )}
      <Text
        numberOfLines={numberOfLine}
        style={[
          styles.text,
          {
            marginLeft: image ? wp('1') : 0,
            color: isTransparent
              ? Colors.primaryColor
              : isWhite
              ? Colors.primaryColor
              : Colors.white,
            ...textStyle,
          },
        ]}
      >
        {title}
      </Text>
      {image && isRight && (
        <Image
          source={image}
          style={{
            ...styles.image,
            marginLeft: image ? wp('1') : 0,
            ...imageStyle,
          }}
          resizeMode="contain"
        />
      )}
    </Touchable>
    // </ShadowButton>
  );
};

export default ThemeButton;

const styles = StyleSheet.create({
  button: {
    height: hp('5'),
    // width: wp('40'),
    width: '100%',
    borderRadius: 10,
    // marginVertical: 20,
    alignItems: 'center',
    flexDirection: 'row',
    // paddingHorizontal: '22.5%',
    justifyContent: 'center',
  },
  image: {
    width: wp('4'),
    // height: hp('8'),
    // marginBottom: 5,
    resizeMode: 'contain',
  },
  text: {
    // fontSize: heightPercentageToDP('2'),
    color: Colors.white,
    textAlign: 'center',
    fontSize: hp('1.8'),
    // marginRight: wp('3'),
    // fontFamily: FontFamily.regular,
  },
});
