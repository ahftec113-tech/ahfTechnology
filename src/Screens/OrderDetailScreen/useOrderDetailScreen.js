import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { AuthUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';

const useOrderDetailScreen = ({ navigate }, { params }) => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [detailData, setSetDetailData] = useState(null);
  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('lksdbbvklsdbklvbkdsbvlkdbvksdbkdcsdsdfdslvkds', {
        p_order_code_v: params,
        rqst_ke_fntn_vl: 'order_browser_child_data',
        userLoginIDC: userData,
        userLoginToken: token,
      });
      return API.post(AuthUrl, {
        p_order_code_v: params,
        rqst_ke_fntn_vl: 'order_browser_child_data',
        userLoginIDC: userData,
        userLoginToken: token,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd', data);
      if (ok) {
        setSetDetailData(data?.data);
        // dispatch({
        //   type: types.UpdateProfile,
        //   payload: data.user,
        // });
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(mutate, []);
  return { detailData };
};
export default useOrderDetailScreen;
