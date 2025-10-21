import { useEffect, useState } from 'react';
import { pick } from '@react-native-documents/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import uuid from 'react-native-uuid';
import { useMutation } from '@tanstack/react-query';
import useReduxStore from '../../Hooks/UseReduxStore';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import API, { formDataFunc } from '../../Utils/helperFunc';
import { AuthUrl } from '../../Utils/Urls';
import { PermissionsAndroid, Platform } from 'react-native';

const useChatScreen = ({ params }, { goBack }) => {
  console.log('klsdbvklbsdklbvklsdbklvds', params);
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [modalState, setModalState] = useState(null);

  const [apiAllData, setApiAllData] = useState({
    StatusOptions: [],
    ChildMessages: [],
    ChildSummary: [],
    BoardMessage: {},
  });

  const [apiFormData, setFormData] = useState({
    StatusOptions: null,
    ChildMessages: [],
    ChildSummary: [],
    brCode: { id: 'UPC', value: '' },
  });

  const { ChildMessages, ChildSummary, StatusOptions, brCode } = apiFormData;

  const updateState = data => setFormData(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: uuid.v4(),
      type: 'text',
      content: inputText,
      isSender: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
  };

  const handleFilePick = async () => {
    try {
      // Opens native file picker for both images and PDFs
      const results = await pick({
        allowMultiSelection: true,
        type: ['image/*', 'application/pdf'],
      });

      if (!results || results.length === 0) return;

      results.forEach(async file => {
        if (file.type?.includes('image')) {
          // setInputText(file);
          await postMessage.mutateAsync({
            WithSnapShot: file?.uri ? 'Yes' : 'No',
            attachmentFileIncomment: file?.uri ? file : {},
            attachmentFileIncommentPRIDAjax: params,
          });
          mutate({
            rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
          });
        } else if (file.type === 'application/pdf') {
          await postMessage.mutateAsync({
            WithSnapShot: file?.uri ? 'Yes' : 'No',
            attachmentFileIncomment: file?.uri ? file : {},
            attachmentFileIncommentPRIDAjax: params,
          });
          mutate({
            rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
          });
        }
      });
    } catch (error) {
      console.log('File pick error:', error);
    }
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Camera permission error:', err);
        return false;
      }
    }
    // iOS handles permissions automatically through Info.plist prompt
    return true;
  };

  const handleCameraPick = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) {
        console.log('Camera permission denied');
        return;
      }

      const options = {
        mediaType: 'photo',
        cameraType: 'back',
        quality: 1,
        saveToPhotos: true,
      };

      launchCamera(options, async response => {
        if (response.didCancel) {
          console.log('User cancelled camera');
          return;
        } else if (response.errorCode) {
          console.log('Camera error:', response.errorMessage);
          return;
        }

        if (response.assets && response.assets.length > 0) {
          const file = response.assets[0];

          await postMessage.mutateAsync({
            WithSnapShot: file?.uri ? 'Yes' : 'No',
            attachmentFileIncomment: file?.uri ? file : {},
            attachmentFileIncommentPRIDAjax: params,
          });

          mutate({
            rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
          });
        }
      });
    } catch (error) {
      console.log('Camera pick error:', error);
    }
  };

  const addImageMessage = file => {
    const newMsg = {
      id: uuid.v4(),
      type: 'image',
      files: [{ uri: file.uri }],
      isSender: true,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  const addPdfMessage = file => {
    const newMsg = {
      id: uuid.v4(),
      type: 'pdf',
      files: [{ name: file.name, uri: file.uri }],
      isSender: true,
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // Optional: pick only images from gallery
  const pickImagesFromGallery = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        selectionLimit: 0, // 0 = unlimited for multiple
      },
      response => {
        if (response.didCancel || response.errorCode) return;

        if (response.assets && response.assets.length > 0) {
          const imgs = response.assets.map(a => ({ uri: a.uri }));
          const newMsg = {
            id: uuid.v4(),
            type: 'image',
            files: imgs,
            isSender: true,
          };
          setMessages(prev => [...prev, newMsg]);
        }
      },
    );
  };

  const pickImageFromCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: true,
      },
      response => {
        if (response.didCancel || response.errorCode) return;

        if (response.assets && response.assets.length > 0) {
          const imgs = response.assets.map(a => ({ uri: a.uri }));
          const newMsg = {
            id: uuid.v4(),
            type: 'image',
            files: imgs,
            isSender: true,
          };
          setMessages(prev => [...prev, newMsg]);
        }
      },
    );
  };
  const { mutate, mutateAsync } = useMutation({
    mutationFn: data => {
      return API.post(AuthUrl, {
        userLoginIDC: userData,
        userLoginToken: token,
        ChildMsgId: params,
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdkvbsdbvksdsfgdflsdbvksdkkkkkkkkkkkk',
        data?.data?.original?.data,
      );
      if (ok) {
        if (data?.data?.original?.data)
          setApiAllData(data?.data?.original?.data);
        else successMessage(data?.message);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const postMessage = useMutation({
    mutationFn: data => {
      console.log('skldvnlkdsnkvlnsdklvnskdnvklsdnklvnsdknvlds', data);
      return formDataFunc(
        AuthUrl,
        {
          userLoginIDC: userData,
          userLoginToken: token,
          rqst_ke_fntn_vl: 'issue_forum_msg_send',
          // ChildMsgId: params,
          ...data,
        },
        'attachmentFileIncomment',
      );
    },
    onSuccess: ({ ok, data }) => {
      console.log('kjjjkjkjkjkjkjkjkkjjkjkjkkkjkjk', data);
      if (ok) {
        successMessage(data?.message);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  useEffect(
    () =>
      mutate({
        rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
      }),
    [],
  );

  const arrySelector = {
    StatusOptions: apiAllData?.StatusOptions,
    ChildMessages: apiAllData?.ChildMessages,
    ChildSummary: apiAllData?.ChildSummary,
  };

  const selectTag = {
    StatusOptions,
    ChildMessages,
    ChildSummary,
    brCode,
  };

  return {
    messages,
    inputText,
    setInputText,
    handleSendMessage,
    handleFilePick,
    handleCameraPick,
    onChangeVal,
    apiAllData,
    StatusOptions,
    ChildSummary,
    arrySelector,
    selectTag,
    modalState,
    setModalState,
    brCode,
    pickImageFromCamera,
    ChildMessages: apiAllData?.ChildMessages,
    StatusOptions,
    apiStatusOptions: apiAllData?.StatusOptions,
    postMeg: async file => {
      await postMessage.mutateAsync({
        insertChatChildDetailAjax: inputText,
        insertChatChildPrIDDetailAjax: params,
        WithSnapShot: file?.uri ? 'Yes' : 'No',
      });
      setInputText(null);
      mutate({
        rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
      });
    },
    changeStatus: async () => {
      await mutateAsync({
        rqst_ke_fntn_vl: 'issue_forum_msg_status_change',
        goingToChangeParentStatusAjax: StatusOptions?.id,
        goingToChangeParentStatusPrIDAjax: params,
      });
      mutate({
        rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
      });
    },
    postBarCode: () => {
      mutateAsync({
        rqst_ke_fntn_vl: 'issue_forum_msg_barcode',
        goGenerateRtnRcvBrCode: apiAllData?.BoardMessage?.order_id,
        goGenerateRtnRcvBrCodePrntID: params,
        genertCustBarcdePDFBy: brCode?.id,
      });
    },
    deleteChat: async (type, id) => {
      await mutateAsync({
        rqst_ke_fntn_vl: 'issue_forum_message_delete',
        ToDeletePrntChld: type,
        ToDeleteParentID: apiAllData?.BoardMessage?.id,
        ToDeleteChildID: id,
        goingToDltPrntAndChild: 'goingToDltPrntAndChild',
        AUserID: userData,
        mbl_api: 'mbl_api_userLoginIDC',
      });

      mutate({
        rqst_ke_fntn_vl: 'issue_forum_board_msg_show_by_id',
      });
      if (type == 'parent') goBack();
    },
  };
};

export default useChatScreen;
