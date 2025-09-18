import React, { memo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Switch,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import PropertyCardVerticalComp from '../../Components/PropertyCardVerticalComp';
import {
  arrDown,
  drawerIcon,
  filterIcon,
  homeIcon,
  PakFlag,
} from '../../Assets';
import { TextComponent } from '../../Components/TextComponent';
import { hp, wp } from '../../Hooks/useResponsive';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import { Colors } from '../../Theme/Variables';
import { HeaderComponent } from '../../Components/HeaderComp';
import { styles } from './styles';
import useProjectsScreen from './useProjectsScreen';
import ThemeButton from '../../Components/ThemeButton';
import { keyExtractor } from '../../Utils';
import { DataNotFound } from '../../Components/DataNotFound';

const MyProjectsScreen = ({ navigation, route }) => {
  const {
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isLoading,
    propertyListing,
    refetch,
  } = useProjectsScreen(navigation, route);

  const renderItem = useCallback(
    ({ item, index }) => {
      // const isEven = index % 2 === 0;
      // const isLastItem = index === yourData.length - 1;
      // const isSingleItem = yourData.length === 1;

      return (
        <PropertyCardVerticalComp
          image={item?.image}
          logo={homeIcon}
          price={item?.price}
          title={item?.project_name}
          type={item?.type_and_purpose}
          area={item?.area_with_type}
          location={`${item?.city_name} - ${item?.country_name}`}
          area_name={item?.area_name}
          onCallPress={() => console.log('Call pressed')}
          onWhatsappPress={() => console.log('WhatsApp pressed')}
          onSharePress={() => console.log('Share pressed')}
          mainViewStyles={{ marginTop: hp('1') }}
          // refetch={refetch}
          item={item}
          isNewProjects={true}
          isDrawer={true}
        />
      );
    },
    [propertyListing],
  );

  return (
    <View style={styles.container}>
      <HeaderComponent headerTitle={'New Projects'} />

      {/* <View style={styles.switchRow}>
        <Image source={homeIcon} resizeMode="contain" style={styles.homeIcon} />
        <Switch
          trackColor={{ false: '#ccc', true: Colors.primaryColor }}
          thumbColor={true ? '#fff' : '#f4f3f4'}
        />
      </View> */}

      <TextComponent
        text={'Explore new ventures in Pakistan'}
        family={'bold'}
        styles={styles.venturesText}
      />

      {/* <ScrollView
        contentContainerStyle={styles.scrollContent}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <MultiSelectButton
          items={[
            { id: 1, name: 'Filter', image: filterIcon },
            { id: 2, label: 'City', image: arrDown },
            { id: 3, label: 'Price Range', image: arrDown },
            { id: 4, label: 'Area Range', image: arrDown },
          ]}
          isGrayBg={true}
          // isPrimaryColorStyle={true}
          onSelectVal={() =>
            navigation.navigate('FilterScreen', {
              selectedType: {},
              selectedCountry: {},
              selectedCity: {},
              selectedArea: {},
            })
          }
        />
      </ScrollView> */}
      {!isLoading && (
        <FlatList
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContainer}
          data={propertyListing}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={<DataNotFound />}
          refreshing={false}
          onRefresh={refetch}
          ListFooterComponent={
            propertyListing.length >= 9 &&
            (isFetchingNextPage ? null : (
              <ThemeButton
                title={'Load More'}
                style={{
                  marginTop: hp('2'),
                  width: wp('30'),
                  height: hp('4'),
                  alignSelf: 'center',
                  marginBottom: hp('5'),
                }}
                textStyle={{ fontSize: hp('1.5') }}
                onPress={async () => {
                  await fetchNextPage();
                  // afterFetchNextPage();
                }}
              />
            )) // Show loading spinner at the bottom
          }
        />
      )}
    </View>
  );
};

export default memo(MyProjectsScreen);
