import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  // tabel style

  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginVertical: hp('2'),
    marginHorizontal: wp('4'),
  },
  tableHeader: {
    backgroundColor: Colors.primaryColor,
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
  },
  tableHeaderText: {
    color: '#fff',
    fontSize: hp('1.58'),
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp('1.5'),
    paddingHorizontal: wp('3'),
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableLabel: {
    fontSize: hp('1.5'),
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  tableValue: {
    fontSize: hp('1.5'),
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  tableLink: {
    color: Colors.primaryColor,
    fontWeight: 'bold',
  },

  //  furtes
  featuresWrapper: {
    marginVertical: hp('2'),
  },
  featuresRow: {
    flexDirection: 'row',
    marginTop: hp('1'),
  },
  featureCol: {
    flex: 1,
  },
  linkText: {
    color: Colors.primaryColor,
    marginTop: hp('1'),
  },

  //  main View
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4'),
    paddingVertical: hp('1'),
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerIcon: {
    paddingHorizontal: wp('2'),
  },
  scrollContent: {
    paddingBottom: hp('12'),
  },
  imageWrapper: {
    width: '100%',
    height: hp('30'),
    position: 'relative',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  overlayCounter: {
    position: 'absolute',
    bottom: hp('1'),
    left: wp('2'),
    backgroundColor: '#00000088',
    borderRadius: 4,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('0.5'),
  },
  overlayCamera: {
    position: 'absolute',
    bottom: hp('1'),
    right: wp('2'),
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1'),
    backgroundColor: '#00000088',
    borderRadius: 4,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('0.5'),
  },
  priceWrapper: {
    paddingHorizontal: wp('4'),
    paddingTop: hp('2'),
  },
  priceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    paddingHorizontal: wp('2'),
    paddingVertical: hp('0.5'),
    borderRadius: 4,
    marginBottom: hp('1'),
    gap: wp('1'),
    width: 'auto',
  },
  location: {
    paddingHorizontal: wp('4'),
    marginTop: hp('1'),
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: wp('5'),
    paddingHorizontal: wp('4'),
    marginTop: hp('1'),
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('1'),
  },
  description: {
    paddingHorizontal: wp('4'),
    marginTop: hp('2'),
  },
  linkText: {
    color: Colors.primaryColor,
    paddingHorizontal: wp('4'),
    marginTop: hp('1'),
  },
  featuresWrapper: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    borderRadius: 8,
    marginHorizontal: wp('4'),
    marginTop: hp('3'),
    padding: wp('3'),
  },
  featuresRowUpper: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: hp('2'),
    flexWrap: 'wrap',
  },
  featureCol: {
    // flex: 1,
    gap: hp('1'),
    // flexDirection: 'row',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  bottomButtons: {
    position: 'absolute',
    // bottom: hp('2'),
    left: wp('4'),
    right: wp('4'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: hp('8'),
    paddingVertical: hp('2'),
    bottom: 0,
  },
  callBtn: {
    flex: 1,
    marginRight: wp('2'),
  },
  smsBtn: {
    flex: 1,
    marginHorizontal: wp('2'),
  },
  whatsappBtn: {
    width: wp('12'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  ownerView: {
    width: wp('90'),
    paddingVertical: hp('2'),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: hp('2'),
  },
  ownerImg: {
    width: wp('30'),
    height: hp('10'),
    // backgroundColor: 'red',
    marginVertical: hp('1'),
  },
});
