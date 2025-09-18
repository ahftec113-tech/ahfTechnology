import { useState } from 'react';

const useTypeCodeScreen = () => {
  const [qrScan, setQrScan] = useState('112-9313437-9389018');
  return { qrScan, setQrScan };
};
export default useTypeCodeScreen;
