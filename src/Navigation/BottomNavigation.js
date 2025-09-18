import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, Dimensions, StyleSheet, Image } from 'react-native';
import * as Screens from '../Screens/index';
import { Colors } from '../Theme/Variables';
// import Orientation from 'react-native-orientation-locker';
import {
  home1,
  home,
  message,
  message1,
  notification1,
  notification,
  setting1,
  setting,
  bell,
  sosImage,
  heart,
  addcircle,
  messages,
  messageOut,
  searchBottom,
  searchFill,
  searchNormal,
  userFill,
  userBlack,
  unfilledCalender,
  groupBlack,
  circleCalFilled,
  chatDotFill,
  chatDotTransparent,
  location,
  menu,
  order,
  homeGray,
  homeGreen,
  ProjectGray,
  ProjectGreen,
  discoverGray,
  discoverGreen,
  heartGreen,
  ProfileGreen,
  ProfileGray,
  heartGray,
  plusBlue,
  plusCircle,
  plusWhite,
  plusGray,
  buildingGray,
} from '../Assets';
import { types } from '../Redux/types';
import useReduxStore from '../Hooks/UseReduxStore';
import { VerifyUserUrl } from '../Utils/Urls';
import { fetchGetWithToken } from '../Utils/helperFunc';
import { hp, wp } from '../Hooks/useResponsive';

globalStyles = {};
const isIOS = Boolean(Platform.OS == 'ios');
const tabarComponent = (
  title,
  activeImage,
  unActiveImage,
  ImageStyle,
  notUseTint,
) => {
  return {
    tabBarIcon: ({ focused }) => {
      const tintColor = !notUseTint
        ? {
            tintColor: focused ? Colors.primaryColor : Colors.gray,
          }
        : {};

      return (
        <View style={styles.tabarView}>
          <Image
            style={{
              ...styles.imgstyle,
              ...ImageStyle,
              ...tintColor,
            }}
            source={focused ? activeImage : unActiveImage}
          />
        </View>
      );
    },
    title,
  };
};

const Tab = createBottomTabNavigator();

function MybottomTabs() {
  const { getState, dispatch } = useReduxStore();
  const { isLogin } = getState('Auth');

  //   const { isChatNotify } = getState('isChatNotify');

  //   fetchGetWithToken(VerifyUserUrl);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarInactiveTintColor: Colors.gray, // Your inactive text color
        headerShown: false,
        tabBarActiveBackgroundColor: 'white',
        tabBarInactiveBackgroundColor: 'white',
        tabBarHideOnKeyboard: true,
        swipeEnabled: true,
        animationEnabled: true,
        tabBarAllowFontScaling: true,
        tabBarItemStyle: {
          width: 'auto',
        },
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: 'white',
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          height: hp('9'),
          paddingBottom: hp('1.5'),
          // bottom: Platform.OS == 'ios' ? hp('1.7') : hp('1.5'),
          width: wp('100'),
          alignSelf: 'center',
          // backfaceVisibility:'hidden',
          // overflow: 'hidden',
          marginTop: hp('-2'),
        },
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        options={tabarComponent('Home', homeGreen, homeGray)}
        component={Screens.HomeScreen}
      />
      <Tab.Screen
        name="ProjectsScreen"
        options={tabarComponent('Projects', ProjectGray, ProjectGreen)}
        component={Screens.ProjectsScreen}
      />
      <Tab.Screen
        name="MyLocationScreen"
        options={tabarComponent('Add', plusGray, plusGray)}
        component={
          isLogin ? Screens.CreateListingScreen : Screens.WelcomeScreen
        }
      />
      <Tab.Screen
        name="MyProjectsScreen"
        options={tabarComponent('My ads', buildingGray, buildingGray)}
        component={isLogin ? Screens.MyProjectsScreen : Screens.WelcomeScreen}
      />

      <Tab.Screen
        name="Profile"
        options={tabarComponent('Profile', ProfileGray, ProfileGreen)}
        component={isLogin ? Screens.ProfileScreen : Screens.WelcomeScreen}
      />
    </Tab.Navigator>
  );
}
export default MybottomTabs;

const styles = StyleSheet.create({
  badgeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: hp('1.5'),
    backgroundColor: Colors.badgeColor,
  },
  // tabarTitle: {

  // },
  tabarView: (focused, last) => ({
    width: 'auto',
    backgroundColor: 'transparent',
    bottom: hp('0.5'),
  }),

  imgstyle: {
    resizeMode: 'contain',
    width: wp('5'),
  },
});
