import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Animated,
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerStatus,
} from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MybottomTabs from './BottomNavigation';
import { Colors } from '../Theme/Variables';
import CustomDrawerContent from './CustomDrawer';
import * as Screens from '../Screens/index';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerContent = props => {
  const [iconColor, setIconColor] = useState('white');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIconColor(Colors.primaryColor);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isDrawerOpen = useDrawerStatus() === 'open';

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
      scrollEnabled={false}
    >
      <Text
        style={{
          fontSize: hp('5'),
          marginLeft: wp('5'),
          color: 'white',
          marginTop: hp('2'),
        }}
      >
        Menu
      </Text>
      <View
        style={{
          justifyContent: 'space-between',
          height: hp('85'),
        }}
      >
        {/* <View style={{ marginTop: hp('5'), marginLeft: wp('2') }}>
          <DrawerItem
            // icon={({ size }) => (
            //   <Ionicons
            //     name="ios-stopwatch-outline"
            //     size={size}
            //     color={iconColor}
            //   />
            // )}
            label="Availability"
            labelStyle={styles.drawerLblStyle}
            onPress={() => console.log('Availability')}
          />
          <DrawerItem
            // icon={({ size }) => (
            //   <Ionicons
            //     name="lock-closed-outline"
            //     size={size}
            //     color={iconColor}
            //   />
            // )}
            label="Change Password"
            labelStyle={styles.drawerLblStyle}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('ChangePasswordScreen');
            }}
          />
          <DrawerItem
            // icon={({ size }) => (
            //   <Ionicons
            //     name="notifications-outline"
            //     size={size}
            //     color={iconColor}
            //   />
            // )}
            label="Notification"
            labelStyle={styles.drawerLblStyle}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('NotificationScreen');
            }}
          />
          <DrawerItem
            // icon={({ size }) => (
            //   <MaterialIcons name="event-note" size={size} color={iconColor} />
            // )}
            label="Terms of Service"
            labelStyle={styles.drawerLblStyle}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('TermOfServices');
            }}
          />
          <DrawerItem
            // icon={({ size }) => (
            //   <MaterialIcons name="event-note" size={size} color={iconColor} />
            // )}
            label="Privacy Policy"
            labelStyle={styles.drawerLblStyle}
            onPress={() => {
              props.navigation.closeDrawer();
              props.navigation.navigate('PrivacyPolicy');
            }}
          />
        </View>
        <DrawerItem
          //   icon={({ size }) => (
          //     <Ionicons name="log-in-outline" size={size} color={iconColor} />
          //   )}
          style={{
            bottom: hp('0'),
            marginLeft: wp('5'),
          }}
          label="Logout"
          labelStyle={styles.drawerLblStyle}
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate('CaptainLoginScreen');
          }}
        /> */}
      </View>
    </DrawerContentScrollView>
  );
};

const Drawernavigation = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: styles.drawerStyles,
        sceneContainerStyle: styles.scene,
      }}
      drawerContent={props => <DrawerContent {...props} />}
    >
      <Drawer.Screen name="MybottomTabs" component={MybottomTabs} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  scene: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
    backgroundColor: 'transparent',
  },
  drawerStyles: {
    flex: 1,
    width: '50%',
    backgroundColor: 'transparent',
    color: 'yellow',
  },
  drawerLblStyle: {
    fontWeight: '500',
    fontSize: hp('2'),
    color: 'white',
  },
});

export default Drawernavigation;
