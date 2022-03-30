import { StyleSheet } from 'react-native';

export const brokenButton = (x, y) =>
  StyleSheet.create({
    position: 'absolute',
    top: x,
    left: y,
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
  appBar: {
    flex: 0.1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  turnView: {
    width: 80,
    height: 50,
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
    color: 'white',
    paddingTop: 10,
    position: 'absolute',
    left: '5%',
  },
  turn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  shopImage: {
    width: 60,
    height: 60,
    marginTop: 15,
    resizeMode: 'contain',
  },
  viewCenter: {
    flex: 0.9,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  chooseOptionText: {
    width: '70%',
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  phoneImage: {
    width: 300,
    height: 450,
    resizeMode: 'contain',
  },
  playButton: {
    position: 'absolute',
    bottom: '10%',
    left: '40%',
  },
  brokenImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  randomText: {
    fontSize: 18,
    paddingTop: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  playImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  playView: {
    width: '100%',
    height: '100%',
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
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
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
    color: 'white',
    textAlign: 'center',
    padding: 5,
  },
  buttonText: {
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderRadius: 2,
    marginBottom: 5,
    paddingVertical: 10,
    paddingHorizontal: 100,
    borderWidth: 1,
    borderColor: '#fff',
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textSmall: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
  },
});
