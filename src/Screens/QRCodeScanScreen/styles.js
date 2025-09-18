import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraView: {
    position: 'absolute',
    top: '30%',
    left: '10%',
    right: '10%',
    height: 200,
    borderWidth: 2,
    borderColor: '#00FF00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  barView: {
    width: '80%',
    height: 2,
    backgroundColor: '#FF0000',
  },
  innerView: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  subHeading: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 16,
  },
  btn: {
    marginTop: 10,
    width: '80%',
  },
});
