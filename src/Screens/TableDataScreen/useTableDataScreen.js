import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { AuthUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import {
  formatDateToDMY,
  formatDateToMDY,
  formatDateToYMD,
  parseLogString,
} from '../../Services/GlobalFunctions';

const useTableDataScreen = ({ navigate }, { params }) => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [tableArryData, setTableArryData] = useState(null);
  const getOrders = useMutation({
    mutationFn: data => {
      console.log('lksdbbvklsdbklvbkdsbvlkdbvksdbklvkds', data);
      return API.post(AuthUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd', data);
      if (ok) {
        const dataValType = data?.data?.ReqstRspnse ?? data?.data;
        const setDataVal = dataValType.map(res => ({
          POID: res?.purchase_order_id ?? res?.POID,
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
          Ocost: res?.po_total_amount ?? res?.ocost,
          OShippingCost: res?.shipping_cost,
          OTotalSelling: res?.oTotalSelling,
          OTWeight: res?.total_weight_org,
          PrintDate: res?.isPrintedOcd,
          odid: res?.odid,
          order_id: res?.order_id,
          CompanyName: res?.company_name,
          PototalAmountArg: res?.po_total_amount_org,
          SupplierName: res?.supplier_name,
          User: params?.isDate ? data?.data?.purchaseOrderUser[res?.id] : null,
          id: res?.id,
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

  useEffect(
    () =>
      getOrders.mutate({
        p_order_code_v: params?.code,
        rqst_ke_fntn_vl: params?.isDate
          ? 'purchase_orders_list_view'
          : 'order_browser_prnt_data',
        userLoginIDC: userData,
        userLoginToken: token,
        purchase_order_list_start_date: formatDateToMDY(params?.startDate),
        purchase_order_list_end_date: formatDateToMDY(params?.endDate),
        p_order_val_type: params?.type,
      }),
    [],
  );

  return {
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
    isDate: params?.isDate,
    onSearch: () => {
      mutateAsync({
        p_order_code_v: params?.code,
        rqst_ke_fntn_vl: 'order_browser_prnt_data',
        userLoginIDC: userData,
        userLoginToken: token,
      });
    },
  };
};

export default useTableDataScreen;
