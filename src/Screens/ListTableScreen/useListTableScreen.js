import { useEffect, useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useMutation } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { AuthUrl } from '../../Utils/Urls';
import { errorMessage } from '../../Config/NotificationMessage';
import { parseLogString } from '../../Services/GlobalFunctions';

const useListTableScreen = ({ params }) => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');
  function mapArrayByKeys(dataArray, keysArray) {
    return dataArray.map(item => {
      const newObj = {};
      keysArray.forEach(key => {
        newObj[key] = item.hasOwnProperty(key) ? item[key] : null;
      });
      return newObj;
    });
  }

  const [tableArryData, setTableArryData] = useState(null);
  const getOrders = useMutation({
    mutationFn: data => {
      console.log('lksdbbvklsdbklvbkdsbvlkdbvksdbklvkds', params?.body);
      return API.post(AuthUrl, {
        ...params?.body,
        userLoginIDC: userData,
        userLoginToken: token,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdfdfddkvbsdbvklsdbvksd',
        data?.data,
        params?.headerArry,
        // mapArrayByKeys(data?.data, params?.headerArry),
      );
      if (ok) {
        const dataValType = mapArrayByKeys(
          Array?.isArray(data?.data)
            ? data?.data
            : [parseLogString(data?.data)],
          params?.headerArry,
        );
        console.log(
          'dataValTypedataValTypedataValTypedataValTypedataValTypedataValType',
          dataValType,
        );

        setTableArryData(dataValType);
      } else {
        setTableArryData(null);
        // errorMessage(data?.message);
      }
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => getOrders.mutate(), []);

  return { headerArry: params?.headerArry, tableArryData };
};

export default useListTableScreen;
