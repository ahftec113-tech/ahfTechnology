import React, { memo } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import ThemeButton from '../../Components/ThemeButton';
import { afhLogo, logIcon, logOutGray, trash } from '../../Assets';
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
  'OCode',
  'PkgTracking',
  'POCreated',
  'TrackingID',
  'Order.Date',
  'O.TWeight',
  'Ocost',
  'CompanyName',
  'PoTotalAmountOrg',
  'SupplierName',
  'User',
];

const TableDataScreen = ({ navigation, route }) => {
  const { tableArryData, onCodePress, onLogPress, isDate } = useTableDataScreen(
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
        text={`Total Result=${tableArryData?.length ?? ''}`}
        styles={styles.totalResultText}
      />

      {/* Dynamic Vertical Cards */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('40') }}
      >
        {tableArryData &&
          tableArryData.map((order, orderIndex) => (
            <View key={orderIndex} style={styles.cardContainer}>
              {headers.map(
                (key, idx) =>
                  order[key] != null && (
                    <View key={idx} style={styles.totalsRow}>
                      <Text style={styles.totalsText}>{key}</Text>

                      {key === 'Od.Log' ? (
                        <Touchable
                          style={styles.logButton}
                          onPress={() => {
                            // onLogPress({
                            //   odid: order?.odid,
                            //   order_id: order?.order_id,
                            // })

                            navigation.navigate('ListTableScreen', {
                              headerArry: [
                                'LogType',
                                'LogDate',
                                'UserName',
                                'Reason',
                              ],
                              body: {
                                or_log_odid: order?.odid,
                                or_log_order_id: order?.order_id,
                                rqst_ke_fntn_vl: 'order_log_data_view',
                              },
                            });
                          }}
                        >
                          <Image
                            source={logIcon}
                            resizeMode="contain"
                            style={styles.logIcon}
                          />
                        </Touchable>
                      ) : key === 'OCode' || (isDate && key == 'POID') ? (
                        <Text
                          style={styles.codeValue}
                          onPress={() => {
                            if (isDate)
                              navigation.navigate(
                                'POIDDetailsScreen',
                                order?.id,
                              );
                            else
                              navigation.navigate('OrderDetailScreen', {
                                oCode: order?.OCode,
                                orderId: order?.order_id,
                              });
                          }}
                        >
                          {order[key.replace('.', '')] || ''}
                        </Text>
                      ) : (
                        <Text style={styles.totalsValue} numberOfLines={5}>
                          {order[key.replace('.', '')] || ''}
                        </Text>
                      )}
                    </View>
                  ),
              )}
              {!isDate && (
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
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default memo(TableDataScreen);
