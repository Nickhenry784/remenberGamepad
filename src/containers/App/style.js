import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const brokenButton = (x, y) =>
  StyleSheet.create({
    width: 80,
    height: 80,
    backgroundColor: '#606060',
  });

export const brokenPlayImage = (x, y) =>
  StyleSheet.create({
    position: 'absolute',
    top: x,
    left: y,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  });

export const appStyle = StyleSheet.create({
  turnView: {
    width: windowWidth * 0.2,
    height: windowHeight * 0.1,
    paddingLeft: windowWidth * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  turnImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 10,
    position: 'absolute',
    left: '5%',
  },
  turn: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: 'bold',
    color: 'white',
  },
  shopImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  viewCenter: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brokenImage: {
    width: windowWidth * 0.15,
    height: windowWidth * 0.15,
    resizeMode: 'stretch',
  },
  randomText: {
    fontSize: 18,
    paddingTop: 25,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  playImage: {
    width: windowWidth * 0.4,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
  },
  scoreText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  playView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 3,
    elevation: 3,
  },
});

export const musicsStyle = StyleSheet.create({
  musicWrapper: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: '50%',
  },
  musicButton: {
    padding: 10,
    backgroundColor: 'gray',
  },
  musicButtonTitle: {
    color: 'green',
  },
});

export const layoutStyle = StyleSheet.create({
  background: {
    resizeMode: 'stretch',
    width: windowWidth,
    height: windowHeight,
  },
  land: {
    resizeMode: 'cover',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%',
  },
  children: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 3,
    elevation: 3,
  },
});

export const paymentStyle = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export const buttonStyle = StyleSheet.create({
  buttons: {
    padding: 10,
    paddingTop: 30,
    top: '10%',
    zIndex: 3,
    elevation: 3,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  button: {
    color: 'black',
    textAlign: 'center',
    padding: 5,
  },
  buttonText: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: windowWidth * 0.7,
    height: windowHeight * 0.1,
    marginBottom: 5,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSmall: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },
});
