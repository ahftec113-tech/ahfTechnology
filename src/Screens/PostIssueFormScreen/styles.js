import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';
import { Colors } from '../../Theme/Variables';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: wp(3),
  },
  // Rows
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('0.5'),
  },
  threeColRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  // Buttons
  halfButton: {
    width: wp('45'),
  },
  smallButton: {
    width: wp('27'),
    marginTop: hp('1'),
  },
  doneButton: {
    width: wp('27'),
    height: hp('4'),
  },

  // Icons
  themeIcon: {
    tintColor: Colors.primaryColor,
  },
  whiteIcon: {
    tintColor: 'white',
  },

  // Text
  centerText: {
    textAlign: 'center',
  },

  // Accordion
  header: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: Colors.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('0.5'),
  },
  headerText: {
    fontSize: hp('1.8'),
    fontWeight: 'bold',
    color: 'white',
  },
  headerIcon: {
    width: wp('5'),
    height: hp('3'),
  },

  // Card Container
  cardContainer: isSelected => ({
    width: wp('92'),
    borderRadius: 10,
    paddingHorizontal: wp('3'),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    backgroundColor: 'white',
    elevation: 9,
    alignSelf: 'center',
    paddingBottom: hp('2'),
    marginVertical: hp('1'),
    borderColor: Colors.primaryColor,
    borderWidth: isSelected ? 1.5 : 0,
  }),

  // Totals Rows (key-value rows inside card)
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  totalsText: {
    fontSize: hp('1.5'),
    color: '#1e293b',
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
    color: '#1e293b',
  },

  // Special for clickable Code
  codeValue: {
    fontWeight: 'bold',
    fontSize: hp('1.5'),
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
