import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { AuthUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import { parseLogString } from '../../Services/GlobalFunctions';

const daysArray = [
  { id: 'customDay', label: 'Custom Day' },
  { id: 1, label: 1 },
  { id: 2, label: 2 },
  { id: 3, label: 3 },
  { id: 4, label: 4 },
  { id: 5, label: 5 },
  { id: 6, label: 6 },
  { id: 7, label: 7 },
  { id: 8, label: 8 },
  { id: 9, label: 9 },
  { id: 10, label: 10 },
  { id: 11, label: 11 },
  { id: 12, label: 12 },
  { id: 13, label: 13 },
  { id: 14, label: 14 },
  { id: 15, label: 15 },
  { id: 16, label: 16 },
  { id: 17, label: 17 },
  { id: 18, label: 18 },
  { id: 19, label: 19 },
  { id: 20, label: 20 },
];
const fieldArray = [
  { id: 'purchaseOrderId', label: 'Purchase Order Id' },
  { id: 'orderCode', label: 'Order Code' },
  { id: 'supplierName', label: 'Supplier Name' },
  { id: 'trackingId', label: 'Tracking ID' },
  { id: 'sku', label: 'SKU' },
  { id: 'style', label: 'Style' },
  { id: 'size', label: 'Size' },
  { id: 'color', label: 'Color' },
];

const useOrderBrowserScreen = () => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [modalState, setModalState] = useState(null);
  const [tableArryData, setTableArryData] = useState(null);

  const [formState, setFormState] = useState({
    selectedDay: null,
    selectedfield: null,
    orderNumber: '112-9313437-9389018',
  });
  const { orderNumber, selectedDay, selectedfield } = formState;

  const updateState = data => setFormState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const selectTag = {
    selectedDay: selectedDay,
    selectedfield: selectedfield,
  };
  const arrySelector = {
    selectedDay: daysArray,
    selectedfield: fieldArray,
  };

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('lksdbbvklsdbklvbkdsbvlkdbvksdbklvkds', data);
      return API.post(AuthUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd', data);
      if (ok) {
        const setDataVal = data?.data.map(res => ({
          POID: res?.purchase_order_id,
          OCode: res?.order_code,
          OdQty: res?.qty,
          SpQty: res?.ship_qty,
          PkgTracking: res?.PostBackTracking,
          TrackingID: res?.tracking_id,
          FLBy: res?.ful_by_avail_stk,
          Sku: res?.sku,
          UPC: res?.upc,
          Style: res?.style,
          Size: res?.size,
          Color: res?.color,
          OrderStatus: res?.order_state,
          POCreated: res?.po_created,
          OrderDate: res?.order_date,
          Ocost: res?.ocost,
          OShippingCost: res?.shipping_cost,
          OTotalSelling: res?.oTotalSelling,
          OTWeight: res?.total_weight_org,
          PrintDate: res?.isPrintedOcd,
          odid: res?.odid,
          order_id: res?.order_id,
        }));
        setTableArryData(setDataVal);
        // dispatch({
        //   type: types.UpdateProfile,
        //   payload: data.user,
        // });
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('lksdbbvklsdbklvbkdsbvlkdbvksdbklvkds', data);
      return API.post(AuthUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksdkkkkkkkkkkkk',
        parseLogString(data?.data),
      );
      if (ok) {
        // const setDataVal = data?.data.map(res => ({
        //   POID: res?.purchase_order_id,
        //   OCode: res?.order_code,
        //   OdQty: res?.qty,
        //   SpQty: res?.ship_qty,
        //   PkgTracking: res?.PostBackTracking,
        //   TrackingID: res?.tracking_id,
        //   FLBy: res?.ful_by_avail_stk,
        //   Sku: res?.sku,
        //   UPC: res?.upc,
        //   Style: res?.style,
        //   Size: res?.size,
        //   Color: res?.color,
        //   OrderStatus: res?.order_state,
        //   POCreated: res?.po_created,
        //   OrderDate: res?.order_date,
        //   Ocost: res?.ocost,
        //   OShippingCost: res?.shipping_cost,
        //   OTotalSelling: res?.oTotalSelling,
        //   OTWeight: res?.total_weight_org,
        //   PrintDate: res?.isPrintedOcd,
        // }));
        // setTableArryData(setDataVal);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  return {
    modalState,
    selectTag,
    setModalState,
    onChangeVal,
    orderNumber,
    selectedDay,
    selectedfield,
    arrySelector,
    tableArryData,
    onLogPress: ({ odid, order_id }) => {
      mutate({
        userLoginIDC: userData,
        userLoginToken: token,
        or_log_odid: odid,
        or_log_order_id: order_id,
        rqst_ke_fntn_vl: 'order_log_data_view',
      });
    },
    onSearch: () => {
      mutateAsync({
        p_order_code_v: orderNumber,
        rqst_ke_fntn_vl: 'order_browser_prnt_data',
        userLoginIDC: userData,
        userLoginToken: token,
      });
    },
  };
};

export default useOrderBrowserScreen;
