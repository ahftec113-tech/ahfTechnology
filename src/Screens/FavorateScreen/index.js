import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { PakFlag } from '../../Assets';
import DynamicTopBarNavigator from '../../Navigation/TopBarTabsNavigation';
import favScreen from './favScreen';
import savedSearchScreen from './savedSearchSCreen';
import { Colors } from '../../Theme/Variables';
import { wp } from '../../Hooks/useResponsive';
import useFavorateScreen from './useFavorateScreen';
import { useDrawer } from '../../Context/DrawerContext';

const FavorateScreen = ({ navigation, route }) => {
  const myScreens = [
    { name: 'Favorites', component: favScreen },
    { name: 'Saved Searches', component: savedSearchScreen },
  ];
  const { openDrawer } = useDrawer();

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderComponent headerTitle={'Favorites'} isBack />
      {favScreen({ navigation, route })}
      {/* <DynamicTopBarNavigator
        screens={myScreens}
        navigatorProps={{
          initialRouteName: 'Favorites',
          screenOptions: {
            tabBarIndicatorStyle: {
              backgroundColor: Colors.primaryColor,
              alignItem: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
            },
          },
        }}
      /> */}
    </View>
  );
};

export default memo(FavorateScreen);
