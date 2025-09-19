import { View, Text, Image } from 'react-native';
import React, { memo } from 'react';
import useOrderListDetailScreen from './useOrderListDetailScreen';
import { HeaderComponent } from '../../Components/HeaderComp';
import { Touchable } from '../../Components/Touchable';
import { trash } from '../../Assets';
import { styles } from './styles';

const OrderListDetailScreen = ({ navigation, route }) => {
  const headers = [
    'POID',
    'O.Code',
    'Od.Log',
    'Od.Qty',
    'Sp.Qty',
    'PkgTracking',
    'TrackingID',
    'FLBy',
    'Sku',
    'UPC',
    'Style',
    'Size',
    'Color',
    'OrderStatus',
    'PO.Created',
    'Order.Date',
    'O.cost',
    'O.ShippingCost',
    'O.TotalSelling',
    'O.TWeight',
    'PrintDate',
  ];
  const {} = useOrderListDetailScreen();
  return (
    <View>
      <HeaderComponent headerTitle={'Order Detail'} isBack />
      {route.params.map((order, orderIndex) => (
        <View key={orderIndex} style={styles.cardContainer}>
          {headers.map((key, idx) => (
            <View key={idx} style={styles.totalsRow}>
              <Text style={styles.totalsText}>{key}</Text>

              {key === 'Od.Log' ? (
                <Touchable style={styles.logButton}>
                  <Image
                    source={trash}
                    resizeMode="contain"
                    style={styles.logIcon}
                  />
                </Touchable>
              ) : key === 'O.Code' ? (
                <Text style={styles.codeValue}>
                  {order[key.replace('.', '')] || ''}
                </Text>
              ) : (
                <Text style={styles.totalsValue}>
                  {order[key.replace('.', '')] || ''}
                </Text>
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default memo(OrderListDetailScreen);
