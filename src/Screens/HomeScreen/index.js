import { View, Text, Image, ImageBackground } from 'react-native';
import React, { memo } from 'react';
import { hp, wp } from '../../Hooks/useResponsive';
import {
  afhLogo,
  arrRightPurple,
  homeBg,
  issueForm,
  logOutGray,
  orderBox,
  purchaseOrder,
} from '../../Assets';
import { TextComponent } from '../../Components/TextComponent';
import { Colors } from '../../Theme/Variables';
import { styles } from './styles';
import useHoemScreen from './useHomeScreen';
import { Touchable } from '../../Components/Touchable';
import ThemeButton from '../../Components/ThemeButton';
import { logOutAuth } from '../../Redux/Action/AuthAction';
import { store } from '../../Redux/Reducer';

const HomeScreen = ({ navigation }) => {
  const {} = useHoemScreen(navigation);

  return (
    <ImageBackground style={styles.mainContainer} source={homeBg}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Image source={afhLogo} resizeMode="contain" style={styles.logo} />
        <ThemeButton
          isTheme
          style={styles.logoutButton}
          imageStyle={styles.logoutImage}
          image={logOutGray}
          title={'Log Out'}
          onPress={() => store.dispatch(logOutAuth())}
        />
      </View>

      {/* Order Browser Main Button */}
      <ThemeButton
        title={'Order Browser'}
        image={orderBox}
        isWhite
        imageStyle={styles.orderImage}
        style={styles.orderButton}
        onPress={() => navigation.navigate('OrderBrowserScreen')}
      />
      <ThemeButton
        title={'Issue Form'}
        image={issueForm}
        isWhite
        imageStyle={styles.orderImage}
        style={styles.orderButton}
        // onPress={() => navigation.navigate('OrderBrowserScreen')}
      />
      <ThemeButton
        title={'Purchase Order Browser'}
        image={purchaseOrder}
        isWhite
        imageStyle={styles.orderImage}
        style={styles.orderButton}
        // onPress={() => navigation.navigate('OrderBrowserScreen')}
      />

      {/* Touchable Navigate */}
      {/* <Touchable
        style={styles.orderTouchable}
      >
        <TextComponent text={'Order Browser'} family={'bold'} />
        <Image
          source={arrRightPurple}
          resizeMode="contain"
          style={styles.arrowIcon}
        />
      </Touchable> */}
    </ImageBackground>
  );
};

export default memo(HomeScreen);
