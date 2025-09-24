import { View, Text, Image, ImageBackground } from 'react-native';
import React, { memo } from 'react';
import ThemeButton from '../../Components/ThemeButton';
import { afhLogo, LoginBg, logOutGray } from '../../Assets';
import { store } from '../../Redux/Reducer';
import { logOutAuth } from '../../Redux/Action/AuthAction';
import { styles } from './styles';

const FormDisplayScreen = () => {
  return (
    <ImageBackground source={LoginBg} style={{ flex: 1 }}>
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
    </ImageBackground>
  );
};

export default memo(FormDisplayScreen);
