import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    width: wp('95'),
    alignSelf: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  note: {
    color: 'red',
    fontSize: 12,
    marginVertical: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#0f172a',
  },
  infoText: {
    fontSize: 13,
    marginBottom: 3,
    color: '#334155',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#1e3a8a',
    paddingVertical: 6,
  },
  tableHeaderText: {
    flex: 1,
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#1e293b',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  totalsText: {
    fontSize: 13,
    color: '#1e293b',
  },
  totalsValue: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#1e293b',
  },
  // Titles
  selectedOrderText: {
    textAlign: 'center',
  },
  totalResultText: {
    textAlign: 'center',
    marginTop: hp('1'),
  },

  // Card Container
  cardContainer: {
    width: wp('95'),
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
  },

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

  // Log Button
  logButton: {
    marginHorizontal: wp('2'),
    alignSelf: 'center',
  },
  logIcon: {
    width: wp('4'),
    height: hp('3'),
  },
});
