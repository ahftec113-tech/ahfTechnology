import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
} from 'react-native';
import React, { memo, useCallback, useState } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import {
  arrDown,
  arrowRight,
  arrRight,
  bathRoomIcon,
  bedIcon,
  buildingGray,
  home,
  location,
  mapIcon,
  priceTagIcon,
  SqFitIcon,
} from '../../Assets';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import DividerLine from '../../Components/DividerLine';
import DynamicTopBarNavigator from '../../Navigation/TopBarTabsNavigation';
import { Colors } from '../../Theme/Variables';
import RangeSlider from 'react-native-sticky-range-slider';
import { bathroomsArry, bedroomsArry, sizes } from '../../Utils/localDB';
import ThemeButton from '../../Components/ThemeButton';
import { styles } from './styles';
import useFilterScreen from './useFilterScreen';
import { Touchable } from '../../Components/Touchable';
import {
  getAreasUrl,
  getCitriesUrl,
  getCountriesUrl,
  getSubAreasUrl,
  getSubChildAreaUrl,
} from '../../Utils/Urls';
import FilterREsetModal from './filterReaetModal';
import FilterResetModal from './filterReaetModal';
import BtnModalComponent from '../../Components/BtnModalComp';
import { formatPriceToPKStandard } from '../../Services/GlobalFunctions';

