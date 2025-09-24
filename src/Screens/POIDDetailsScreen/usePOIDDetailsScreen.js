import { useEffect, useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useMutation } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { AuthUrl } from '../../Utils/Urls';
import { errorMessage } from '../../Config/NotificationMessage';
import { formatDateToMDY } from '../../Services/GlobalFunctions';

const usePOIDDetailsScreen = ({ navigate }, { params }) => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [tableArryData, setTableArryData] = useState([]);
  const getOrders = useMutation({
    mutationFn: data => {
      console.log('lksdbbvklsdbklvbkdsbvlkdbvksdbklvkds', data);
      return API.post(AuthUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd',
        data?.data?.purchaseOrderDetail,
      );
      if (ok) {
        const dataValType = data?.data?.purchaseOrderDetail;
        const setDataVal = dataValType.map(res => ({
          Supplier: res?.supplier_name,
          Brand: res?.brands,
          UPC: res?.upc,
          Sku: res?.sku,
          StyleCode: res?.style_code,
          Color: res?.color,
          Size: res?.size,
          OrderQty: res?.order_qty,
          FulByStkQty: '0',
          SendQty: res?.send_qty,
          ReceiveQty: res?.recv_qty?.toString(),
          PkgIDs: res?.tracking_id,
          product_id: res?.product_id,
          po_order_qty: res?.po_order_qty,
          po_order_stock_qty: res?.po_order_stock_qty,
          po_total_qty: res?.po_total_qty,
          poCrtDate: res?.poCrtDate,
        }));
        setTableArryData(setDataVal);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(
    () =>
      getOrders.mutate({
        purchase_od_dtl_view_id: params,
        rqst_ke_fntn_vl: 'purchase_order_detail_view',
        userLoginIDC: userData,
        userLoginToken: token,
      }),
    [],
  );

  return { tableArryData, id: params };
};

export default usePOIDDetailsScreen;
