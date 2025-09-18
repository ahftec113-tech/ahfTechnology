import { View, Image, Dimensions, ScrollView, StyleSheet } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import ThemeButton from '../../Components/ThemeButton';
import { CircleImage } from '../../Components/CircleImage';
import { Colors } from '../../Theme/Variables';
import { home, homeRed } from '../../Assets';
import { profilesBottomBtn, profilesBtn } from '../../Utils/localDB';
import { styles } from './styles';
import useProfileScreen from './useProfileScreen';
import { Touchable } from '../../Components/Touchable';

const ProfileScreen = ({ navigation }) => {
  const { userData } = useProfileScreen();

  const CircleBtnComp = ({ item }) => {
    return (
      <Touchable style={styles.circleBtn} onPress={item?.onPress}>
        <Image
          source={item?.icon}
          resizeMode="contain"
          style={styles.circleBtnImage}
        />
        <TextComponent
          text={item?.label}
          size={'1.2'}
          family={'400'}
          fade
          styles={styles.circleBtnText}
        />
      </Touchable>
    );
  };

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={'Profile'} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info */}
        <View style={styles.profileRow}>
          <View style={styles.profileInfo}>
            <TextComponent text={userData?.name} family={'bold'} />
            {/* <ThemeButton
              title={userData?.name}
              style={styles.basicBtn}
              isTheme
            /> */}
          </View>
          <CircleImage
            uri
            image={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
            size={0.15}
          />
        </View>

        {/* Top Circle Buttons */}
        <View style={styles.circleBtnContainer}>
          {profilesBtn.map((res, index) => (
            <CircleBtnComp key={index} item={res} />
          ))}
        </View>

        {/* Post an Ad Card */}
        <View style={styles.postAdContainer}>
          <View style={styles.postAdInner}>
            <Image
              source={homeRed}
              resizeMode="contain"
              style={styles.postAdImage}
            />
            <TextComponent
              text={'Looking to sell or rent out your property?'}
              fade
              size={'1.5'}
            />
          </View>
          <TextComponent
            text={'Post an Ad'}
            isWhite
            family={'400'}
            styles={styles.postAdText}
            onPress={() => navigation.navigate('CreateListingScreen')}
          />
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomBtnContainer}>
          {profilesBottomBtn.map((res, index) => {
            return (
              <ThemeButton
                key={index}
                image={res.icon}
                title={res.label}
                isTransparent
                style={styles.bottomBtn}
                textStyle={{ color: Colors.gray }}
                onPress={res?.onPress}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default memo(ProfileScreen);
