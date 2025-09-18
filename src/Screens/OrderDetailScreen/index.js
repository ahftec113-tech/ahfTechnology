import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import styles from './styles';
import { orderDetail } from '../../Utils/localDB';
import useOrderDetailScreen from './useOrderDetailScreen';

const OrderDetailScreen = ({ navigation, route }) => {
  const { detailData } = useOrderDetailScreen(navigation, route);

  const { orderCode, note, generalInfo, customerInfo, products, totals } =
    orderDetail;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Text style={styles.orderCode}>OrderCode: {route?.params}</Text>
        </View>
        <Text style={styles.note}>{detailData?.PrintingLog}</Text>
      </View>

      {/* General Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>General Info</Text>
        {Object.entries({
          'Channel Name': detailData?.ReqstRspnse[0]?.channel_name,
          'Shipping Service': detailData?.ReqstRspnse[0]?.ship_service_level,
          'Order Date': detailData?.ReqstRspnse[0]?.orderDate,
          IsPrime: Boolean(
            detailData?.ReqstRspnse[0]?.is_prime_parent == 1,
          ).toString(),
          'Total Weight':
            detailData?.ReqstRspnse[0]?.total_weight_org + ' (oz)',
        }).map(([key, value]) => (
          <Text key={key} style={styles.infoText}>
            {key}: {value}
          </Text>
        ))}
      </View>

      {/* Customer Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Customer Info</Text>
        {Object.entries({
          Name: detailData?.ReqstRspnse[0]?.full_name,
          Address: detailData?.ReqstRspnse[0]?.address_1,
          Phone: detailData?.ReqstRspnse[0]?.phone,
          'Delivery Date': detailData?.ReqstRspnse[0]?.deliveryDate,
          'Earliest Ship Date': detailData?.ReqstRspnse[0]?.earliestShipDate,
          'Latest Ship/Channel Ship Date':
            detailData?.ReqstRspnse[0]?.latest_or_ship_date,
        }).map(([key, value]) => (
          <Text key={key} style={styles.infoText}>
            {key}: {value}
          </Text>
        ))}
      </View>

      {/* Products Table */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Products</Text>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ProdName</Text>
          <Text style={styles.tableHeaderText}>Supplier</Text>
          <Text style={styles.tableHeaderText}>Brand</Text>
          <Text style={styles.tableHeaderText}>OrdQTY</Text>
          <Text style={styles.tableHeaderText}>ShipQty</Text>
          <Text style={styles.tableHeaderText}>ItemCost</Text>
          <Text style={styles.tableHeaderText}>ItemPrice</Text>
          <Text style={styles.tableHeaderText}>PkgTracking</Text>
          <Text style={styles.tableHeaderText}>PostBkTracking</Text>
          <Text style={styles.tableHeaderText}>POID</Text>
          <Text style={styles.tableHeaderText}>POCreatedDate</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>SlipGenerated</Text>
        </View>
        <FlatList
          data={detailData?.ReqstRspnse}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>{item?.prod_name}</Text>
              <Text style={styles.tableCell}>{item?.supplier_name}</Text>
              <Text style={styles.tableCell}>{item?.brands}</Text>
              <Text style={styles.tableCell}>{item.qty}</Text>
              <Text style={styles.tableCell}>{item.ship_qty}</Text>
              <Text style={styles.tableCell}>{item.total_cost}</Text>
              <Text style={styles.tableCell}>${item.itemPrice}</Text>
              <Text style={styles.tableCell}>{item.pkgTracking}</Text>
              <Text style={styles.tableCell}>{item.PostBackTracking}</Text>
              <Text style={styles.tableCell}>{item.purchase_order_id}</Text>
              <Text style={styles.tableCell}>{item.poCrtDate}</Text>
              <Text style={styles.tableCell}>{item.order_state}</Text>
              <Text style={styles.tableCell}>
                {Boolean(item.slip_generated == 1).toString()}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Totals */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Order Totals</Text>
        {Object.entries({
          'Item Total Cost': detailData?.ReqstRspnse[0]?.item_cost,
          'Shipping Cost': detailData?.ReqstRspnse[0]?.shipping_cost,
          'Tax Cost': detailData?.ReqstRspnse[0]?.tax_cost,
          'Order Total Cost': detailData?.ReqstRspnse[0]?.total_cost,
          'Item Total Selling': detailData?.ReqstRspnse[0]?.total_amount,
          'Shipping Charges':
            detailData?.ReqstRspnse[0]?.total_shipping_charges,
          Tax: detailData?.ReqstRspnse[0]?.tax,
          'Order Total Selling': detailData?.ReqstRspnse[0]?.grand_total,
        }).map(([key, value]) => (
          <View style={styles.totalsRow} key={key}>
            <Text style={styles.totalsText}>{key}</Text>
            <Text style={styles.totalsValue}>{value}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default OrderDetailScreen;
