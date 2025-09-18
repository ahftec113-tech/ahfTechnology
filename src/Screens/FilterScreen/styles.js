import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

const THUMB_RADIUS = 10;
export const styles = StyleSheet.create({
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
    width: wp('40'),
    height: hp('5'),
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.grayBorder,
    justifyContent: 'center',
    marginTop: hp('1'),
  },
  input: {
    color: 'black',
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
    paddingVertical: hp('2'),
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
  showAdsButton: {
    marginTop: hp('5'),
    position: 'absolute',
    bottom: hp('10'),
    width: wp('90'),
    alignSelf: 'center',
  },
});
