import React from 'react';
import { Text } from 'react-native';
import { hp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';

export const TextComponent = ({
  text,
  styles,
  onPress,
  numberOfLines,
  fade,
  isWhite,
  isThemeColor,
  isLightThemeColor,
  isDarkTheme,
  isGreen,
  size,
  isDarkFade,
  family,
}) => {
  return (
    <Text
      onPress={onPress}
      numberOfLines={numberOfLines}
      android_disableSound={true}
      suppressHighlighting={true} // This is specifically for iOS but might help
      style={{
        color: fade
          ? Colors.textGray
          : isWhite
          ? Colors.white
          : isThemeColor
          ? Colors.primaryColor
          : isLightThemeColor
          ? Colors.primaryColor
          : isDarkTheme
          ? Colors.backgroundTheme
          : isGreen
          ? Colors.secondryColor
          : isDarkFade
          ? 'gray'
          : Colors.black,
        fontSize: hp(size ?? '2'),
        fontWeight: family ?? '300',
        ...styles,
      }}
    >
      {text}
    </Text>
  );
};
