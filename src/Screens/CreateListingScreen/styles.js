import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

const THUMB_RADIUS = 10;
export const styles = StyleSheet.create({
  imageBackground: isBanner => ({
    width: wp('44'),
    height: hp('15'),
    borderRadius: 5,
    marginVertical: hp('0.5'),
    overflow: 'hidden',
    borderWidth: isBanner ? 3 : 0,
    borderColor: Colors.primaryColor,
  }),
  imageText: {
    position: 'absolute',
    left: wp('0'),
    top: hp('0'),
    backgroundColor: Colors.primaryColor,
    paddingBottom: hp('0.5'),
    paddingHorizontal: wp('1'),
    borderBottomRightRadius: 8,
  },
  crossIcon: {
    width: wp('4'),
    height: hp('2'),
  },

  // video style

  touchable: {
    position: 'absolute',
    right: wp('2'),
    top: hp('1'),
    backgroundColor: Colors.primaryColor,
    borderRadius: 20,
    zIndex: 1,
  },
  crossIcon: {
    width: wp('4'),
    height: hp('2'),
  },
  video: {
    width: wp('45'),
    height: hp('15'),
    borderRadius: 8,
    overflow: 'hidden',
  },

  // main container
  container: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: wp('3'),
    paddingBottom: hp('18'),
  },
  topHomeCompContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingTop: hp('2'),
    flexWrap: 'wrap',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
  },
  locationIcon: {
    width: wp('5'),
    height: hp('2'),
    marginRight: wp('2'),
  },
  multiSelectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1'),
    marginLeft: wp('50'),
  },
  cityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2'),
  },
  cityTextContainer: {
    width: wp('82'),
  },
  arrowIcon: {
    width: wp('4'),
    height: hp('2'),
    marginLeft: wp('1'),
  },
  selectLocationContainer: {
    paddingVertical: hp('2'),
  },
  selectLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapContainer: {
    height: hp('25'),
    // backgroundColor: 'red',
    marginTop: hp('2'),
  },
  priceRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('1'),
  },
  priceRangeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceRangeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceIcon: {
    width: wp('4'),
    height: hp('4'),
    marginRight: wp('2'),
  },
  priceInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: hp('2'),
  },
  inputContainer: {
    width: wp('95'),
    height: hp('5'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.grayBorder,
    justifyContent: 'center',
    marginTop: hp('1'),
  },
  input: {
    color: 'black',
    fontSize: hp('1.5'),
  },
  slider: {
    marginVertical: 20,
  },
  valueText: {
    color: 'black',
  },
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: Colors.primaryColor,
  },
  rail: {
    flex: 1,
    height: 3,
    borderRadius: 3,
    backgroundColor: 'gray',
  },
  railSelected: {
    height: 3,
    backgroundColor: 'gray',
  },
  areaRangeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: hp('1'),
  },
  areaRangeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaRangeRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  areaInputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingVertical: hp('2'),
  },
  sizesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
  },
  bedroomsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('1'),
  },
  bedroomsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
    flexWrap: 'wrap',
  },
  bathroomsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: hp('1'),
  },
  bathroomsButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1'),
    flexWrap: 'wrap',
  },
  imgFlatList: {
    marginVertical: hp('2'),
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: wp('95'),
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    padding: 5,
  },
  youtubeLinkInput: {
    color: 'black',
    fontSize: hp('1.5'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    marginVertical: hp('2'),
    height: hp('5'),
  },
  uploadLogo: {
    width: wp('94'),
    height: hp('15'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.dkBorderColor,
    marginVertical: hp('2'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  showAdsButton: {
    marginTop: hp('2'),
    // position: 'absolute',
    // bottom: hp('10'),
    width: wp('45'),
    alignSelf: 'center',
  },
});
