import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import {
  about,
  aboutGray,
  arrRight,
  buildingGray,
  callGray,
  discoverGray,
  draftGray,
  heartGray,
  homeGray,
  homeIcon,
  logout,
  logOutGray,
  myPropertyGray,
  phone,
  plusBlue,
  plusGray,
  ProjectGray,
  setting,
  settingGray,
  termGray,
  terms,
} from '../Assets';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';
import NavigationService from '../Services/NavigationService';
import { useDrawer } from '../Context/DrawerContext';
import { privacyUrl, termsUrl } from '../Utils/Urls';
import { openBrowser } from '@swan-io/react-native-browser';
import useReduxStore from '../Hooks/UseReduxStore';
import { logOutAuth } from '../Redux/Action/AuthAction';

const DrawerContentComp = ({ closeDrawer, selectScreenName }) => {
  const { getState, dispatch } = useReduxStore();
  const { isLogin } = getState('Auth');

  const getRouteName = NavigationService.getCurrentRoute();
  const routeName = getRouteName.getCurrentRoute();
  console.log('getRouteNamegetRouteNamegetRouteNamegetRouteName', routeName);

  useEffect(() => {
    const subscription = Linking.addListener('url', ({ url }) => {
      const { protocol, host, query } = parseUrl(url, true);
      const origin = `${protocol}//${host}`;

      if (origin === 'com.company.myapp://close') {
        console.log(JSON.stringify(query, null, 2));
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const handleOnPress = useCallback(url => {
    openBrowser(url).catch(error => console.error(error));
  }, []);

  const [selectedState, setSelectedState] = useState('home');
  const drawerItems = [
    {
      id: 1,
      key: 'HomeScreen',
      name: 'Home',
      icon: homeGray,
      routeName: 'HomeScreen',
    },
    // { id: 2, key: 'addProperty', name: 'Add Property', icon: plusGray },
    {
      id: 3,
      key: 'FilterScreen',
      name: 'Search Property',
      icon: discoverGray,
      routeName: 'FilterScreen',
    },
    {
      id: 4,
      key: 'ProjectsScreen',
      name: 'New Projects',
      icon: buildingGray,
      routeName: 'ProjectsScreen',
    },
    {
      id: 5,
      key: 'FavouriteScreen',
      name: 'Favorites',
      icon: heartGray,
      routeName: 'FavorateScreen',
    },
  ];

  const drawerItemsProperty = [
    // { id: 1, key: 'myProperties', name: 'My Properties', icon: myPropertyGray },
    // { id: 2, key: 'draft', name: 'Drafts', icon: draftGray },
  ];

  const drawerItemsControls = [
    // { id: 1, key: 'setting', name: 'Setting', icon: settingGray },
    {
      id: 3,
      key: 'contactUs',
      name: 'Privacy policy',
      icon: aboutGray,
      url: privacyUrl,
    },
    {
      id: 4,
      key: 'term',
      name: 'Terms & conditions',
      icon: termGray,
      url: termsUrl,
    },
    isLogin && {
      id: 5,
      key: 'logout',
      name: 'Logout',
      icon: logOutGray,
      onPress: () => dispatch(logOutAuth()),
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={homeIcon}
        resizeMode="contain"
        style={styles.headerImage}
      />
      {/* <TextComponent
        text={'Bilal Zahid'}
        size={'2.5'}
        family={'bold'}
        styles={{
          marginLeft: wp('4'),
        }}
      />
      <View style={styles.profileRow}>
        <TextComponent
          text={'View Profile'}
          isThemeColor
          size={'1.5'}
          family={'bold'}
        />
        <Image
          source={arrRight}
          resizeMode="contain"
          style={styles.profileArrow}
          tintColor={Colors.primaryColor}
        />
      </View> */}

      {drawerItems.map(res => (
        <Touchable
          key={res.id}
          style={styles.menuItem(
            Boolean(res?.key == (routeName?.name ?? selectedState)),
          )}
          onPress={() => {
            setSelectedState(res?.key);
            closeDrawer();
            NavigationService.navigate(res?.routeName, {
              selectedCountry: {},
              selectedCity: {},
              selectedArea: {},
              selectedType: {},
            });
          }}
        >
          <Image
            source={res.icon}
            resizeMode="contain"
            style={styles.menuIcon}
            tintColor={
              Boolean(res?.key == (routeName?.name ?? selectedState))
                ? Colors.white
                : 'gray'
            }
          />
          <TextComponent
            text={res?.name}
            size={'1.5'}
            isWhite={Boolean(res?.key == (routeName?.name ?? selectedState))}
            family={'300'}
          />
        </Touchable>
      ))}

      {/* <TextComponent
        text={'PROPERTY & QUOTA'}
        size={'1.5'}
        styles={styles.sectionTitle}
      /> */}

      {drawerItemsProperty.map(res => (
        <Touchable
          key={res.id}
          style={styles.menuItem(Boolean(res?.key == selectedState))}
          onPress={() => setSelectedState(res?.key)}
        >
          <Image
            source={res.icon}
            resizeMode="contain"
            style={styles.menuIcon}
            tintColor={
              Boolean(res?.key == selectedState) ? Colors.white : 'gray'
            }
          />
          <TextComponent
            text={res?.name}
            size={'1.5'}
            isWhite={Boolean(res?.key == selectedState)}
            family={'300'}
          />
        </Touchable>
      ))}

      <TextComponent
        text={'CONTROLS'}
        size={'1.5'}
        styles={styles.sectionTitle}
      />

      {drawerItemsControls.map(res => (
        <Touchable
          key={res.id}
          style={styles.menuItem(Boolean(res?.key == selectedState))}
          onPress={() => {
            closeDrawer();
            if (res?.onPress) {
              res?.onPress();
            } else handleOnPress(res.url);
          }}
        >
          <Image
            source={res.icon}
            resizeMode="contain"
            style={styles.menuIcon}
            tintColor={
              Boolean(res?.key == selectedState) ? Colors.white : 'gray'
            }
          />
          <TextComponent
            text={res?.name}
            size={'1.5'}
            isWhite={Boolean(res?.key == selectedState)}
            family={'300'}
          />
        </Touchable>
      ))}
    </ScrollView>
  );
};

export default DrawerContentComp;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: hp('10'),
  },
  headerImage: {
    width: wp('40'),
    height: hp('10'),
    marginLeft: wp('4'),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
    marginLeft: wp('4'),
  },
  profileArrow: {
    width: wp('4'),
    height: hp(4),
    marginLeft: wp('1'),
  },
  menuItem: isSelected => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isSelected ? Colors.primaryColor : 'white',
    width: wp('70'),
    paddingVertical: hp('1'),
    paddingHorizontal: wp('4'),
  }),
  menuIcon: {
    width: wp('4'),
    height: hp('4'),
    marginRight: wp('5'),
  },
  sectionTitle: {
    marginVertical: hp('2'),
    marginLeft: wp('4'),
    fontWeight: 'bold',
  },
});
