import { StyleSheet } from 'react-native';
import { hp, wp } from '../../Hooks/useResponsive';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  title: {
    fontSize: wp('5'),
    fontWeight: 'bold',
    marginBottom: hp('2'),
    color: '#333',
  },

  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('3'),
  },
  name: { fontSize: wp('4.5'), fontWeight: '600', color: '#222' },
  subText: { fontSize: wp('3.5'), color: '#777', marginVertical: hp('0.5') },
  badge: {
    backgroundColor: '#19B57D',
    paddingVertical: hp('0.4'),
    paddingHorizontal: wp('3'),
    borderRadius: wp('4'),
    alignSelf: 'flex-start',
  },
  badgeText: { color: '#fff', fontSize: wp('3.2'), fontWeight: '500' },
  avatar: {
    width: wp('14'),
    height: wp('14'),
    borderRadius: wp('7'),
    backgroundColor: '#eee',
  },

  section: { marginBottom: hp('3') },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('1'),
  },
  sectionTitle: { fontSize: wp('4'), fontWeight: '600', color: '#333' },
  link: { fontSize: wp('3.5'), color: '#2F80ED' },

  tag: {
    backgroundColor: '#FF6666',
    alignSelf: 'flex-start',
    paddingVertical: hp('0.5'),
    paddingHorizontal: wp('3'),
    borderRadius: wp('4'),
    marginBottom: hp('1.2'),
  },
  tagText: { color: '#fff', fontSize: wp('3.2') },

  progressContainer: { marginBottom: hp('1') },
  progressBackground: {
    backgroundColor: '#e5e5e5',
    height: hp('5'),
    borderRadius: wp('8'),
    overflow: 'hidden',
    justifyContent: 'center',
  },
  progressFill: {
    backgroundColor: '#19B57D',
    height: '100%',
    borderRadius: wp('8'),
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    fontWeight: '600',
    color: '#fff',
    fontSize: wp('3.5'),
  },

  legend: { flexDirection: 'row', alignItems: 'center', marginTop: hp('1') },
  dotGreen: {
    width: wp('2.5'),
    height: wp('2.5'),
    borderRadius: wp('1.25'),
    backgroundColor: 'green',
    marginRight: wp('1.5'),
  },
  dotGray: {
    width: wp('2.5'),
    height: wp('2.5'),
    borderRadius: wp('1.25'),
    backgroundColor: '#ccc',
    marginLeft: wp('4'),
    marginRight: wp('1.5'),
  },
  legendText: { fontSize: wp('3.2'), color: '#555' },
});
