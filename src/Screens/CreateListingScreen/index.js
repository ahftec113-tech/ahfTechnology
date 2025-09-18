import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Switch,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import useCreateListingScreen from './useCreateListingScreen';
import BtnModalComponent from '../../Components/BtnModalComp';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import {
  arrDown,
  arrowRight,
  bathRoomIcon,
  bedIcon,
  buildingGray,
  crossWhite,
  docAttachments,
  homeGray,
  location,
  phone,
  priceTagIcon,
  sms,
  SqFitIcon,
  takePhoto,
  uploadPhoto,
  uploadVideoLink,
} from '../../Assets';
import { TextComponent } from '../../Components/TextComponent';
import DividerLine from '../../Components/DividerLine';
import { Touchable } from '../../Components/Touchable';
import {
  getAreasUrl,
  getCitriesUrl,
  getCountriesUrl,
  getSubAreasUrl,
  getSubChildAreaUrl,
  imageUrl,
  newAgentListUrl,
} from '../../Utils/Urls';
import DynamicTopBarNavigator from '../../Navigation/TopBarTabsNavigation';
import { Colors } from '../../Theme/Variables';
import {
  formatPriceToPKStandard,
  pickDocument,
  uploadFromGalary,
} from '../../Services/GlobalFunctions';
import { styles } from './styles';
import ThemeButton from '../../Components/ThemeButton';
import { bathroomsArry, bedroomsArry, sizes } from '../../Utils/localDB';
import { hp, wp } from '../../Hooks/useResponsive';
import Video from 'react-native-video';
import FeaturesModalComp from './featuresModalComp';
import { SearchBar } from '@rneui/themed';
import { addDraftProject } from '../../Redux/Action/DraftAction';

