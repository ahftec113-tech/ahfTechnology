import { useState, useEffect, useCallback } from 'react';
import {
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export const useQRCodeScannerScreen = ({ goBack }, { params }) => {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [scanned, setScanned] = useState(false);

  // Scanner setup
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        setScanned(true);
        params?.onChange(codes[0].value);
        goBack();
        setTimeout(() => setScanned(false), 2000); // reactivate after 2s
      }
    },
  });

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  const handleManualScan = useCallback(() => {
    // manual scan trigger (if needed)
    setScanned(false);
  }, []);

  return {
    device,
    hasPermission,
    codeScanner,
    handleManualScan,
  };
};
