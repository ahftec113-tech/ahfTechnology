import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { AuthUrl } from '../../Utils/Urls';
import useReduxStore from '../../Hooks/UseReduxStore';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'react-native-blob-util';
import RNFS from 'react-native-fs';

const useOrderDetailScreen = ({ navigate }, { params }) => {
  // Function to request storage permission (for Android only)
  async function requestStoragePermission() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download files',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  async function downloadPDF(url, fileName = 'sample.pdf') {
    // const hasPermission = await requestStoragePermission();
    // if (!hasPermission) {
    //   console.log('Permission denied');
    //   return;
    // }

    const { config, fs } = RNFetchBlob;
    const downloads = fs.dirs.DownloadDir; // Downloads folder (Android)

    config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true, // <-- enables system download manager
        notification: true, // <-- shows notification in panel
        path: `${downloads}/${fileName}`,
        description: 'Downloading PDF file...',
      },
    })
      .fetch('GET', url)
      .then(res => {
        console.log('File downloaded to:', res.path());
      })
      .catch(err => {
        console.log('Download error:', err);
      });
  }

  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [detailData, setSetDetailData] = useState(null);

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(AuthUrl, {
        userLoginIDC: userData,
        userLoginToken: token,
        p_order_code_v: params?.oCode,
        rqst_ke_fntn_vl: 'order_browser_child_data',
      });
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        setSetDetailData(data?.data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('kkhshkhskklslklksdkklslksd', {
        userLoginIDC: userData,
        userLoginToken: token,
        printL_label_package_order_id: data?.order_id,
        print_lbl_pkg_type: data?.printType,
        rqst_ke_fntn_vl: 'printL_label_package_file',
      });
      return API.post(AuthUrl, {
        userLoginIDC: userData,
        userLoginToken: token,
        printL_label_package_order_id: data?.order_id,
        print_lbl_pkg_type: data?.printType,
        rqst_ke_fntn_vl: 'printL_label_package_file',
      });
    },
    onSuccess: async ({ ok, data }) => {
      console.log('sdlkvklsdbvklsdbklvksldvksdbl', data);
      if (ok) {
        await downloadPDF(data?.data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(mutate, []);
  return {
    detailData,
    printFun: printType => {
      mutateAsync({
        printType,
        order_id: params?.orderId,
      });
    },
  };
};
export default useOrderDetailScreen;
