import React from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  Platform,
  TextInput,
} from 'react-native';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';
import { arrowLeft, drawerIcon } from '../Assets'; // Removed unused imports
import { Colors } from '../Theme/Variables';
import NavigationService from '../Services/NavigationService';
import { hp, wp } from '../Hooks/useResponsive';
import { useDrawer } from '../Context/DrawerContext';

export const HeaderComponent = ({
  headerTitle,
  style,
  saveReset,
  icon,
  backText,
  saveResetStyle,
  goBack,
  backTextStyle,
  titleStyle,
  numberOfLines,
  isBack,
  rightIconStyle,
  onRightPress,
  backIconStyle,
  rightIconImg,
  isSearch,
  searchVal,
  setSearchVal,
  searchBoxPlaceholder,
  isAnotherRightChildern,
  isAllowSearch,
  onLeftIcon,
  isLeftIcon,
  rightText,
  rightTextStyle,
}) => {
  const { openDrawer } = useDrawer();
  return (
    <View style={[styles.TopHeader, { ...style }]}>
      <View style={styles.HeaderLeft}>
        {isLeftIcon && (
          <Touchable
            onPress={openDrawer}
            style={styles.backMain}
            disabled={!isLeftIcon}
          >
            <Image
              source={drawerIcon}
              style={{
                resizeMode: 'contain',
                tintColor: 'black',
                ...styles.arrowback,
                ...backIconStyle,
              }}
            />
          </Touchable>
        )}
        {isBack && (
          <Touchable
            onPress={() => (goBack ? goBack() : NavigationService.goBack())}
            style={styles.backMain}
            disabled={!isBack}
          >
            {isBack && (
              <Image
                source={arrowLeft}
                style={{
                  resizeMode: 'contain',
                  tintColor: 'black',
                  ...styles.arrowback,
                  ...backIconStyle,
                }}
              />
            )}
            <TextComponent
              text={backText}
              styles={{ ...styles.backBtn, ...backTextStyle }}
            />
          </Touchable>
        )}
      </View>
      <View style={styles.HeaderCenter}>
        {isSearch ? (
          <View style={styles.inputView}>
            <TextInput
              style={{ width: wp('80'), color: 'white' }}
              placeholder={searchBoxPlaceholder ?? 'Search'}
              placeholderTextColor={'gray'}
              value={searchVal}
              onChangeText={e => setSearchVal(e)}
              returnKeyType="search"
              onEndEditing={onRightPress}
            />
          </View>
        ) : (
          <TextComponent
            text={headerTitle}
            numberOfLines={numberOfLines ?? 1}
            styles={{ ...styles.HeaderTitle, ...titleStyle }}
          />
        )}
      </View>
      <View style={styles.HeaderRight}>
        {icon && (
          <Touchable style={styles.styleCheck} onPress={onRightPress}>
            <Image
              source={icon}
              style={{ ...styles.filterIcon, ...rightIconStyle }}
            />
          </Touchable>
        )}
        <Touchable style={styles.backMain} onPress={onRightPress}>
          {rightIconImg && (
            <Image
              source={rightIconImg ?? saveReset}
              style={{ ...styles.filterIcon, ...rightIconStyle }}
            />
          )}
          {rightText && (
            <TextComponent
              text={rightText}
              styles={{ ...styles.backBtn, ...rightTextStyle }}
              size={'1.5'}
              family={'bold'}
            />
          )}
          {isAnotherRightChildern}
        </Touchable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TopHeader: {
    flexDirection: 'row',
    paddingHorizontal: wp('3.5'),
    paddingBottom: hp('3'),
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'ios' ? hp('10') : hp('2'), // Increased for better top spacing
    height: Platform.OS === 'ios' ? hp('13') : hp('7'), // Increased height
    alignItems: 'center',
  },
  backMain: {
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'left',
  },
  backBtn: {
    marginLeft: wp('1.5'),
    color: Colors.black,
    // fontSize: hp('2'),
    // Removed top: hp('3') for vertical alignment
  },
  HeaderTitle: {
    fontSize: hp('1.8'),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginTop: hp('0.5'), // Restored top spacing
  },
  HeaderLeft: {
    width: wp('20'),
  },
  arrowback: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    width: wp('6'),
  },
  filterIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    width: wp('7'),
    resizeMode: 'contain',
    height: hp('3'),
    marginLeft: wp('2'),
  },
  inputView: {
    width: wp('80'),
    height: hp('5'),
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    paddingHorizontal: wp('3'),
    marginRight: wp('5'),
    marginTop: Platform.OS === 'android' ? hp('-0.5') : hp('-1'), // Adjusted for better alignment
  },
  styleCheck: {
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center',
    width: wp('7'),
    marginRight: wp('1'),
  },
  HeaderCenter: {
    width: wp('54'), // Adjusted to fit within wp('100') with padding
    alignItems: 'center',
    height: hp('5'),
    textAlign: 'center',
    marginTop: hp('1'), // Restored top spacing
  },
  HeaderRight: {
    width: wp('20'), // Adjusted to fit within wp('100') with padding
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    height: hp('5'),
  },
});
