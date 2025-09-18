import React from 'react';
import { View } from 'react-native';
import { Camera } from 'react-native-vision-camera';
import styles from './styles';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { useQRCodeScannerScreen } from './useQRCodeScanScreen';

const QRCodeScannerScreen = ({ route, navigation }) => {
  const { device, hasPermission, codeScanner, handleManualScan } =
    useQRCodeScannerScreen(navigation, route);

  if (!device || !hasPermission) return null;

  return (
    <View style={styles.container}>
      {/* Camera Preview */}
      <Camera
        style={styles.camera}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />

      {/* Custom Marker */}
      <View style={styles.cameraView}>
        <View style={styles.barView} />
      </View>

      {/* Bottom Content */}
      <View style={styles.innerView}>
        <TextComponent text="Barcode Scanner" styles={styles.heading} />
        <TextComponent
          text="Tap the button below to scan barcode"
          styles={styles.subHeading}
        />
        <ThemeButton
          title="Tap to scan"
          onPress={handleManualScan}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

export default QRCodeScannerScreen;
