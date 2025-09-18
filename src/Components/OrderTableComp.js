import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { orders } from './data';
import { Touchable } from './Touchable';
import { trash } from '../Assets';
import { hp, wp } from '../Hooks/useResponsive';

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
('OrderDetailScreen');

const OrderTableComp = ({ arryData, onCodePress, onLogPress }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.table}>
          {/* Header Row */}
          <View style={styles.headerRow}>
            {headers.map((header, index) => (
              <Text key={index} style={styles.headerCell}>
                {header}
              </Text>
            ))}
          </View>

          {/* Data Rows */}
          {arryData.map((order, index) => (
            <View key={index} style={styles.row}>
              {headers.map((key, idx) =>
                key == 'Od.Log' ? (
                  <Touchable
                    style={{ marginHorizontal: wp('2'), alignSelf: 'center' }}
                    onPress={() =>
                      onLogPress({
                        odid: arryData[index]?.odid,
                        order_id: arryData[index]?.order_id,
                      })
                    }
                  >
                    <Image
                      source={trash}
                      resizeMode="contain"
                      style={{ width: wp('4'), height: hp('3') }}
                    />
                  </Touchable>
                ) : (
                  <Text
                    key={idx}
                    style={styles.cell(Boolean(key == 'O.Code'))}
                    disabled={Boolean(key != 'O.Code')}
                    onPress={() => {
                      console.log('ppppppppppppppppppppp', order?.OCode);
                      onCodePress(order?.OCode);
                    }}
                  >
                    {order[key.replace('.', '')] || ''}
                  </Text>
                ),
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderTableComp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1E3A8A', // dark blue
  },
  headerCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    // textDecorationLine:"underline"
  },
  cell: isCode => ({
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 12,
    color: isCode ? 'blue' : 'black',
    textDecorationLine: isCode ? 'underline' : 'none',
  }),
});
