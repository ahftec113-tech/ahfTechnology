import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, { memo, useCallback } from 'react';
import { HeaderComponent } from '../../Components/HeaderComp';
import { MultiSelectButton } from '../../Components/MultiSelectButton';
import {
  arrDown,
  boxesEmpty,
  boxesfilled,
  drawerEmpty,
  drawerFilled,
  filterIcon,
  homeIcon,
  searchIcon,
  sortIcon,
} from '../../Assets';
import { hp, wp } from '../../Hooks/useResponsive';
import { styles } from './styles';
import PropertyCardVerticalComp from '../../Components/PropertyCardVerticalComp';
import { DataNotFound } from '../../Components/DataNotFound';
import { keyExtractor } from '../../Utils';
import useProjectListScreen from './useProjectListScreen';
import PropertyCardComp from '../../Components/PropertyCardComp';
import ThemeButton from '../../Components/ThemeButton';
import { TextComponent } from '../../Components/TextComponent';

const ProjectListScreen = ({ navigation, route }) => {
  const {
    projectList,
    listType,
    setListType,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isLoading,
    refetch,
  } = useProjectListScreen(navigation, route);
  console.log('dsbklsdbvklsdbvbsdklvbsdlbvlds', route?.params);

  const filterArry = [
    // {
    //   image: filterIcon,
    //   name: 'Filter',
    // },
    // {
    //   image: sortIcon,
    //   name: 'Sort',
    // },
    {
      name: route?.params?.city?.name ?? 'Karachi',
      id: route?.params?.city?.name ?? 'Karachi',
    },
  ];

  const renderItem = useCallback(
    ({ item, index }) => {
      // const isEven = index % 2 === 0;
      // const isLastItem = index === yourData.length - 1;
      // const isSingleItem = yourData.length === 1;

      return listType == 1 ? (
        <PropertyCardVerticalComp
          image={item?.image}
          logo={homeIcon}
          price={item?.price}
          title={item?.project_name}
          type={`${item?.type_and_purpose}`}
          area={item?.area_with_type}
          location={`${item?.city_name} - ${item?.country_name}`}
          //   tag={['Residential Plot']}
          onCallPress={() => console.log('Call pressed')}
          onWhatsappPress={() => console.log('WhatsApp pressed')}
          onSharePress={() => console.log('Share pressed')}
          mainViewStyles={{ marginTop: hp('1') }}
          // refetch={refetch}
          item={item}
          area_name={item?.area_name}
        />
      ) : (
        <PropertyCardComp
          item={item}
          key={index}
          image={item?.image}
          logo={homeIcon}
          price={item?.price}
          title={item?.project_name}
          beds={item?.total_bedrooms}
          baths={item?.total_bathrooms}
          area={item?.area_with_type}
          tag1={item?.area_name}
          tag2={item?.type_and_purpose}
        />
      );
    },
    [projectList],
  );

  console.log('slkdbvlkdsblkvbsdklvbdskbkv', route?.params?.extraFilter);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent
        headerTitle={'Projects'}
        isBack={!route?.params?.isDrawer}
        isLeftIcon={route?.params?.isDrawer}
      />
      <View
        style={{
          height: hp('5'), // 🔑 Fix the total height
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: wp('4'),
            paddingRight: wp('4'),
            alignItems: 'center',
          }}
        >
          <MultiSelectButton
            items={[
              ...filterArry,
              ...(route?.params?.extraFilter || [])
                .filter(res => res != null)
                .map(res => ({
                  id: res,
                  name: res,
                })),
            ]}
            isPrimaryColorStyle
            btnStyle={{
              backgroundColor: 'white',
              marginRight: wp('2'),
            }}
            onSelectVal={() => {
              if (route?.params?.isFilter) {
                navigation.goBack();
              } else {
                navigation.navigate('FilterScreen', {
                  selectedType: {},
                  selectedCountry: {},
                  selectedCity: {},
                  selectedArea: {},
                });
              }
            }}
          />
        </ScrollView>
      </View>
      {projectList?.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: wp('2'),
          }}
        >
          <View style={styles.searchBox}>
            <Image
              source={searchIcon} // Search icon
              style={styles.icon}
            />
            <TextComponent
              styles={styles.input}
              text={route.params?.area?.name}
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Clear All */}
          {/* <TouchableOpacity>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity> */}

          {/* View Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity onPress={() => setListType(1)}>
              <Image
                source={listType == 1 ? drawerFilled : drawerEmpty} // List icon
                style={{
                  ...styles.toggleIcon,
                  height: hp('7'),
                  width: wp('9'),
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setListType(2)}>
              <Image
                source={listType == 2 ? boxesfilled : boxesEmpty} // Grid icon
                style={styles.toggleIcon}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      {!isLoading && (
        <>
          {listType == 1 && (
            <FlatList
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContainer}
              data={projectList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<DataNotFound />}
              ListFooterComponent={
                projectList.length >= 9 &&
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
          {listType == 2 && (
            <FlatList
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              contentContainerStyle={{
                ...styles.flatListContainer,
                paddingHorizontal: wp('5'),
              }}
              data={projectList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              ListEmptyComponent={<DataNotFound />}
              numColumns={2}
              ListFooterComponent={
                projectList.length >= 9 &&
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
        </>
      )}
    </View>
  );
};

export default memo(ProjectListScreen);
