import { View, Text, TextInput, Image } from 'react-native';
import React, { memo } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';
import { calendar, cameraGray, galleryYellow } from '../../Assets';
import ThemeButton from '../../Components/ThemeButton';
import { Touchable } from '../../Components/Touchable';
import NavigationService from '../../Services/NavigationService';
import useTypeCodeScreen from './useTypeCodeScreen';
import DatePicker from 'react-native-date-picker';
import { formatDateToLong } from '../../Services/GlobalFunctions';
import { TextComponent } from '../../Components/TextComponent';

const TypeCodeScreen = ({ navigation, route }) => {
  const {
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
  } = useTypeCodeScreen(navigation, route);

  return (
    <View>
      <HeaderComponent headerTitle={''} isBack />

      {isDate ? (
        <>
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
              placeholder="Select Start date"
              placeholderTextColor={'gray'}
              style={{ color: 'black' }}
              value={startDate ? formatDateToLong(startDate) : null}
              editable={false}
            />
            <Touchable onPress={() => setDatePickerModal('startDate')}>
              <Image
                source={calendar}
                resizeMode="contain"
                style={{ width: wp('7'), height: hp('3') }}
                tintColor={'black'}
              />
            </Touchable>
          </View>
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
              marginTop: hp('2'),
            }}
          >
            <TextInput
              placeholder="Select End date"
              placeholderTextColor={'gray'}
              style={{ color: 'black' }}
              value={endDate ? formatDateToLong(endDate) : null}
              editable={false}
            />
            <Touchable onPress={() => setDatePickerModal('endDate')}>
              <Image
                source={calendar}
                resizeMode="contain"
                style={{ width: wp('7'), height: hp('3') }}
                tintColor={'black'}
              />
            </Touchable>
          </View>
        </>
      ) : (
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
      )}

      <ThemeButton
        isTheme
        style={{ width: wp('90'), alignSelf: 'center', marginTop: hp('5') }}
        title={'Continue'}
        onPress={() =>
          NavigationService.navigate('TableDataScreen', {
            code: qrScan,
            isDate,
            startDate,
            endDate,
          })
        }
      />

      <DatePicker
        // mode={'datetime'}
        mode={'date'}
        open={Boolean(datePickerModal != null)}
        date={dateVal[datePickerModal] ?? currentDate}
        // date={value ?? currentDate}
        is24hourSource="locale"
        locale="en"
        onCancel={() => setDatePickerModal(null)}
        modal
        onConfirm={e => {
          console.log(
            'lksdbvlksbdlkvbsdlkbvlsdblvkbsdlvbsdkvsd',
            e,
            new Date(e.getTime() + 24 * 60 * 60 * 1000),
            e.toDateString(),
          );
          onChangeVal(datePickerModal, e);
          setDatePickerModal(null);
        }}
      />
    </View>
  );
};

export default memo(TypeCodeScreen);
