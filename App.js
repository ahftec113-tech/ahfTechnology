import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, ImageBackground, LogBox } from 'react-native';
import MainNavigator from './src/Navigation/MainNavigator';
import { splash2 } from './src/Assets';
import { hp, wp } from './src/Hooks/useResponsive';
import useReduxStore from './src/Hooks/UseReduxStore';
import Overlay from './src/Components/Overlay';
import ImagePreviewComp from './src/Components/ImagePreviewComp';

const App = () => {
  const [isVisible, setIsVisible] = useState(true);

  const { getState, dispatch } = useReduxStore();
  const { isloading } = getState('isloading');
  const { image, modalType } = getState('modalState');

  const Hide_Splash_Screen = () => {
    setIsVisible(false);
  };

  // console.log('load', isloading);
  const time = () => {
    return 2000;
  };

  useEffect(async () => {
    (async () => {
      LogBox.ignoreLogs([
        'VirtualizedLists should never be nested',
        'ViewPropTypes will be removed from React Native',
        'Settings is not yet supported on Android',
        'ViewPropTypes will be removed',
        "exported from 'deprecated-react-native-prop-types'.",
        'Sending...',
        'Non-serializable values were found in the navigation state',
      ]);
      LogBox.ignoreAllLogs(true);
    })();
    // await logOutFirebase();
    setTimeout(function () {
      Hide_Splash_Screen();
    }, time());
  }, []);

  // let Splash_Screen = (
  //   <View style={styles.SplashScreen_RootView}>
  //     <Image source={splash} style={styles.image}></Image>
  //   </View>
  // );

  let Splash_Screen = (
    <ImageBackground
      source={splash2}
      style={styles.SplashScreen_RootView}
    ></ImageBackground>
  );

  return (
    <>
      {isVisible === true ? Splash_Screen : <MainNavigator />}
      {modalType && <ImagePreviewComp visible={modalType} images={image} />}
      {isloading && <Overlay />}
      {/* {modalType && <ImagePreviewComp visible={modalType} images={image} />}
      {isloading &&
        Boolean(getNameFunc?.getCurrentRoute()?.name != 'AllEventsScreen') &&
        Boolean(getNameFunc?.getCurrentRoute()?.name != 'HomeScreen') && (
          <Overlay />
        )} 
      {/* <StackNavigatior />; */}
    </>
  );
};

const styles = StyleSheet.create({
  SplashScreen_RootView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  image: {
    width: wp('35'),
    resizeMode: 'contain',
    height: hp('35'),
  },
});

export default App;
