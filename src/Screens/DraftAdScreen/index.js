import { View, Text, FlatList } from 'react-native';
import React, { memo, useCallback } from 'react';
import { homeIcon, PakFlag } from '../../Assets';
import { keyExtractor } from '../../Utils';
import { DataNotFound } from '../../Components/DataNotFound';
import PropertyCardVerticalComp from '../../Components/PropertyCardVerticalComp';
import { styles } from './styles';
import { HeaderComponent } from '../../Components/HeaderComp';
import { useDrawer } from '../../Context/DrawerContext';
import { hp, wp } from '../../Hooks/useResponsive';
import useDraftAdsScreen from './useDraftAdScreen';
import ThemeButton from '../../Components/ThemeButton';

const DraftAdScreen = ({ navigation, route }) => {
  const { projectsList, bulkUpload } = useDraftAdsScreen(navigation, route);
  const { openDrawer } = useDrawer();

  const renderItem = useCallback(({ item, index }) => {
    return (
      <PropertyCardVerticalComp
        image={item?.images ? item?.images[0] : item?.image}
        logo={homeIcon}
        price={item?.price}
        title={item?.project_name ?? item?.title}
        type={item?.type_and_purpose ?? item?.type?.label}
        area={
          item?.area_with_type ??
          `${item?.areaUnitInput} ${item?.AreaUnits?.id}`
        }
        location={`${item?.city_name ?? item?.city?.name} - ${
          item?.country_name ?? item?.country?.name
        }`}
        //   tag={['Residential Plot']}
        onCallPress={() => console.log('Call pressed')}
        onWhatsappPress={() => console.log('WhatsApp pressed')}
        onSharePress={() => console.log('Share pressed')}
        mainViewStyles={{ marginTop: hp('1') }}
        item={item}
        area_name={item?.area_name ?? item?.area?.name}
        isDraft={true}
      />
    );
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent headerTitle={'Draft Ads'} isBack />
      <FlatList
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        contentContainerStyle={styles.flatListContainer}
        data={projectsList}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        ListEmptyComponent={
          <DataNotFound
            title={'No draft projects available yet!'}
            subTitle={''}
          />
        }
      />
      <ThemeButton
        title={'Bulk Upload'}
        style={{
          position: 'absolute',
          bottom: hp('5'),
          width: wp('90'),
          alignSelf: 'center',
        }}
        onPress={async () => {
          const res = await bulkUpload();
          console.log('ilsdlvnklsdnvklsdnklvnsdnvklvdsv', res);
        }}
      />
    </View>
  );
};

export default memo(DraftAdScreen);
