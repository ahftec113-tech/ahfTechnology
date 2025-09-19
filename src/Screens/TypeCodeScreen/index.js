import { View, Text, TextInput, Image } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { cameraGray, galleryYellow } from '../../Assets';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';
import NavigationService from '../../Services/NavigationService';
import useTypeCodeScreen from './useTypeCodeScreen';

const TypeCodeScreen = () => {
  const { qrScan, setQrScan } = useTypeCodeScreen();

  return (
    <View>
      <HeaderComponent headerTitle={''} isBack />
      <View
        style={{
          width: wp('90'),
          alignSelf: 'center',
          backgroundColor: Colors.diableBtnCOlor,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: wp('2'),
          paddingVertical: hp('2'),
          marginTop: hp('20'),
        }}
      >
        <TextInput
          placeholder="Type here..."
          placeholderTextColor={'gray'}
          style={{ color: 'black' }}
          value={qrScan}
          onChangeText={setQrScan}
        />
        <Touchable
          onPress={() =>
            NavigationService.navigate('QRCodeScanScreen', {
              onChange: e => {
                setQrScan(e);
              },
            })
          }
        >
          <Image
            source={cameraGray}
            resizeMode="contain"
            style={{ width: wp('7'), height: hp('3') }}
          />
        </Touchable>
      </View>
      <ThemeButton
        isTheme
        style={{ width: wp('90'), alignSelf: 'center', marginTop: hp('5') }}
        title={'Continue'}
        onPress={() =>
          NavigationService.navigate('TableDataScreen', { code: qrScan })
        }
      />
    </View>
  );
};

export default memo(TypeCodeScreen);
