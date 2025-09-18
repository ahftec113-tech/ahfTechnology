import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { hp, wp } from '../../Hooks/useResponsive';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';
import { styles } from './styles';
import { Colors } from '../../Theme/Variables';
import { HeaderComponent } from '../../Components/HeaderComp';
import ImageSliderComp from '../../Components/ImageSliderComp';
import useProjectDetailScreen from './useProjectDetailScreen';
import {
  convertToLocalTime,
  extractTimeFromString,
  formatDateToCustomFormat,
  formatPriceToPKStandard,
  makeCall,
  sendSMS,
  sendWhatsApp,
} from '../../Services/GlobalFunctions';
import {
  bathRoomIcon,
  bedIcon,
  homeIcon,
  phone,
  SqFitIcon,
  whatappIcon,
} from '../../Assets';
import { convertHTML } from 'react-native-html-string';
import RenderHtml from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { Touchable } from '../../Components/Touchable';
import { keyExtractor } from '../../Utils';
import PropertyCardComp from '../../Components/PropertyCardComp';
import { imageUrl } from '../../Utils/Urls';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import FastImage from 'react-native-fast-image';
import NavigationService from '../../Services/NavigationService';

const media = [
  'https://example.com/image1.jpg',
  'https://example.com/video1.mp4',
  'https://example.com/image2.png',
];

