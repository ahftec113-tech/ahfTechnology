import { View, Text, ImageBackground, Image } from 'react-native';
import React, { memo } from 'react';
import { homeBg, homeIcon, welcomeBg } from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { styles } from './styles';

const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={welcomeBg}
      style={styles.imageBackground}
      resizeMode="contain"
    >
      <Image source={homeIcon} resizeMode="contain" style={styles.homeIcon} />
      <TextComponent
        text={'Welcome'}
        family={'600'}
        styles={styles.welcomeText}
        size={'3'}
      />
      <TextComponent
        text={'Hi There'}
        family={'600'}
        styles={styles.hiThereText}
      />
      <TextComponent
        text={"We're here to you learn new skills"}
        family={'600'}
        styles={styles.learnSkillsText}
      />
      <TextComponent
        text={'The Choice is your log in or create an account'}
        family={'600'}
        styles={{
          fontStyle: 'italic',
        }}
      />
      <ThemeButton
        title={'Log in'}
        isWhite
        style={styles.createAccountButton}
        onPress={() => navigation.navigate('LoginScreen')}
      />
      <ThemeButton
        title={'Create Account'}
        isTheme
        onPress={() => navigation.navigate('RegisterScreen')}
      />
    </ImageBackground>
  );
};

export default memo(WelcomeScreen);
