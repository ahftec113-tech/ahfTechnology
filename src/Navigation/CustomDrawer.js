import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';

import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomDrawerContent(props) {
  const { state, progress, navigation } = props;
  const { index, routes } = state;

  return (
    <View style={[styles.container]}>
      <SafeAreaView style={styles.imageContainer} edges={['top']}>
        {/* If you want to use ImageBackground, uncomment and fix this block:
        <ImageBackground
          source={require('../images/ElectricalServices.png')}
          style={styles.drawerImage}
          imageStyle={styles.imageStyle}
          resizeMode="cover"
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
            style={styles.imageGradient}
          />
        </ImageBackground> */}
      </SafeAreaView>

      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContentContainerStyle}
      >
        {routes.map((route, position) => {
          const isFocused = index === position;

          return (
            <DrawerItem
              key={route.key}
              label={({ focused }) => (
                <Text style={focused ? styles.activeText : styles.inactiveText}>
                  {route.name}
                </Text>
              )}
              style={
                isFocused ? styles.activeContainer : styles.inActiveContainer
              }
              onPress={() => navigation.navigate(route.name)}
              focused={isFocused}
              activeBackgroundColor="transparent"
            />
          );
        })}
      </DrawerContentScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContentContainerStyle: {
    paddingTop: 0,
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: wp(16),
    marginVertical: wp(8),
  },
  drawerImage: {
    width: wp(32),
    height: wp(32),
  },
  imageStyle: {
    borderRadius: wp(16),
  },
  imageGradient: {
    flex: 1,
    borderRadius: wp(16),
  },
  activeContainer: {
    borderLeftWidth: wp(1.06),
    borderLeftColor: '#00b8d4',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: wp(0.8),
    marginTop: 0,
  },
  activeText: {
    fontWeight: 'bold',
    color: '#00b8d4',
    backgroundColor: 'transparent',
  },
  inActiveContainer: {
    borderLeftWidth: wp(1.06),
    borderLeftColor: 'transparent',
    backgroundColor: 'transparent',
    borderRadius: wp(0.8),
    marginTop: 0,
  },
  inactiveText: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
  },
});
