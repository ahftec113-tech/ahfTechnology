import { useState } from 'react';

const useTypeCodeScreen = ({ navigate }, { params }) => {
  const currentDate = new Date();
  const isDate = params?.isDateSelector;
  const [qrScan, setQrScan] = useState(null);
  // const [qrScan, setQrScan] = useState('112-9313437-9389018');
  const [datePickerModal, setDatePickerModal] = useState(null);
  const [dateVal, setDateval] = useState({
    startDate: null,
    endDate: null,
  });

  const { endDate, startDate } = dateVal;

  const updateState = data => setDateval(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => {
    updateState({ [key]: val });
  };

  return {
    qrScan,
    setQrScan,
    isDate,
    currentDate,
    onChangeVal,
    datePickerModal,
    setDatePickerModal,
    dateVal,
    endDate,
    startDate,
  };
};
export default useTypeCodeScreen;
