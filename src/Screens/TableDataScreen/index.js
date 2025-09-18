import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import ThemeButton from '../../Components/ThemeButton';
import { afhLogo, logOutGray } from '../../Assets';
import { store } from '../../Redux/Reducer';
import { logOutAuth } from '../../Redux/Action/AuthAction';
import { styles } from './styles';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';

const TableDataScreen = () => {
  return (
    <View>
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
      <TextComponent text={'Selected Order'} styles={{ textAlign: 'center' }} />
      <TextComponent
        text={'Total Result=2'}
        styles={{ textAlign: 'center', marginTop: hp('1') }}
      />
      {Object.entries({
        'Item Total Cost': 'detailDat',
        'Shipping Cost': 'detailData',
        'Tax Cost': 'detailDat',
        'Order Total Cost': 'detailDa',
        'Item Total Selling': 'detailData',
        'Shipping Charges': 'detailDat',
        Tax: 'detailDat',
        'Order Total Selling': 'detailD',
      }).map(([key, value]) => (
        <View style={styles.totalsRow} key={key}>
          <Text style={styles.totalsText}>{key}</Text>
          <Text style={styles.totalsValue}>{value}</Text>
        </View>
      ))}
      <ThemeButton
        title={'Show more'}
        isTheme
        style={{ width: wp('50'), alignSelf: 'center', marginTop: hp('2') }}
      />
    </View>
  );
};

export default memo(TableDataScreen);