const CreateListingScreen = ({ navigation, route }) => {
  const {
    userData,
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
    images,
    amenitiesData,
    isInstallment,
    readyForPossession,
    title,
    description,
    propertyVideoLink,
    propertyBlueprint,
    locationSearchInput,
    businessName,
    email,
    phone1,
    phone2,
    contactPersonName,
    estateLogo,
    isEdit,
    dispatch,
    isDraft,
    bannerImg,
    isCopy,
  } = useCreateListingScreen(navigation, route);

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

  const renderImages = useCallback(
    ({ item, index }) => {
      console.log('lksdlkdsnlkvnksdlnlvksdlvnlkdsnvsdlvk', item?.uri);
      // item?.type == 'image/png' ?
      return (
        <Pressable onPress={() => onChangeVal('bannerImg', index)}>
          <ImageBackground
            source={{ uri: item?.isEdit ? imageUrl(item?.uri) : item?.uri }}
            style={styles.imageBackground(Boolean(bannerImg == index))}
          >
            {bannerImg == index && (
              <TextComponent
                text={'Main Image'}
                isWhite
                styles={styles.imageText}
                family={'bold'}
              />
            )}
            <Touchable
              style={styles.touchable}
              onPress={() => {
                onChangeVal(
                  'images',
                  images.filter(res => res?.name != item?.name),
                );
                // onChangeVal('bannerImg', index);
              }}
            >
              <Image
                source={crossWhite}
                resizeMode="contain"
                style={styles.crossIcon}
              />
            </Touchable>
          </ImageBackground>
        </Pressable>
      );
      // : (
      //   <>
      //     <Touchable
      //       style={styles.touchable}
      //       onPress={() =>
      //         onChangeVal(
      //           'images',
      //           images.filter(res => res?.name != item?.name),
      //         )
      //       }
      //     >
      //       <Image
      //         source={crossWhite}
      //         resizeMode="contain"
      //         style={styles.crossIcon}
      //       />
      //     </Touchable>
      //     <Video
      //       source={{ uri: item.uri }}
      //       style={styles.video}
      //       resizeMode="cover"
      //       repeat={false}
      //       controls={false}
      //     />
      //   </>
      // );
    },
    [images, bannerImg],
  );

  return (
    <View style={styles.container}>
      <HeaderComponent
        headerTitle={`${isEdit ? 'Update' : isDraft ? 'Draft' : 'Create'} Ad`}
        isBack={isEdit ?? isDraft}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TextComponent
          text={'Add information'}
          size={'2.5'}
          family={'bold'}
          isThemeColor
        />
        <View style={styles.priceRangeRow}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={priceTagIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <TextComponent text={'Title'} family={'400'} size={'1.8'} />
          </View>
        </View>
        <View style={styles.priceInputRow}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder={'Enter your title'}
              style={styles.input}
              placeholderTextColor={'gray'}
              value={title}
              onChangeText={e => onChangeVal('title', e)}
            />
          </View>
        </View>
        <View style={styles.priceRangeRow}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={priceTagIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <TextComponent text={'Description'} family={'400'} size={'1.8'} />
          </View>
        </View>
        <View style={styles.priceInputRow}>
          <View
            style={{
              ...styles.inputContainer,
              height: hp('20'),
              justifyContent: 'flex-start',
              paddingLeft: wp('3'),
              overflow: 'scroll',
            }}
          >
            <TextInput
              placeholder={'Enter description'}
              style={{ ...styles.input, lineHeight: hp('2') }}
              placeholderTextColor={'gray'}
              multiline
              value={description}
              onChangeText={e => onChangeVal('description', e)}
            />
          </View>
        </View>
        <DividerLine />
        <TextComponent
          text={'Location and Purpose'}
          size={'2.5'}
          family={'bold'}
          isThemeColor
          styles={{ marginTop: hp('2') }}
        />
        <View style={styles.locationRow}>
          <Image
            source={location}
            resizeMode="contain"
            tintColor={'black'}
            style={styles.locationIcon}
          />
          <TextComponent text={'I Want to'} size={'1.5'} family={'400'} />
          <View style={styles.multiSelectContainer}>
            <MultiSelectButton
              items={[
                { id: 1, label: 'Rent' },
                { id: 2, label: 'Sell' },
              ]}
              isPrimaryColorStyle={true}
              selectedAlter={type}
              onSelectVal={(_, item) => onChangeVal('type', item)}
            />
          </View>
        </View>
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

        <View style={{ ...styles.priceRangeRow }}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={location}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <View>
              <TextComponent text={'Location'} family={'400'} size={'1.8'} />
              <TextComponent
                text={'Please enter the iframe link from google maps'}
                family={'400'}
                size={'1.5'}
                fade
              />
            </View>
          </View>
        </View>
        <TextInput
          placeholder="Add location..."
          placeholderTextColor={'gray'}
          style={styles.youtubeLinkInput}
          value={locationSearchInput}
          onChangeText={e => onChangeVal('locationSearchInput', e)}
        />
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
        <TextComponent
          text={'Price and Area'}
          size={'2.5'}
          family={'bold'}
          isThemeColor
          styles={{ marginTop: hp('2') }}
        />
        <View style={styles.priceRangeRow}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={priceTagIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <TextComponent
              text={'Property Price'}
              family={'400'}
              size={'1.8'}
            />
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
              value={minPrice}
              onChangeText={e => onChangeVal('minPrice', e)}
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: hp('2'),
            // backgroundColor: 'red',
          }}
        >
          <TextComponent text={formatPriceToPKStandard(minPrice)} />
        </View> */}
        <View style={styles.areaRangeRow}>
          <View style={styles.areaRangeLeft}>
            <Image
              source={SqFitIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <TextComponent text={'Area Size'} family={'400'} size={'1.8'} />
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
        <>
          <View style={styles.areaInputRow}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="0"
                style={styles.input}
                placeholderTextColor={'gray'}
                value={minArea}
                onChangeText={e => onChangeVal('minArea', e)}
                // value={}
                keyboardType="decimal-pad"
              />
            </View>
          </View>
        </>
        <View style={{ ...styles.priceRangeRow, marginTop: hp('2') }}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={priceTagIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <View>
              <TextComponent
                text={'Installment available'}
                family={'400'}
                size={'1.8'}
              />
              <TextComponent
                text={'Enable if listing is available on installments'}
                family={'400'}
                size={'1.5'}
                fade
              />
            </View>
          </View>
          <View style={styles.priceRangeRight}>
            <Switch
              trackColor={{ false: '#ccc', true: Colors.primaryColor }}
              thumbColor={isInstallment ? '#fff' : '#f4f3f4'}
              onChange={e => onChangeVal('isInstallment', !isInstallment)}
              value={isInstallment}
            />
            {/* <Image
              source={arrDown}
              resizeMode="contain"
              style={styles.arrowIcon}
            /> */}
          </View>
        </View>
        <View style={{ ...styles.priceRangeRow, marginVertical: hp('2') }}>
          <View style={styles.priceRangeLeft}>
            <Image
              source={priceTagIcon}
              resizeMode="contain"
              style={styles.priceIcon}
            />
            <View>
              <TextComponent
                text={'Ready for Possession'}
                family={'400'}
                size={'1.8'}
              />
              <TextComponent
                text={'Enable if listing is ready for possession'}
                family={'400'}
                size={'1.5'}
                fade
              />
            </View>
          </View>
          <View style={styles.priceRangeRight}>
            <Switch
              trackColor={{ false: '#ccc', true: Colors.primaryColor }}
              thumbColor={readyForPossession ? '#fff' : '#f4f3f4'}
              onChange={e =>
                onChangeVal('readyForPossession', !readyForPossession)
              }
              value={readyForPossession}
            />
            {/* <Image
              source={arrDown}
              resizeMode="contain"
              style={styles.arrowIcon}
            /> */}
          </View>
        </View>
        {/* <View style={styles.sizesContainer}>
          <MultiSelectButton
            items={sizes}
            isPrimaryColorStyle={true}
            selectedAlter={areaRange}
            onSelectVal={(_, e) => onChangeVal('areaRange', e)}
          />
        </View> */}
        <DividerLine />
        <TextComponent
          text={'Feature and Amenities'}
          size={'2.5'}
          family={'bold'}
          isThemeColor
          styles={{ marginTop: hp('2') }}
        />
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
        <ThemeButton
          title={'Add Amenities'}
          isTransparent
          style={{ marginBottom: hp('2') }}
          onPress={() => setModalStateFilter(true)}
        />
        <DividerLine />
        <TextComponent
          text={'Property Images and Documents'}
          size={'2.5'}
          family={'bold'}
          isThemeColor
          styles={{ marginTop: hp('2') }}
        />
        <View style={styles.bathroomsRow}>
          <Image
            source={takePhoto}
            resizeMode="contain"
            style={styles.priceIcon}
          />
          <TextComponent
            text={'Upload Images and videos of your Property'}
            family={'400'}
            size={'1.8'}
          />
        </View>
        <FlatList
          data={images}
          renderItem={renderImages}
          contentContainerStyle={styles.imgFlatList}
          horizontal
          ListFooterComponent={
            <Touchable
              onPress={async () => {
                const newImages = await uploadFromGalary(true, 'photo');
                console.log(
                  'imagesimagesimagesimagesimagesimagesimages',
                  newImages,
                );
                onChangeVal('images', [...(images ?? []), ...newImages]);
              }}
            >
              <Image
                source={uploadPhoto}
                resizeMode="contain"
                style={{ width: wp('44'), height: hp('15') }}
              />
            </Touchable>
          }
        />
        <View style={styles.bathroomsRow}>
          <Image
            source={uploadVideoLink}
            resizeMode="contain"
            style={styles.priceIcon}
          />
          <View>
            <TextComponent
              text={'Add Videos of your Property'}
              family={'400'}
              size={'1.8'}
            />

            <TextComponent
              text={
                'Add videos of your property from Youtube. Upload on Youtube and paste the link below.'
              }
              family={'400'}
              size={'1.5'}
              fade
              styles={{ width: wp('85') }}
            />
          </View>
        </View>
        <TextInput
          placeholder="Place video link here..."
          placeholderTextColor={'gray'}
          style={styles.youtubeLinkInput}
          value={propertyVideoLink}
          onChangeText={e => onChangeVal('propertyVideoLink', e)}
        />
        <View style={{ ...styles.bathroomsRow, marginBottom: hp('2') }}>
          <Image
            source={docAttachments}
            resizeMode="contain"
            style={{ ...styles.priceIcon, width: wp('4'), height: hp('2') }}
            tintColor={'gray'}
          />
          <TextComponent
            text={'Add Blueprint/Buildermap of your Property'}
            family={'400'}
            size={'1.8'}
          />
        </View>
        <ThemeButton
          title={'Upload doc'}
          isTheme
          style={{ width: wp('40') }}
          onPress={async () => {
            const doc = await pickDocument();
            console.log('lkvnklsdnbvklsdnkvlsdklvksdnvlksdkvsd', doc);
            onChangeVal('propertyBlueprint', doc[0]);
          }}
        />
        {propertyBlueprint?.uri && (
          <TextComponent
            text={propertyBlueprint?.name}
            family={'400'}
            size={'1.5'}
            styles={{ marginTop: hp('2') }}
          />
        )}
        {/* <Touchable
          onPress={async () => {
            const doc = await pickDocument();
            onChangeVal('propertyBlueprint', doc);
          }}
        >
     
        </Touchable> */}
        {userData?.role == 1 && (
          <>
            <TextComponent
              text={'Contact Information'}
              size={'2.5'}
              family={'bold'}
              isThemeColor
              styles={{ marginTop: hp('3') }}
            />
            <View
              style={{
                ...styles.bathroomsRow,
                marginTop: hp('2'),
              }}
            >
              <Image
                source={sms}
                resizeMode="contain"
                style={{ ...styles.priceIcon, width: wp('4'), height: hp('2') }}
                tintColor={'gray'}
              />
              <TextComponent text={'Email'} family={'400'} size={'1.8'} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'Enter your email'}
                style={styles.input}
                placeholderTextColor={'gray'}
                value={email ?? businessName?.email}
                onChangeText={e => onChangeVal('email', e)}
              />
            </View>
            <View style={{ ...styles.bathroomsRow, marginTop: hp('2') }}>
              <Image
                source={phone}
                resizeMode="contain"
                style={{ ...styles.priceIcon, width: wp('4'), height: hp('2') }}
                tintColor={'gray'}
              />
              <TextComponent text={'Phone'} family={'400'} size={'1.8'} />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'+92'}
                style={styles.input}
                placeholderTextColor={'gray'}
                value={phone1 ?? businessName?.phoneNum1}
                onChangeText={e => onChangeVal('phone1', e)}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder={'+92'}
                style={styles.input}
                placeholderTextColor={'gray'}
                value={phone2 ?? businessName?.phoneNum2}
                onChangeText={e => onChangeVal('phone2', e)}
                keyboardType="decimal-pad"
              />
            </View>
            <View style={{ ...styles.bathroomsRow, marginTop: hp('2') }}>
              <Image
                source={homeGray}
                resizeMode="contain"
                style={{ ...styles.priceIcon, width: wp('4'), height: hp('2') }}
                tintColor={'gray'}
              />
              <TextComponent
                text={'Real Estate Info'}
                family={'400'}
                size={'1.8'}
              />
            </View>
            <Touchable
              style={{
                ...styles.inputContainer,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('ListViewScreen', {
                  urlName: newAgentListUrl + '?per_page=9999',
                  onSelectValue: item => onChangeVal('businessName', item),
                  selectedValue: [businessName],
                });
              }}
            >
              <TextComponent
                fade
                size={'1.5'}
                family={'300'}
                text={
                  businessName?.agency_name ?? 'Select Real State Business Name'
                }
                styles={{ marginLeft: wp('1.5') }}
              />
              <Image
                source={arrowRight}
                resizeMode="contain"
                style={{ width: wp('5'), height: hp('3') }}
              />
            </Touchable>

            <View style={{ ...styles.bathroomsRow, marginTop: hp('2') }}>
              <Image
                source={homeGray}
                resizeMode="contain"
                style={{ ...styles.priceIcon, width: wp('4'), height: hp('2') }}
                tintColor={'gray'}
              />
              <TextComponent
                text={'Real Estate Logo'}
                family={'400'}
                size={'1.8'}
              />
            </View>
            <Touchable
              style={styles.uploadLogo}
              onPress={async () => {
                const newImages = await uploadFromGalary(false, 'photo');
                console.log(
                  'imagesimagesimagesimagesimagesimagesimages',
                  newImages,
                );
                onChangeVal('estateLogo', newImages);
              }}
              disabled={true}
            >
              {businessName?.agency_logo ? (
                <Image
                  source={{ uri: imageUrl(businessName?.agency_logo) }}
                  style={{
                    height: hp('15'),
                    alignSelf: 'center',
                    width: wp('94'),
                    borderRadius: 10,
                  }}
                />
              ) : (
                <TextComponent
                  text={'Upload here'}
                  fade
                  size={'1.8'}
                  family={'300'}
                />
              )}
            </Touchable>
          </>
        )}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <ThemeButton
            title={'Draft'}
            isTransparent
            style={styles.showAdsButton}
            onPress={() => onSearchFilter(true)}
          />
          <ThemeButton
            title={`${Boolean(isEdit || isCopy) ? 'Update' : ' Create'} Ad`}
            isTheme
            style={styles.showAdsButton}
            onPress={() => onSearchFilter(false, isCopy)}
          />
        </View>
        <TextComponent
          text={'Create a copy of this ad?'}
          isThemeColor
          onPress={() => onSearchFilter(false, true)}
          family={'bold'}
          styles={{
            textAlign: 'center',
            marginTop: hp('2'),
            textDecorationLine: 'underline',
          }}
        />
      </ScrollView>
      {modalStateFilter && (
        <FeaturesModalComp
          isModal={modalStateFilter}
          activeTags={amenitiesData}
          onPress={() => setModalStateFilter(null)}
          onSelect={e => {
            onChangeVal('amenitiesData', e);
          }}
          onBackPress={() => setModalStateFilter(null)}
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
            onChangeVal('AreaUnits', e);
          }}
          onBackPress={() => setModalState(null)}
        />
      )}
    </View>
  );
};

export default memo(CreateListingScreen);