const FilterScreen = ({ navigation, route }) => {
  const {
    onChangeVal,
    area,
    bathRoom,
    bedRooms,
    country,
    city,
    type,
    disableRange,
    handleValueChange,
    handleToggle,
    MIN_AGE,
    MAX_AGE,
    subChildArea,
    subArea,
    minPrice,
    maxPrice,
    MAX_PRICE,
    MIN_PRICE,
    areaRange,
    minArea,
    maxArea,
    MIN_AREA,
    MAX_AREA,
    filters,
    onSearchFilter,
    handleValueChangeOfArea,
    setModalVisible,
    modalVisible,
    resetAll,
    modalState,
    setModalState,
    arrySelector,
    selectTag,
    attributesData,
    propertyType,
    AreaUnits,
    setModalStateFilter,
    modalStateFilter,
  } = useFilterScreen(navigation, route);
  const Thumb = type => <View style={styles.thumb} />;
  const Rail = () => <View style={styles.rail} />;
  const RailSelected = () => <View style={styles.railSelected} />;
  const TopHomeComp = useCallback(
    ({ arryList }) => {
      return (
        <ScrollView
          contentContainerStyle={styles.topHomeCompContainer}
          showsHorizontalScrollIndicator={false}
          // horizontal
        >
          <MultiSelectButton
            items={arryList}
            isPrimaryColorStyle={true}
            selectedAlter={propertyType}
            onSelectVal={(_, e) => onChangeVal('propertyType', e)}
          />
        </ScrollView>
      );
    },
    [propertyType],
  );

  const myScreens = useCallback(
    Object.entries(attributesData?.ProopertyType ?? {}).map(([key, value]) => ({
      name: key,
      component: () => <TopHomeComp arryList={value} />,
    })),
    [attributesData?.ProopertyType, propertyType],
  );

  return (
    <View style={styles.container}>
      <HeaderComponent
        headerTitle={'Filters'}
        isBack
        // style={{ backgroundColor: 'red' }}
        rightText={'Reset'}
        rightTextStyle={{ color: 'red', fontSize: hp('2') }}
        onRightPress={() => {
          resetAll();
        }}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.locationRow}>
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <TextComponent text={'I Want to'} size={'1.5'} family={'bold'} />
          <View style={styles.multiSelectContainer}>
            <MultiSelectButton
              items={[
                { id: 1, label: 'Rent' },
                { id: 3, label: 'Buy' },
              ]}
              isPrimaryColorStyle={true}
              selectedAlter={type}
              onSelectVal={(_, item) => onChangeVal('type', item)}
            />
          </View>
        </View>
        <DividerLine />
        <Touchable
          style={styles.cityRow}
          onPress={() => {
            navigation.navigate('ListViewScreen', {
              urlName: getCountriesUrl,
              onSelectValue: item => {
                onChangeVal('country', item);
                onChangeVal('city', {});
                onChangeVal('area', {});
                onChangeVal('subArea', {});
                onChangeVal('subChildArea', {});
              },
              selectedValue: [country],
            });
          }}
        >
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <View style={styles.cityTextContainer}>
            <TextComponent text={'Country'} family={'400'} size={'1.8'} />
            <TextComponent
              text={country?.name ?? 'Not selected'}
              fade
              size={'1.5'}
              family={'400'}
            />
          </View>
          <Image
            source={arrowRight}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.arrowIcon}
          />
        </Touchable>
        <DividerLine />
        <Touchable
          style={styles.cityRow}
          onPress={() => {
            navigation.navigate('ListViewScreen', {
              urlName: getCitriesUrl + country?.id,
              onSelectValue: item => {
                onChangeVal('city', item);
                onChangeVal('area', {});
                onChangeVal('subArea', {});
                onChangeVal('subChildArea', {});
              },
              selectedValue: [city],
            });
          }}
        >
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <View style={styles.cityTextContainer}>
            <TextComponent text={'City'} family={'400'} size={'1.8'} />
            <TextComponent
              text={city?.name ?? 'Not selected'}
              fade
              size={'1.5'}
              family={'400'}
            />
          </View>
          <Image
            source={arrowRight}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.arrowIcon}
          />
        </Touchable>
        <DividerLine />
        <Touchable
          style={styles.cityRow}
          onPress={() => {
            navigation.navigate('ListViewScreen', {
              urlName: getAreasUrl + city?.id,
              onSelectValue: item => {
                onChangeVal('area', item);
                onChangeVal('subArea', {});
                onChangeVal('subChildArea', {});
              },
              selectedValue: [area],
            });
          }}
        >
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <View style={styles.cityTextContainer}>
            <TextComponent text={'Areas'} family={'400'} size={'1.8'} />
            <TextComponent
              text={area?.name ?? 'Not selected'}
              fade
              size={'1.5'}
              family={'400'}
            />
          </View>
          <Image
            source={arrowRight}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.arrowIcon}
          />
        </Touchable>
        <DividerLine />
        <Touchable
          style={styles.cityRow}
          onPress={() => {
            navigation.navigate('ListViewScreen', {
              urlName: getSubAreasUrl + area?.id,
              onSelectValue: item => {
                onChangeVal('subArea', item);
                onChangeVal('subChildArea', {});
              },
              selectedValue: [subArea],
            });
          }}
        >
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <View style={styles.cityTextContainer}>
            <TextComponent
              text={'Search Sub Location'}
              family={'400'}
              size={'1.8'}
            />
            <TextComponent
              text={subArea?.name ?? 'Not selected'}
              fade
              size={'1.5'}
              family={'400'}
            />
          </View>
          <Image
            source={arrowRight}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.arrowIcon}
          />
        </Touchable>
        <DividerLine />
        <Touchable
          style={styles.cityRow}
          onPress={() => {
            navigation.navigate('ListViewScreen', {
              urlName: getSubChildAreaUrl + subArea?.id,
              onSelectValue: item => onChangeVal('subChildArea', item),
              selectedValue: [subChildArea],
            });
          }}
        >
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <View style={styles.cityTextContainer}>
            <TextComponent
              text={'Search Child Location'}
              family={'400'}
              size={'1.8'}
            />
            <TextComponent
              text={subChildArea?.name ?? 'Not selected'}
              fade
              size={'1.5'}
              family={'400'}
            />
          </View>
          <Image
            source={arrowRight}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.arrowIcon}
          />
        </Touchable>
        <DividerLine />
        <View style={styles.selectLocationContainer}>
          <View style={styles.selectLocationRow}>
            <Image
              source={buildingGray}
              resizeMode="contain"
              tintColor={'black'}
              style={styles.locationIcon}
            />
            <TextComponent text={'Property Type'} family={'400'} size={'1.8'} />
          </View>
          <View style={styles.mapContainer}>
            <DynamicTopBarNavigator
              screens={myScreens}
              navigatorProps={{
                screenOptions: {
                  swipeEnabled: false, // 🚫 disables swipe gestures
                  tabBarIndicatorStyle: {
                    backgroundColor: Colors.primaryColor,
                    alignItem: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                  },
                },
              }}
            />
          </View>
        </View>
        <DividerLine />
        <View style={styles.priceRangeRow}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={priceTagIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <TextComponent text={'Price range'} family={'400'} size={'1.8'} />
          </View>
          <View style={styles.priceRangeRight}>
            <TextComponent text={'PKR'} family={'400'} size={'1.8'} />
            {/* <Image
              source={arrDown}
              resizeMode="contain"
              style={styles.arrowIcon}
            /> */}
          </View>
        </View>
        <View style={styles.priceInputRow}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="0"
              style={styles.input}
              placeholderTextColor={'gray'}
              value={minPrice === '' ? '' : String(minPrice)}
              onChangeText={e => onChangeVal('minPrice', e)}
              keyboardType="decimal-pad"
            />
          </View>
          <TextComponent text={'TO'} family={'400'} size={'1.5'} />
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Any"
              style={styles.input}
              placeholderTextColor={'gray'}
              value={maxPrice === '' ? '' : String(maxPrice)}
              onChangeText={e => onChangeVal('maxPrice', e)}
              keyboardType="decimal-pad"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}
        >
          <TextComponent text={formatPriceToPKStandard(minPrice)} />
          <TextComponent text={formatPriceToPKStandard(maxPrice)} />
        </View>
        <RangeSlider
          style={styles.slider}
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={1}
          minRange={5}
          low={minPrice}
          high={maxPrice ?? 10000000}
          onValueChanged={handleValueChange}
          renderLowValue={value => <Text style={styles.valueText}></Text>}
          renderHighValue={value => <Text style={styles.valueText}></Text>}
          renderThumb={Thumb}
          renderRail={Rail}
          renderRailSelected={RailSelected}
        />
        <DividerLine />
        <View style={styles.areaRangeRow}>
          <View style={styles.areaRangeLeft}>
            <Image
              source={SqFitIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <TextComponent text={'Area range'} family={'400'} size={'1.8'} />
          </View>
          <Touchable
            style={styles.areaRangeRight}
            onPress={() => {
              setModalState(1);
            }}
          >
            <TextComponent text={AreaUnits?.id} family={'400'} size={'1.8'} />
            <Image
              source={arrDown}
              resizeMode="contain"
              style={styles.arrowIcon}
            />
          </Touchable>
        </View>
        {AreaUnits?.id != null && (
          <>
            <View style={styles.areaInputRow}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="0"
                  style={styles.input}
                  placeholderTextColor={'gray'}
                  value={minArea === '' ? '' : String(minArea)}
                  onChangeText={e => onChangeVal('minArea', e)}
                  // value={}
                />
              </View>
              <TextComponent text={'TO'} family={'400'} size={'1.5'} />
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Any"
                  style={styles.input}
                  placeholderTextColor={'gray'}
                  value={maxArea === '' ? '' : String(maxArea)}
                  onChangeText={e => onChangeVal('maxArea', e)}
                />
              </View>
            </View>
            <RangeSlider
              style={styles.slider}
              min={MIN_AREA}
              max={MAX_AREA}
              step={1}
              minRange={5}
              low={minArea}
              high={maxArea ?? 400}
              onValueChanged={handleValueChangeOfArea}
              renderLowValue={value => <Text style={styles.valueText}></Text>}
              renderHighValue={value => <Text style={styles.valueText}></Text>}
              renderThumb={Thumb}
              renderRail={Rail}
              renderRailSelected={RailSelected}
            />
          </>
        )}
        <View style={styles.sizesContainer}>
          <MultiSelectButton
            items={sizes}
            isPrimaryColorStyle={true}
            selectedAlter={areaRange}
            onSelectVal={(_, e) => onChangeVal('areaRange', e)}
          />
        </View>
        <DividerLine />
        <View style={styles.bedroomsRow}>
          <Image
            source={bedIcon}
            resizeMode="contain"
            style={styles.priceIcon}
          />
          <TextComponent text={'Bedrooms'} family={'400'} size={'1.8'} />
        </View>
        <View style={styles.bedroomsButtonContainer}>
          <MultiSelectButton
            items={bedroomsArry}
            isPrimaryColorStyle={true}
            selectedAlter={bedRooms}
            onSelectVal={(_, e) => onChangeVal('bedRooms', e)}
          />
        </View>
        <DividerLine />
        <View style={styles.bathroomsRow}>
          <Image
            source={bathRoomIcon}
            resizeMode="contain"
            style={styles.priceIcon}
          />
          <TextComponent text={'Bathrooms'} family={'400'} size={'1.8'} />
        </View>
        <View style={styles.bathroomsButtonContainer}>
          <MultiSelectButton
            items={bathroomsArry}
            isPrimaryColorStyle={true}
            selectedAlter={bathRoom}
            onSelectVal={(_, e) => onChangeVal('bathRoom', e)}
          />
        </View>
      </ScrollView>
      <ThemeButton
        title={'Show Ads'}
        isTheme
        style={styles.showAdsButton}
        onPress={onSearchFilter}
      />
      {/* <FilterResetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={filters}
        onConfirm={resetAll}
      /> */}

      {modalState && (
        <BtnModalComponent
          activeTags={selectTag[modalState]}
          allData={arrySelector[modalState]}
          //   heading={onPressKey}
          // activeTitle={'select Diet'}
          isModal={modalState}
          onPress={() => setModalState(null)}
          onSelect={e => {
            onChangeVal('AreaUnits', e);
          }}
          onBackPress={() => setModalState(null)}
        />
      )}
    </View>
  );
};

export default memo(FilterScreen);
