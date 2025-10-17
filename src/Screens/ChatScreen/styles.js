import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatList: {
    padding: wp(4),
    paddingBottom: hp(2),
  },
  messageContainer: {
    marginBottom: hp(1.5),
    maxWidth: wp(75),
    borderRadius: wp(2.5),
    padding: wp(3),
    minWidth: wp('50'),
  },
  senderContainer: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  receiverContainer: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: hp(1.8),
    color: '#333',
  },
  senderText: {
    color: '#000',
  },
  receiverText: {
    color: '#333',
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp(2),
    marginTop: hp(0.5),
  },
  chatImage: {
    width: wp(30),
    height: hp(15),
    borderRadius: wp(2),
    marginTop: hp(0.5),
  },
  pdfContainer: {
    marginTop: hp(0.5),
  },
  pdfName: {
    fontSize: hp(1.8),
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginVertical: hp(0.5),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  attachButton: {
    marginRight: wp(2),
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
    fontSize: hp(1.8),
    color: '#000',
  },
  sendButton: {
    marginLeft: wp(2),
    // backgroundColor: '#007AFF',
    padding: wp(2),
    borderRadius: wp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  // upper card style
  card: {
    backgroundColor: '#fff',
    borderRadius: 5,
    // padding: 8,
    margin: 5,
    width: wp('95'), // Adjust width to fit alongside chat
    // maxHeight: 150, // Keep height small
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    alignSelf: 'center',
    paddingVertical: hp('1'),
    paddingHorizontal: wp('1'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 4,
  },
  name: { fontSize: hp('2'), fontWeight: 'bold', color: 'black' },
  status: { fontSize: hp('1.8'), color: '#555' },
  button: { backgroundColor: '#47b9dfff', padding: 2, borderRadius: 3 },
  buttonRed: { backgroundColor: '#FF6347', padding: 2, borderRadius: 3 },
  buttonText: {
    fontSize: hp('1.8'),
    color: '#fff',
    paddingHorizontal: wp('1'),
  },
  date: { fontSize: 12, color: '#666' },
  orderId: { fontSize: 12, fontWeight: 'bold', marginBottom: 2 },
  orderDetails: { fontSize: hp('1.5'), color: '#333', marginBottom: 1 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    width: wp('50'),
    alignSelf: 'flex-end',
  },
  barcodeButton: {
    backgroundColor: '#5cb85c',
    padding: 2,
    borderRadius: 3,
    marginLeft: wp('2'),
  },
});