const ProjectDetailScreen = ({ navigation, route }) => {
  const {
    projectDetails,
    similarProjects,
    readMoreTitleState,
    readMoreTitle,
    setSelectedTab,
    selectedTab,
    dynamicNavigation,
    setProjectId,
    refetch,
    scrollRef,
    scrollToTop,
  } = useProjectDetailScreen(navigation, route);

  console.log('lkjsdbvklsdbvklsdblkvsdkbvlsdbvksdlblvkds', projectDetails);

  const detailsData = [
    { label: 'Type', value: projectDetails?.area_type ?? 'Not available' },
    {
      label: 'Price',
      value:
        formatPriceToPKStandard(projectDetails?.price) != ''
          ? formatPriceToPKStandard(projectDetails?.price)
          : 'Not available',
      isLink: true,
    },
    {
      label: 'Location',
      value: `${projectDetails?.city_name}, ${projectDetails?.country_name}`,
    },
    {
      label: 'Bath(s)',
      value: projectDetails?.total_bathrooms ?? 'Not available',
    },
    {
      label: 'Area',
      value: projectDetails?.area_with_type ?? 'Not availabe',
    },
    { label: 'Purpose', value: projectDetails?.purpose ?? 'Not available' },
    {
      label: 'Bedroom(s)',
      value: projectDetails?.total_bedrooms ?? 'Not available',
    },
  ];

  const source = {
    html: `${projectDetails?.detail}`,
  };

  const DetailsTable = ({ details }) => {
    return (
      <View style={styles.tableContainer}>
        {/* Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Details</Text>
        </View>

        {/* Rows */}
        {details.map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? '#fff' : '#f8f8f8' },
            ]}
          >
            <Text style={styles.tableLabel}>{item.label}</Text>
            <Text style={[styles.tableValue, item.isLink && styles.tableLink]}>
              {item.value}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderItem = ({ item, index }) => {
    // const isEven = index % 2 === 0;
    // const isLastItem = index === yourData.length - 1;
    // const isSingleItem = yourData.length === 1;

    return (
      <PropertyCardComp
        item={item}
        key={index}
        image={item.image}
        logo={homeIcon}
        price={item.price}
        title={item.project_name}
        beds={item.total_bedrooms}
        baths={item.total_bathrooms}
        area={item?.area}
        tag1={item.area_name}
        tag2={item.type_and_purpose}
        onPress={id => {
          setProjectId(id);
          setTimeout(() => {
            scrollToTop();
            refetch();
          }, 100);
        }}
      />
    );
  };

  const FeaturesAmenities = useCallback(
    ({ title, features = [], moreText }) => {
      // Split into two columns
      const midIndex = Math.ceil(features.length / 2);
      const col1 = features.slice(0, midIndex);
      const col2 = features.slice(midIndex);

      return (
        <View style={styles.featuresWrapper}>
          {/* Section Title */}
          <TextComponent text={title} size="1.8" family="600" />

          {/* Features in Two Columns */}
          <View style={styles.featuresRowUpper}>
            <View style={styles.featureCol}>
              {col1.map((item, idx) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                  }}
                >
                  <FastImage
                    source={{ uri: imageUrl(item?.icon) }}
                    resizeMode="contain"
                    style={{
                      width: wp('3'),
                      height: hp('3'),
                      marginRight: wp('1'),
                    }}
                  />
                  <TextComponent
                    key={idx}
                    text={`${item?.name}: ${item?.value}`}
                    size="1.3"
                    styles={{ marginRight: wp('4') }}
                    family={'300'}
                  />
                </View>
              ))}
            </View>
            <View style={styles.featureCol}>
              {col2.map((item, idx) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                  }}
                >
                  <FastImage
                    source={{ uri: imageUrl(item?.icon) }}
                    resizeMode="contain"
                    style={{
                      width: wp('3'),
                      height: hp('3'),
                      marginRight: wp('1'),
                    }}
                  />
                  <TextComponent
                    key={idx}
                    text={`${item?.name} ${item?.value}`}
                    size="1.3"
                    family={'300'}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* View More */}
          {moreText && (
            <TouchableOpacity>
              <TextComponent
                text={moreText}
                size="1.5"
                family="500"
                styles={styles.linkText}
              />
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [],
  );

  const topBarArry = [
    { id: 'Features&Amenitites', name: 'Features & Amenitites' },
    { id: 'details', name: 'Details' },
    { id: 'description', name: 'Description' },
    { id: 'listedby', name: 'Listed By' },
  ];

  return (
    // <ScrollView  contentContainerStyle={{flex:1,paddingBottom:hp('10'),backgroundColor:"white"}} showsVerticalScrollIndicator={false} >

    // </ScrollView>

    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        ref={scrollRef}
      >
        {/* Image Section */}
        <ImageSliderComp
          media={projectDetails?.images ?? []}
          item={projectDetails}
        />
        {/* Price */}
        <TextComponent
          text={projectDetails?.project_name}
          size="1.8"
          family="500"
          styles={styles.location}
          numberOfLines={readMoreTitleState ? 10 : 2}
          onPress={() => readMoreTitle()}
        />
        <View style={styles.priceWrapper}>
          {/* Location */}
          {projectDetails?.price && (
            <View style={styles.priceBadge}>
              <TextComponent text="PKR" isWhite family={'200'} />
              <TextComponent
                text={formatPriceToPKStandard(projectDetails?.price)}
                isWhite
                family="700"
              />
            </View>
          )}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: hp('1'),
            }}
          >
            <View>
              <TextComponent
                text={projectDetails?.type_and_purpose}
                // size="1.8"
                family={'bold'}
              />
              <TextComponent
                text={
                  projectDetails?.area_2 != null
                    ? projectDetails?.sub_area_name
                    : projectDetails?.area_name
                }
                // size="1.8"
                family={'bold'}
                styles={{
                  textDecorationLine: 'underline',
                }}
                isThemeColor
                onPress={() => dynamicNavigation()}
              />
            </View>
            <TextComponent
              text={formatDateToCustomFormat(projectDetails?.created_date)}
              size="1.8"
              family={'300'}
            />
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          {projectDetails?.total_bedrooms && (
            <View style={styles.statItem}>
              <Image
                source={bedIcon}
                resizeMode="contain"
                style={{ width: wp('5'), height: hp('3') }}
              />
              <TextComponent
                text={projectDetails?.total_bedrooms}
                size="1.5"
                family={'300'}
              />
            </View>
          )}
          {projectDetails?.total_bathrooms && (
            <View style={styles.statItem}>
              <Image
                source={bathRoomIcon}
                resizeMode="contain"
                style={{ width: wp('5'), height: hp('3') }}
              />
              <TextComponent
                text={projectDetails?.total_bathrooms}
                size="1.5"
                family={'300'}
              />
            </View>
          )}
          {projectDetails?.area_with_type && (
            <View style={styles.statItem}>
              <Image
                source={SqFitIcon}
                resizeMode="contain"
                style={{ width: wp('5'), height: hp('3') }}
              />
              <TextComponent
                text={projectDetails?.area_with_type}
                size="1.5"
                family={'300'}
              />
            </View>
          )}
        </View>
        <ScrollView
          contentContainerStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: wp('3'),
            marginVertical: hp('2'),
            overflow: 'scroll',
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <MultiSelectButton
            items={topBarArry}
            isPrimaryColorStyle
            selectedAlter={selectedTab}
            onSelectVal={(_, e) => setSelectedTab(e)}
            btnStyle={{
              marginRight: wp('1'),
            }}
          />
        </ScrollView>
        {/* Description */}
        {/* {projectDetails?.feature_amenitie && (
          <TextComponent
            text={projectDetails?.feature_amenitie}
            size="1.3"
            styles={styles.description}
          />
        )} */}
        {/* <TouchableOpacity>
          <TextComponent
            text="View Full Description"
            size="1.3"
            family="500"
            styles={styles.linkText}
          />
        </TouchableOpacity> */}
        {selectedTab?.id == 'Features&Amenitites' &&
          projectDetails?.feature_amenitie &&
          projectDetails?.feature_amenitie?.length > 0 && (
            <FeaturesAmenities
              features={projectDetails?.feature_amenitie}
              title={'Features & Amenities'}
            />
          )}
        {/* <View style={styles.featuresWrapper}>
          <TextComponent text="Features & Amenities" size="1.4" family="600" />
          <View style={styles.featuresRow}>
            {projectDetails?.feature_amenitie &&
              projectDetails?.feature_amenitie.map(res => {
                return (
                  <View style={styles.featureCol}>
                    <TextComponent text={res} size="1.2" fade />
                  </View>
                );
              })}
          </View>
        </View> */}

        {selectedTab?.id == 'details' && <DetailsTable details={detailsData} />}

        {selectedTab?.id == 'description' && (
          <>
            <View
              style={{
                ...styles.tableHeader,
                borderRadius: 10,
                width: wp('90'),
                alignSelf: 'center',
              }}
            >
              <Text style={styles.tableHeaderText}>Description</Text>
            </View>
            <RenderHtml
              baseStyle={{
                width: wp('90'),
                alignSelf: 'center',
                marginTop: hp('1'),
                textAlign: 'justify',
                fontSize: hp('1.8'),
                color: 'gray',
              }}
              contentWidth={hp('90')}
              source={source}
              enableExperimentalMarginCollapsing={true}
              // allowedStyles={true}
              enableCSSInlineProcessing={true}
            />
          </>
        )}
        {selectedTab?.id == 'listedby' && (
          <View style={styles.ownerView}>
            <TextComponent text={'Listing Provided By'} family={'600'} />
            {projectDetails?.real_estate_logo && (
              <Image
                source={{ uri: imageUrl(projectDetails?.real_estate_logo) }}
                resizeMode="contain"
                style={styles.ownerImg}
              />
            )}
            {projectDetails?.real_estate_name && (
              <TextComponent
                text={projectDetails?.real_estate_name}
                family={'400'}
              />
            )}
            {/* <TextComponent
              text={`Agent: ${projectDetails?.contact_person}`}
              family={'400'}
            /> */}
          </View>
        )}

        <View
          style={{
            ...styles.tableHeader,
            borderRadius: 10,
            width: wp('90'),
            alignSelf: 'center',
            marginTop: hp('2'),
          }}
        >
          <Text style={styles.tableHeaderText}>Project location on map</Text>
        </View>
        <WebView
          originWhitelist={['*']}
          source={{
            html: `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body, html {
              margin: 0;
              padding: 0;
              height: 100%;
              width: 100%;
            }
            iframe {
              width: 100%;
              height: 100%;
              border: none;
            }
          </style>
        </head>
        <body>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3616.9316067100995!2d67.0969888746062!3d24.96844147785895!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb347004e89972f%3A0xb84a81579f53332f!2sState%20oil%20coperative%20housing%20society!5e0!3m2!1sen!2s!4v1755071682424!5m2!1sen!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </body>
      </html>
    `,
          }}
          style={{
            width: wp('90'),
            height: hp('30'), // adjust as needed
            alignSelf: 'center',
            marginVertical: hp('2'),
            borderRadius: 10,
          }}
        />

        {similarProjects && similarProjects.length > 0 && (
          <>
            <View
              style={{
                ...styles.tableHeader,
                borderRadius: 10,
                width: wp('90'),
                alignSelf: 'center',
                marginBottom: hp('2'),
              }}
            >
              <Text style={styles.tableHeaderText}>Related Projects</Text>
            </View>

            <FlatList
              // data={[1, 2, 3, 4]}
              data={similarProjects}
              renderItem={renderItem}
              numColumns={2}
              showsHorizontalScrollIndicator={false}
              keyExtractor={keyExtractor}
              contentContainerStyle={{ paddingHorizontal: wp('4') }}
            />
          </>
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      {projectDetails?.phone_1 && (
        <View style={styles.bottomButtons}>
          <ThemeButton
            title="Call"
            isTheme
            style={styles.callBtn}
            image={phone}
            imageStyle={{ tintColor: 'white' }}
            onPress={() => makeCall(projectDetails?.phone_1)}
            //   iconLeft={<Ionicons name="call" size={wp('4')} color="white" />}
          />
          <ThemeButton
            title="SMS"
            isTransparent
            style={styles.smsBtn}
            textStyle={{ color: Colors.primaryColor }}
            onPress={() => sendSMS(projectDetails?.phone_1)}
          />
          <Touchable
            style={styles.whatsappBtn}
            onPress={() => sendWhatsApp(projectDetails?.phone_1)}
          >
            <Image
              source={whatappIcon}
              resizeMode="contain"
              style={{ width: wp('10'), height: hp('8'), marginTop: hp('1') }}
            />
          </Touchable>
        </View>
      )}
    </View>
  );
};

export default memo(ProjectDetailScreen);
