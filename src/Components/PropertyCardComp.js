import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import {
  bathRoomIcon,
  bedIcon,
  checkBoxIcon,
  heart,
  heartFilledLike,
  SqFitIcon,
} from '../Assets';
import { TextComponent } from './TextComponent';
import { getSearchProjectsUrl, imageUrl } from '../Utils/Urls';
import useReduxStore from '../Hooks/UseReduxStore';
import { favProject } from '../Redux/Action/FavProjectAction';
import { Touchable } from './Touchable';
import NavigationService from '../Services/NavigationService';
import { formatPriceToPKStandard } from '../Services/GlobalFunctions';

const PropertyCardComp = ({
  image,
  logo,
  price,
  title,
  beds,
  baths,
  area,
  tag1,
  tag2,
  item,
  refetchKeys,
  refetch,
  onPress,
}) => {
  const { dispatch, getState, queryClient } = useReduxStore();

  const dynamicNavigation = () => {
    NavigationService.navigate('ProjectListScreen', {
      url: `${getSearchProjectsUrl}area_id=${item?.area_id ?? null}`,
      selectedArea: item?.area_name,
      extraFilter: [item?.area_name],
    });
  };

  const { favProjects } = getState('favProjects');
  return (
    <Touchable
      style={styles.cardContainer}
      onPress={() => {
        if (onPress) onPress(item?.id);
        NavigationService.navigate('ProjectDetailScreen', item?.id);
      }}
    >
      <ImageBackground
        source={{ uri: imageUrl(image) }}
        style={styles.propertyImage}
        imageStyle={styles.imageStyle}
      >
        <Image source={logo} style={styles.marketedBy} resizeMode="contain" />
      </ImageBackground>

      <View style={styles.detailContainer}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextComponent text="PKR " size={1.7} family={'400'} />
          <TextComponent
            text={formatPriceToPKStandard(price)}
            size={1.7}
            family="bold"
          />
        </View>

        <TextComponent
          text={title}
          size={1.5}
          numberOfLines={1}
          styles={{ marginTop: hp('0.5') }}
          family={'300'}
        />

        <View style={[styles.infoRow, { marginVertical: hp('1') }]}>
          {beds && (
            <View style={styles.iconTextRow}>
              <Image source={bedIcon} style={styles.icon} />
              <Text style={styles.iconText}>{beds}</Text>
            </View>
          )}
          {baths && (
            <View style={styles.iconTextRow}>
              <Image source={bathRoomIcon} style={styles.icon} />
              <Text style={styles.iconText}>{baths}</Text>
            </View>
          )}
          <View style={styles.iconTextRow}>
            <Image source={SqFitIcon} style={styles.icon} />
            <Text style={styles.iconText} numberOfLines={1}>
              {area} (SQ. FT.)
            </Text>
          </View>
        </View>

        <View style={styles.tagsRow}>
          <Touchable style={styles.tag} onPress={() => dynamicNavigation()}>
            <Image
              source={checkBoxIcon}
              style={{ ...styles.icon, height: hp('2'), marginLeft: 0 }}
            />
            <Text style={styles.tagText}>{tag1}</Text>
          </Touchable>
          <View style={{ ...styles.tag, marginTop: hp('0.5') }}>
            <Image
              source={checkBoxIcon}
              style={{ ...styles.icon, height: hp('2'), marginLeft: 0 }}
            />
            <Text style={styles.tagText}>{tag2}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              dispatch(favProject(item?.id));
              setTimeout(() => {
                if (refetch) refetch();
                if (refetchKeys) queryClient.invalidateQueries(['countries']);
              }, 1000);
            }}
          >
            <Image
              source={
                favProjects.find(id => id == item?.id) ? heartFilledLike : heart
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </Touchable>
  );
};

export default PropertyCardComp;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: hp('2'),
    backgroundColor: Colors.white,
    width: wp('43'),
    // height: hp('32'),
    marginHorizontal: wp('1'),
    // marginLeft: hp('0.5'),
  },
  propertyImage: {
    width: '100%',
    height: hp('15'),
  },
  imageStyle: {
    width: '100%',
    height: hp('15'),
    borderRadius: 20,
  },
  marketedBy: {
    position: 'absolute',
    top: hp('1'),
    right: wp('2'),
    width: wp('18'),
    height: hp('4'),
  },
  detailContainer: {
    padding: wp('3'),
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('38'),
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('0.5'),
  },
  icon: {
    width: wp('3.5'),
    height: hp('2'),
    resizeMode: 'contain',
    marginLeft: wp('1'),
  },
  iconText: {
    // color: Colors.gray,
    fontSize: hp('1.5'),
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1'),
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    paddingHorizontal: wp('1'),
    paddingVertical: hp('0.1'),
    borderRadius: 20,
  },
  tagText: {
    color: Colors.primaryColor,
    fontSize: hp('1.2'),
    fontWeight: '400',
  },
});
