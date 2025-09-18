import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { useDrawer } from '../Context/DrawerContext';
import DrawerContentComp from './DrawerContentComp';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerComp = ({ children }) => {
  const drawerRef = useRef(null);
  const drawerWidth = SCREEN_WIDTH * 0.7;
  const [isOpen, setIsOpen] = useState(false);
  const { setDrawerRef } = useDrawer();

  useEffect(() => {
    setDrawerRef({
      openDrawer,
      closeDrawer,
    });
  }, []);

  const openDrawer = () => {
    setIsOpen(true);
    if (drawerRef.current) {
      drawerRef.current.fadeInLeft(250);
    }
  };

  const closeDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.fadeOutLeft(250).then(() => {
        setIsOpen(false);
      });
    }
  };

  return (
    <View style={styles.container}>
      {children}

      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDrawer}
        />
      )}

      {isOpen && (
        <Animatable.View
          ref={drawerRef}
          style={[styles.drawerContainer, { width: drawerWidth }]}
          duration={250}
          useNativeDriver
        >
          <DrawerContentComp closeDrawer={closeDrawer} />
        </Animatable.View>
      )}
    </View>
  );
};

export default CustomDrawerComp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.white,
    zIndex: 999,
    paddingTop: hp('5'),
    // paddingHorizontal: wp('4'),
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#00000070',
    zIndex: 998,
  },
});
