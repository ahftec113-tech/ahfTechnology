import { View, Text, ScrollView } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';
import { hp } from '../../Hooks/useResponsive';
import usePOIDDetailsScreen from './usePOIDDetailsScreen';

const POIDDetailsScreen = ({ navigation, route }) => {
  const headers = [
    'Supplier',
    'Brand',
    'UPC',
    'Sku',
    'StyleCode',
    'Color',
    'Size',
    'OrderQty',
    'FulByStkQty',
    'SendQty',
    'ReceiveQty',
    'PkgIDs',
  ];
  const { tableArryData, id } = usePOIDDetailsScreen(navigation, route);
  console.log(
    'tableArryDatatableArryDatatableArryDatatableArryDatatableArryData',
    tableArryData[0],
  );

  const detailData = { ReqstRspnse: [] };
  return (
    <View>
      <HeaderComponent headerTitle={''} isBack />
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Comprehensive Info</Text>
        {Object.entries({
          TotalOrderQty: tableArryData[0]?.po_order_qty,
          TotalFulByStkQty: tableArryData[0]?.po_order_stock_qty,
          TotalSendQty: tableArryData[0]?.po_total_qty,
          POCreatedDate: tableArryData[0]?.poCrtDate,
        }).map(([key, value]) => (
          <Text key={key} style={styles.infoText}>
            {key}: {value}
          </Text>
        ))}
      </View>
      {/* <View style={styles.card}>
        <Text style={styles.sectionTitle}>Package Info</Text>
        {Object.entries({
          TotalOrderQty: detailData?.ReqstRspnse[0]?.channel_name,
          TotalFulByStkQty: detailData?.ReqstRspnse[0]?.ship_service_level,
          TotalSendQty: detailData?.ReqstRspnse[0]?.ship_service_level,
          POCreatedDate: detailData?.ReqstRspnse[0]?.ship_service_level,
        }).map(([key, value]) => (
          <Text key={key} style={styles.infoText}>
            {key}: {value}
          </Text>
        ))}
      </View> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp('40') }}
      >
        {tableArryData.map((order, orderIndex) => (
          <View key={orderIndex} style={styles.cardContainer}>
            {headers.map(
              (key, idx) =>
                order[key] != null && (
                  <View key={idx} style={styles.totalsRow}>
                    <Text style={styles.totalsText}>{key}</Text>

                    {key === 'Sku' ? (
                      <Text
                        style={styles.codeValue}
                        onPress={() => {
                          navigation.navigate('ListTableScreen', {
                            headerArry: [
                              'order_code',
                              'order_qty',
                              'ship_qty',
                              'purchase_order_id',
                              'order_state',
                            ],
                            body: {
                              purchase_order_item_product_id:
                                order['product_id'],
                              purchase_order_item_history: id,
                              rqst_ke_fntn_vl:
                                'purchase_order_item_history_view',
                            },
                          });
                        }}
                      >
                        {order[key.replace('.', '')] || ''}
                      </Text>
                    ) : (
                      <Text style={styles.totalsValue}>
                        {order[key.replace('.', '')] || ''}
                      </Text>
                    )}
                  </View>
                ),
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default memo(POIDDetailsScreen);
