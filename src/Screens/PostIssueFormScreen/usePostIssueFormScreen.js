import { useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { pick } from '@react-native-documents/picker';
import { PermissionsAndroid, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { useMutation } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { AuthUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import RNFS from 'react-native-fs';
import ImageEditor from '@react-native-community/image-editor';
import ImageResizer from 'react-native-image-resizer';

const usePostIssueFormScreen = ({ navigate }, { params }) => {
  const { getState } = useReduxStore();
  const { userData, token } = getState('Auth');

  const currentDate = new Date();

  const [modalState, setModalState] = useState(null);

  const [tableArryData, setTableArryData] = useState([]);
  const [selectedCell, setSelectedCell] = useState([]);
  const [description, setDescription] = useState(null);
  const [zipCode, setZipCode] = useState(null);
  const [showText, setShowText] = useState(null);

  const [apiFormData, setFormData] = useState({
    BoardMessage: null,
    IssuetypeOptions: null,
    SuppliersDetail: null,
    officeOptions: null,
    statusOptions: null,
    issueText: null,
    searchQuery: null,
    startDate: null,
    endDate: null,
    UserList: null,
    ReturnDate: null,
    SearchBy: null,
    selectFileType: null,
    printingStatus: null,
    materialType: null,
    BoxNo: null,
    searchBar: null,
    // searchBar: '114-9793394-8648252',
    selectedFile: null,
    assignToUsers: null,
  });

  const {
    BoardMessage,
    EndDate,
    IssuetypeOptions,
    StartDate,
    SuppliersDetail,
    officeOptions,
    statusOptions,
    ReturnDate,
    SearchBy,
    selectFileType,
    printingStatus,
    materialType,
    BoxNo,
    searchBar,
    selectedFile,
    assignToUsers,
  } = apiFormData;

  const updateState = data => setFormData(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const arrySelector = {
    selectFileType: [
      { val: 'Stock', id: 'Stock' },
      { val: 'Return', id: 'Return' },
      { val: '10 Days', id: '10 Days' },
      { val: 'Other', id: 'Other' },
    ],
    printingStatus: [
      { id: 'Not Finished Pkg', val: 'Not Finished Pkg' },
      { id: 'Not Recevied Pkg', val: 'Not Recevied Pkg' },
      { id: 'Wrong Pkg Rec', val: 'Wrong Pkg Rec' },
      { id: 'Other', val: 'Other' },
    ],
    materialType: [
      { id: 'PolyBags 6 X 9', val: 'PolyBags 6 X 9' },
      { id: 'PolyBags 10 X 13', val: 'PolyBags 10 X 13' },
      { id: 'PolyBags 12 X 15.5', val: 'PolyBags 12 X 15.5' },
      { id: 'PolyBags 14 X 19', val: 'PolyBags 14 X 19' },
      { id: 'PolyBags 19 X 24', val: 'PolyBags 19 X 24' },
      { id: 'Envelopes 10 X 13', val: 'Envelopes 10 X 13' },
      { id: 'CardStock 8.5 X 11', val: 'CardStock 8.5 X 11' },
      { id: 'Labels 4 X 6', val: 'Labels 4 X 6' },
      {
        id: 'Stretch Wrap Industrial Strength 18inch x 1500ft',
        val: 'Stretch Wrap Industrial Strength 18inch x 1500ft',
      },
      { id: 'Other', val: 'Other' },
    ],
    ReturnDate: [
      { val: 'January', id: 'Jan' },
      { val: 'February', id: 'Feb' },
      { val: 'March', id: 'Mar' },
      { val: 'April', id: 'Apr' },
      { val: 'May', id: 'May' },
      { val: 'June', id: 'Jun' },
      { val: 'July', id: 'Jul' },
      { val: 'August', id: 'Aug' },
      { val: 'September', id: 'Sep' },
      { val: 'October', id: 'Oct' },
      { val: 'November', id: 'Nov' },
      { val: 'December', id: 'Dec' },
    ],
    SearchBy: [
      { val: 'OrderCode', id: 'OrderCode' },
      { val: 'SearchByName/Zip', id: 'SearchByName/Zip' },
    ],
    statusOptions: [
      {
        id: 'Order Return',
        val: 'Order Return',
      },
      {
        id: 'Order',
        val: 'Order',
      },
      {
        id: 'Package',
        val: 'Package Tracking',
      },
      {
        id: 'PO',
        val: 'PO',
      },
      {
        id: 'Stock',
        val: 'File Uploading',
      },
      {
        id: 'Printing',
        val: 'Printing',
      },
      {
        id: 'Materials',
        val: 'Materials',
      },
      {
        id: 'Miscellaneous',
        val: 'Miscellaneous',
      },
    ],
    BoxNo: [
      { id: '1', val: '1' },
      { id: '2', val: '2' },
      { id: '3', val: '3' },
      { id: '4', val: '4' },
      { id: '5', val: '5' },
      { id: '6', val: '6' },
      { id: '7', val: '7' },
      { id: '8', val: '8' },
      { id: '9', val: '9' },
      { id: '10', val: '10' },
      { id: '11', val: '11' },
      { id: '12', val: '12' },
    ],
    assignToUsers: params?.userList,
  };

  const selectTag = {
    SuppliersDetail,
    officeOptions,
    IssuetypeOptions,
    statusOptions,
    ReturnDate,
    SearchBy,
    selectFileType,
    printingStatus,
    materialType,
    BoxNo,
    assignToUsers,
  };

  const handleFilePick = async () => {
    try {
      // Opens native file picker for both images and PDFs
      const results = await pick({
        allowMultiSelection: true,
        type: ['image/*', 'application/pdf'],
      });

      if (!results || results.length === 0) return;

      for (const file of results) {
        try {
          const filePath = file.uri.replace('file://', '');
          const base64Data = await RNFS.readFile(filePath, 'base64');

          // Build base64 with MIME prefix
          const base64String = `data:${file.type};base64,${base64Data}`;

          // Add base64 to file object or directly set to state
          onChangeVal('selectedFile', {
            ...file,
            base64: base64String,
          });

          // Optional: Upload directly here
          // await postMessage.mutateAsync({
          //   WithSnapShot: 'Yes',
          //   attachmentFileIncomment: base64String,
          //   attachmentFileIncommentPRIDAjax: params,
          // });
        } catch (err) {
          console.log('Base64 conversion error for file:', file.name, err);
        }
      }
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
        saveToPhotos: false,
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

          try {
            // 🔸 Pick a max width/height to shrink large photos
            const maxWidth = 800;
            const maxHeight = Math.round((file.height / file.width) * maxWidth);

            // ✅ Compress & resize to JPEG 70% (best balance for upload)
            const compressed = await ImageResizer.createResizedImage(
              file.uri,
              maxWidth,
              maxHeight,
              'JPEG', // use JPEG for better compression
              70, // compression quality (0-100)
              0,
            );

            const compressedUri = compressed.uri;
            const readPath = compressedUri.startsWith('file://')
              ? compressedUri
              : `file://${compressedUri}`;

            // Convert to base64
            const base64Data = await RNFS.readFile(readPath, 'base64');
            const base64Image = `data:image/jpeg;base64,${base64Data}`;

            onChangeVal('selectedFile', {
              ...file,
              uri: compressedUri,
              type: 'image/jpeg',
              fileName:
                file.fileName?.replace(/\.[^/.]+$/, '.jpg') ||
                `image_${Date.now()}.jpg`,
              base64: base64Image,
            });

            console.log('✅ Compressed image ready for upload');
          } catch (err) {
            console.log('Image compression error:', err);
          }
        }
      });
    } catch (error) {
      console.log('Camera pick error:', error);
    }
  };
  function mapArrayByKeys(dataArray, keysArray) {
    return dataArray.map(item => {
      const newObj = {};
      keysArray.forEach(key => {
        newObj[key] = item.hasOwnProperty(key) ? item[key] : null;
      });
      return newObj;
    });
  }

  const headerArray = [
    'Order',
    'Address',
    'Style',
    'Color',
    'Size',
    'Qty',
    'Status',
    'OrderDate',
    'Supplier',
    'POID',
    'Returnable',
    'ReturnBox',
  ];

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(AuthUrl, {
        rqst_ke_fntn_vl: 'post_issue_form_get_record',
        userLoginIDC: userData,
        userLoginToken: token,
        ChatselectOrderSearch:
          selectTag?.SearchBy?.id == 'SearchByName/Zip'
            ? 'SearchByNamezip'
            : 'ScanOrderCode',
        ParentChatselectOrderSearch: selectTag?.statusOptions?.id,
        ChatScanOrderCode: searchBar,
        ChatCustomerName: searchBar,
        ChatZip: zipCode,
        getPackageTrStatusChatForum:
          selectTag?.statusOptions?.id == 'Package' ? searchBar : null,
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksdssdkkkkksdsdskkkkkkk',
        data,
      );
      if (ok) {
        const dataValType =
          Array.isArray(data?.data) &&
          data?.data?.map(res => ({
            Order: res?.order_code,
            Address: res?.addressF,
            Style: res?.style,
            Color: res?.color,
            Size: res?.size,
            Qty: res?.qty,
            Status: res?.order_state,
            OrderDate: res?.orderDate,
            Supplier: res?.supplier_name,
            POID: res?.pid,
            Returnable: res?.returnable,
            ReturnBox: res?.company_name,
          }));

        setTableArryData(dataValType);
        if (!Array.isArray(data?.data)) setShowText(data?.data);
      } else
        errorMessage(data?.message != '' ? data?.message : 'No Record Found');
    },
    onError: e => errorMessage(e),
  });
  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('opdvopsdnvopndsopvnosdnvondspovnopsdnvpnds', {
        rqst_ke_fntn_vl: 'post_issue_send_task',
        userLoginIDC: userData,
        userLoginToken: token,
        ChatselectOrderSearch:
          selectTag?.SearchBy?.id == 'SearchByName/Zip'
            ? 'SearchByNamezip'
            : 'ScanOrderCode',
        ParentChatselectOrderSearch: selectTag?.statusOptions?.id,
        ChatScanOrderCode: searchBar,
        issuesTypeSlt: selectTag?.statusOptions?.id,
        selectAssignUser: selectTag?.assignToUsers?.id,
        LgUserIDOnforum: userData,
        ChatIssueDesecription: description,
        ChatCustomerName: searchBar,
        ChatZip: zipCode,
        SnapeImageIs: selectedFile?.uri ? 'Yes' : 'No',
        snapShotImage: selectedFile?.base64,
        boxNoWdReturnDate: selectTag?.BoxNo?.id,
        fileCategoryType: selectTag?.selectFileType?.id,
        selectOrderSearch: selectTag?.SearchBy?.id,
        returnDateInIssuePosting: selectTag?.ReturnDate?.id,
        MaterialOptionalField: selectTag?.materialType?.id,
        CustomerName: searchBar,
        ScanOrderCode: selectTag?.SearchBy?.id,
        ChatIssueDesecription: description,
        PrintingOptionalField: selectTag?.printingStatus?.id,
        customFieldSectioninput: searchBar,
      });

      return API.post(AuthUrl, {
        rqst_ke_fntn_vl: 'post_issue_send_task',
        userLoginIDC: userData,
        userLoginToken: token,
        ChatselectOrderSearch:
          selectTag?.SearchBy?.id == 'SearchByName/Zip'
            ? 'SearchByNamezip'
            : 'ScanOrderCode',
        ParentChatselectOrderSearch: selectTag?.statusOptions?.id,
        ChatScanOrderCode: searchBar,
        issuesTypeSlt: selectTag?.statusOptions?.id,
        selectAssignUser: selectTag?.assignToUsers?.id,
        LgUserIDOnforum: userData,
        ChatIssueDesecription: description,
        ChatCustomerName: searchBar,
        ChatZip: zipCode,
        SnapeImageIs: selectedFile?.uri ? 'Yes' : 'No',
        snapShotImage: selectedFile?.base64,
        boxNoWdReturnDate: selectTag?.BoxNo?.id,
        fileCategoryType: selectTag?.selectFileType?.id,
        selectOrderSearch: selectTag?.SearchBy?.id,
        returnDateInIssuePosting: selectTag?.ReturnDate?.id,
        MaterialOptionalField: selectTag?.materialType?.id,
        CustomerName: searchBar,
        ScanOrderCode: selectTag?.SearchBy?.id,
        ChatIssueDesecription: description,
        PrintingOptionalField: selectTag?.printingStatus?.id,
        customFieldSectioninput: searchBar,
        'PhysicalStockfile[]':
          selectTag?.statusOptions?.id == 'Miscellaneous'
            ? [selectedFile?.base64]
            : selectedFile?.base64,
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log(
        'skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksdkkkkksdsdskkkkkkk',
        data,
      );
      if (ok) {
        setFormData({
          BoardMessage: null,
          IssuetypeOptions: null,
          SuppliersDetail: null,
          officeOptions: null,
          statusOptions: null,
          issueText: null,
          searchQuery: null,
          startDate: null,
          endDate: null,
          UserList: null,
          ReturnDate: null,
          SearchBy: null,
          selectFileType: null,
          printingStatus: null,
          materialType: null,
          BoxNo: null,
          searchBar: '114-9793394-8648252',
          selectedFile: null,
          assignToUsers: null,
        });

        setTableArryData([]);
        setSelectedCell([]);
        setDescription(null);
        setZipCode(null);
        setShowText(null);

        successMessage(data?.data);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  return {
    modalState,
    setModalState,
    selectTag,
    arrySelector,
    onChangeVal,
    setFormData,
    handleCameraPick,
    handleFilePick,
    onSearch: () => mutate(),
    searchBar,
    headerArray,
    tableArryData,
    selectedCell,
    setSelectedCell,
    selectedFile,
    description,
    setDescription,
    setTableArryData,
    postIssue: () => {
      if (
        selectTag?.statusOptions?.id == 'Order Return' &&
        selectTag?.ReturnDate?.id != null &&
        selectTag?.BoxNo?.id != null &&
        searchBar != null &&
        selectedCell.length > 0 &&
        selectTag?.assignToUsers?.id != null &&
        description != null &&
        description != ''
      ) {
        mutateAsync();
      } else if (
        selectTag?.statusOptions?.id == 'Order' &&
        selectTag?.SearchBy?.id != null &&
        searchBar != null &&
        selectTag?.assignToUsers?.id != null &&
        description != null &&
        description != ''
      ) {
        if (selectTag?.SearchBy?.id == 'SearchByName/Zip' && zipCode != null) {
          mutateAsync();
        } else if (selectTag?.SearchBy?.id == 'OrderCode') {
          mutateAsync();
        } else errorMessage('Please complete all fields');
      } else if (
        selectTag?.statusOptions?.id == 'Package' &&
        searchBar != null &&
        selectTag?.assignToUsers?.id != null &&
        description != null &&
        description != ''
      ) {
        mutateAsync();
      } else if (
        selectTag?.statusOptions?.id == 'PO' &&
        searchBar != null &&
        selectTag?.assignToUsers?.id != null &&
        description != null &&
        description != ''
      ) {
        mutateAsync();
      } else if (
        selectTag?.statusOptions?.id == 'Stock' &&
        selectTag?.assignToUsers?.id != null &&
        selectTag?.selectFileType?.id != null &&
        selectedFile?.uri &&
        description != null &&
        description != ''
      ) {
        mutateAsync();
      } else if (
        selectTag?.statusOptions?.id == 'Printing' &&
        selectTag?.assignToUsers?.id != null &&
        selectTag?.printingStatus?.id != null &&
        description != null &&
        description != ''
      ) {
        mutateAsync();
      } else if (
        selectTag?.statusOptions?.id == 'Materials' &&
        selectTag?.assignToUsers?.id != null &&
        selectTag?.materialType?.id != null &&
        description != null &&
        description != ''
      ) {
        mutateAsync();
      } else if (
        selectTag?.statusOptions?.id == 'Miscellaneous' &&
        selectTag?.assignToUsers?.id != null &&
        description != null &&
        description != '' &&
        searchBar != null &&
        searchBar != ''
      ) {
        mutateAsync();
      } else errorMessage('Please complete all fields');
    },
    zipCode,
    setZipCode,
    showText,
    setShowText,
  };
};

export default usePostIssueFormScreen;
