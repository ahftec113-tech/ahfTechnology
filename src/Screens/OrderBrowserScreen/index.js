import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import React, { memo, useState } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { hp, wp } from '../../Hooks/useResponsive';
import { TextComponent } from '../../Components/TextComponent';
import Accordion from 'react-native-collapsible/Accordion';
import { styles } from './styles';
import { Colors } from '../../Theme/Variables';
import ThemeButton from '../../Components/ThemeButton';
import BtnModalComponent from '../../Components/BtnModalComp';
import useOrderBrowserScreen from './useOrderBrowserScreen';
import { Touchable } from '../../Components/Touchable';
import { orderDetail, orders } from '../../Utils/localDB';
import OrderTableComp from '../../Components/OrderTableComp';
import {
  afhLogo,
  bulkOrder,
  clockOrange,
  LoginBg,
  logOutGray,
  ordeerDetail,
  orderByDate,
  orderReport,
} from '../../Assets';
import { store } from '../../Redux/Reducer';
import { logOutAuth } from '../../Redux/Action/AuthAction';

const OrderBrowserScreen = ({ navigation }) => {
  const {
    modalState,
    selectTag,
    arrySelector,
    setModalState,
    onChangeVal,
    selectedfield,
    selectedDay,
    orderNumber,
    onSearch,
    tableArryData,
    onLogPress,
  } = useOrderBrowserScreen();

  const SECTIONS = [
    {
      title: 'Show Purchase Order By Date',
      content: 'This is the inner content of section 1',
    },
  ];

  const [activeSections, setActiveSections] = useState([]);

  const _renderHeader = (section, _, isActive) => {
    return (
      <View style={[styles.header, isActive && styles.activeHeader]}>
        <Text style={styles.headerText}>{section.title}</Text>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={styles.content}>
        {/* <Touchable
          style={styles.selectorView}
          onPress={() => setModalState('selectedDay')}
        >
          <TextComponent
            text={selectedDay?.label ?? 'Select by day'}
            fade={Boolean(!selectedDay)}
            size={'1.5'}
            family={'300'}
          />
        </Touchable>
        <Touchable
          style={styles.selectorView}
          onPress={() => setModalState('selectedfield')}
        >
          <TextComponent
            text={selectedfield?.label ?? 'Select field'}
            fade={Boolean(!selectedfield?.label)}
            size={'1.5'}
            family={'300'}
          />
        </Touchable> */}
        <View style={{ ...styles.selectorView }}>
          <TextInput
            placeholder="Type order number"
            placeholderTextColor={Colors.textGray}
            style={{ fontSize: hp('1.5'), color: 'black' }}
            keyboardType="number-pad"
            value={orderNumber}
            onChangeText={e => onChangeVal('orderNumber', e)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: hp('2'),
          }}
        >
          <ThemeButton
            title={'Scan Qr Code'}
            style={{ width: wp('40'), height: hp('4') }}
            textStyle={{ fontSize: hp('1.5') }}
            isTransparent
            onPress={() => {
              navigation.navigate('QRCodeScanScreen', {
                onChange: e => {
                  console.log('slkdvlksdnvlndskvlskdklvdsnvlsknd', e);
                  onChangeVal('orderNumber', e);
                },
              });
              onSearch();
            }}
          />
          <ThemeButton
            title={'Show'}
            style={{ width: wp('40'), height: hp('4') }}
            textStyle={{ fontSize: hp('1.5') }}
            isTheme
            onPress={onSearch}
          />
        </View>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };

  return (
    <ImageBackground source={LoginBg} style={{ flex: 1, paddingTop: hp('5') }}>
      {/* <HeaderComponent headerTitle={'Order Browser'} isBack /> */}

      <View style={styles.headerRow}>
        <Image source={afhLogo} resizeMode="contain" style={styles.logo} />
        <ThemeButton
          isTheme
          style={styles.logoutButton}
          imageStyle={styles.logoutImage}
          image={logOutGray}
          title={'Log Out'}
          onPress={() => store.dispatch(logOutAuth())}
        />
      </View>

      <ThemeButton
        title={'Time Zone'}
        isTransparent
        image={clockOrange}
        style={{ width: wp('50'), alignSelf: 'center', borderWidth: 0 }}
      />
      <View style={styles.timeZoneContainer}>
        <ThemeButton
          title={'Time Zone'}
          isTheme
          isDisable
          style={styles.timeZoneButton}
        />
        <ThemeButton
          title={'Time Zone'}
          isTheme
          isDisable
          style={styles.timeZoneButton}
        />
      </View>

      <ThemeButton
        title={'Show Purchase Order\nBy Bulk Orders/Skus/PIDs'}
        isTransparent
        image={bulkOrder}
        isRight
        style={{ ...styles.bulkOrderButton, marginTop: hp('2') }}
        textStyle={styles.bulkOrderText}
        imageStyle={styles.bulkOrderImage}
        onPress={() =>
          navigation.navigate('CodeTypeSelectorScreen', {
            moduleType: 'byBulk',
          })
        }
      />
      <ThemeButton
        title={'Show Purchase Order\nBy Order Date'}
        isTransparent
        image={orderByDate}
        isRight
        style={styles.bulkOrderButton}
        textStyle={styles.bulkOrderText}
        imageStyle={styles.bulkOrderImage}
        onPress={() =>
          navigation.navigate('TypeCodeScreen', { isDateSelector: true })
        }
      />
      {/* <ThemeButton
        title={'Show Purchase Order\nDetails'}
        isTransparent
        image={ordeerDetail}
        isRight
        style={styles.bulkOrderButton}
        textStyle={styles.bulkOrderText}
        imageStyle={styles.bulkOrderImage}
        onPress={() =>
          navigation.navigate('CodeTypeSelectorScreen', {
            moduleType: 'orderDetail',
          })
        }
      />
      <ThemeButton
        title={'Show Purchase Order\nReport'}
        isTransparent
        image={orderReport}
        isRight
        style={styles.bulkOrderButton}
        textStyle={styles.bulkOrderText}
        imageStyle={styles.bulkOrderImage}
        onPress={() =>
          navigation.navigate('CodeTypeSelectorScreen', {
            moduleType: 'orderReport',
          })
        }
      /> */}

      {/* <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        touchableComponent={TouchableOpacity}
        expandMultiple={false} // agar ek waqt me sirf ek hi section open karna ho
      /> */}
      {tableArryData && (
        <OrderTableComp
          arryData={tableArryData ?? []}
          onCodePress={e => navigation.navigate('OrderDetailScreen', e)}
          onLogPress={onLogPress}
        />
      )}
      {modalState && (
        <BtnModalComponent
          activeTags={selectTag[modalState]}
          allData={arrySelector[modalState]}
          //   heading={onPressKey}
          // activeTitle={'select Diet'}
          isModal={modalState}
          onPress={() => setModalState(null)}
          onSelect={e => {
            onChangeVal([modalState], e);
          }}
          onBackPress={() => setModalState(null)}
        />
      )}
    </ImageBackground>
  );
};

export default memo(OrderBrowserScreen);
