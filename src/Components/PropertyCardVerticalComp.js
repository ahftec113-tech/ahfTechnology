import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  callWhite,
  checkBoxIcon,
  editIcon,
  heart,
  heartFilledLike,
  locationGray,
  propertyIcon,
  shareIcon,
  SqFitIcon,
  trash,
  whatappIcon,
} from '../Assets';
import ThemeButton from './ThemeButton';
import { hp, wp } from '../Hooks/useResponsive';
import { Colors } from '../Theme/Variables';
import { TextComponent } from './TextComponent';
import { Touchable } from './Touchable';
import { getSearchProjectsUrl, imageUrl } from '../Utils/Urls';
import useReduxStore from '../Hooks/UseReduxStore';
import { favProject } from '../Redux/Action/FavProjectAction';
import {
  formatPrice,
  formatPriceToPKStandard,
  makeCall,
  sendSMS,
  sendWhatsApp,
} from '../Services/GlobalFunctions';
import NavigationService from '../Services/NavigationService';
import { deleteDraftProject } from '../Redux/Action/DraftAction';

const PropertyCardVerticalComp = ({
  image,
  logo,
  price,
  title,
  type,
  area,
  location,
  tag = [],
  onCallPress,
  onWhatsappPress,
  onSharePress,
  mainViewStyles,
  refetchKeys,
  refetch,
  item,
  isNewProjects,
  isDisable,
  area_name,
  isEdit,
  isDraft,
  isDrawer,
  isSaved,
}) => {
  const { dispatch, getState, queryClient } = useReduxStore();

  const { favProjects } = getState('favProjects');

  const onTagPress = () => {
    NavigationService.navigate('ProjectListScreen', {
      url: `${getSearchProjectsUrl}area_id=${item?.area_id ?? null}`,
      selectedArea: item?.area_name,
      isDrawer,
      extraFilter: [item?.area_name],
    });
  };
  return (
    <Touchable
      style={{ ...styles.container, ...mainViewStyles }}
      onPress={() => {
        if (isDraft)
          NavigationService.navigate('CreateListingScreen', {
            id: item?.id,
            isDraft: true,
          });
        else if (isSaved)
          NavigationService.navigate('CreateListingScreen', {
            id: item?.id,
            isSaved: true,
          });
        else NavigationService.navigate('ProjectDetailScreen', item?.id);
      }}
      disabled={isDisable}
    >
      <Image
        source={{ uri: isDraft || isSaved ? image?.uri : imageUrl(image) }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Image source={logo} resizeMode="contain" style={styles.logo} />
          {!isNewProjects && !isEdit && !isDraft && !isSaved && (
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
                  favProjects.find(id => id == item?.id)
                    ? heartFilledLike
                    : heart
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
          {isEdit && (
            <Touchable
              onPress={() =>
                NavigationService.navigate('CreateListingScreen', {
                  id: item?.id,
                  isEdit: true,
                })
              }
            >
              <Image
                source={editIcon}
                resizeMode="contain"
                style={{ width: wp('5'), height: hp('3') }}
              />
            </Touchable>
          )}
          {(isDraft || isSaved) && (
            <Touchable onPress={() => dispatch(deleteDraftProject(item?.id))}>
              <Image
                source={trash}
                resizeMode="contain"
                style={{ width: wp('5'), height: hp('3') }}
              />
            </Touchable>
          )}
        </View>
        {price && (
          <View style={styles.priceRow}>
            <TextComponent text="PKR " size={1.5} family={'300'} />
            <TextComponent
              text={formatPriceToPKStandard(price)}
              size={1.5}
              family="bold"
            />
          </View>
        )}
        <TextComponent
          text={title}
          size={1.3}
          family={'300'}
          numberOfLines={1}
        />
        {(type || area) && (
          <View style={styles.row}>
            {type && (
              <>
                <Image
                  source={propertyIcon}
                  resizeMode="contain"
                  style={styles.rowIcon}
                />
                <TextComponent text={type} size={1.3} family={'300'} />
              </>
            )}
            {area && (
              <>
                <Image
                  source={propertyIcon}
                  resizeMode="contain"
                  style={styles.rowIcon}
                />
                <TextComponent
                  text={area}
                  size={1.3}
                  family={'300'}
                  numberOfLines={1}
                />
              </>
            )}
          </View>
        )}
        <View style={styles.row}>
          <Image
            source={locationGray}
            resizeMode="contain"
            style={styles.rowIcon}
          />
          <TextComponent text={location} size={1.3} family={'300'} />
        </View>
        <View style={styles.tagRow}>
          <Touchable style={styles.tag} onPress={() => onTagPress()}>
            <Image source={checkBoxIcon} style={styles.icon} />
            <Text style={styles.tagText}>{area_name}</Text>
          </Touchable>
        </View>
        {!isNewProjects && (
          <View style={styles.actionRow}>
            <ThemeButton
              title={'Call'}
              image={callWhite}
              isTheme
              style={styles.callButton}
              textStyle={styles.callButtonText}
              imageStyle={styles.callButtonIcon}
              onPress={() => makeCall(item?.phone_1)}
            />
            <ThemeButton
              title={'SMS'}
              isTransparent
              style={{ ...styles.callButton, width: wp('10') }}
              textStyle={styles.callButtonText}
              onPress={() => sendSMS(item?.phone_1)}
            />
            <Touchable onPress={() => sendWhatsApp(item?.phone_1)}>
              <Image
                source={whatappIcon}
                resizeMode="contain"
                style={styles.socialIcon}
              />
            </Touchable>
            {/* <Touchable onPress={() => sendSMS(item?.phone_1)}>
            <Image
              source={shareIcon}
              resizeMode="contain"
              style={styles.socialIcon}
            />
          </Touchable> */}
          </View>
        )}
      </View>
    </Touchable>
  );
};
export default PropertyCardVerticalComp;

const styles = StyleSheet.create({
  container: {
    // width: wp('90'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: hp('1'),
    paddingHorizontal: wp('2'),
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: Colors.primaryColor,
  },
  image: {
    width: wp('35'),
    height: hp('28'),
    borderRadius: 20,
  },
  infoContainer: {
    width: wp('55'),
    height: hp('25'),
    justifyContent: 'space-between',
    paddingVertical: hp('1'),
    marginLeft: wp('2'),
  },
  logo: {
    width: wp('20'),
    height: hp('5'),
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('0.5'),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5'),
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  rowIcon: {
    width: wp('5'),
    height: hp('2'),
    // backgroundColor: 'red',
    left: wp('-1'),
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('0.5'),
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1'),
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('0.4'),
    borderRadius: 20,
    marginRight: wp('2'),
  },
  tagText: {
    color: Colors.primaryColor,
    fontSize: hp('1.4'),
  },
  icon: {
    width: wp('3.5'),
    height: hp('2'),
    resizeMode: 'contain',
  },
  iconText: {
    color: Colors.gray,
    fontSize: hp('1.4'),
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callButton: {
    width: wp('35'),
    height: hp('4'),
  },
  callButtonText: {
    fontSize: hp('1.5'),
  },
  callButtonIcon: {
    width: wp('5'),
    height: hp('2'),
  },
  socialIcon: {
    width: wp('8'),
    height: hp('4'),
  },
});
