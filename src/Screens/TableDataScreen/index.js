import React, { memo } from 'react';
import { View, Text, Image } from 'react-native';
import ThemeButton from '../../Components/ThemeButton';
import { afhLogo, logOutGray, trash } from '../../Assets';
import { store } from '../../Redux/Reducer';
import { logOutAuth } from '../../Redux/Action/AuthAction';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import { Touchable } from '../../Components/Touchable';
import { hp, wp } from '../../Hooks/useResponsive';
import useTableDataScreen from './useTableDataScreen';

// Define dynamic keys you want to show in the card
const headers = [
  'POID',
  'O.Code',
  'PkgTracking',
  'TrackingID',
  'Order.Date',
  'O.TWeight',
];

const TableDataScreen = ({ navigation, route }) => {
  const { tableArryData, onCodePress, onLogPress } = useTableDataScreen(
    navigation,
    route,
  );
  return (
    <View>
      {/* Header Section */}
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

      {/* Title Section */}
      <TextComponent
        text={'Selected Order'}
        styles={styles.selectedOrderText}
      />
      <TextComponent
        text={`Total Result=${tableArryData.length}`}
        styles={styles.totalResultText}
      />

      {/* Dynamic Vertical Cards */}
      {tableArryData.map((order, orderIndex) => (
        <View key={orderIndex} style={styles.cardContainer}>
          {headers.map((key, idx) => (
            <View key={idx} style={styles.totalsRow}>
              <Text style={styles.totalsText}>{key}</Text>

              {key === 'Od.Log' ? (
                <Touchable
                  style={styles.logButton}
                  onPress={() =>
                    onLogPress({
                      odid: order?.odid,
                      order_id: order?.order_id,
                    })
                  }
                >
                  <Image
                    source={trash}
                    resizeMode="contain"
                    style={styles.logIcon}
                  />
                </Touchable>
              ) : key === 'O.Code' ? (
                <Text
                  style={styles.codeValue}
                  onPress={() =>
                    navigation.navigate('OrderDetailScreen', order?.OCode)
                  }
                >
                  {order[key.replace('.', '')] || ''}
                </Text>
              ) : (
                <Text style={styles.totalsValue}>
                  {order[key.replace('.', '')] || ''}
                </Text>
              )}
            </View>
          ))}

          <ThemeButton
            title={'Show more'}
            isTheme
            style={styles.showMoreButton}
            onPress={() =>
              navigation.navigate('OrderListDetailScreen', [
                tableArryData[orderIndex],
              ])
            }
          />
        </View>
      ))}
    </View>
  );
};

export default memo(TableDataScreen);
