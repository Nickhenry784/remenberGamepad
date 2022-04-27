import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  ImageBackground,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { images } from 'assets/images';
import { randomIntFromInterval } from 'utils/number';
import { makeSelectIsShowShopping, makeSelectTurn } from './selectors';
import { appStyle, brokenButton } from './style';
import saga from './saga';
import reducer from './reducer';
import Layout from './Layout';
import Buttons from './Buttons';
import { brokenData } from './data/broken';
import { setShowShopping, decrementTurn } from './actions';
import PlayPage from './PlayPage';

const key = 'App';

function App({ dispatch, turn, isShowShopping }) {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const [isPlay, setPlay] = useState(false);
  const [time, setTime] = useState(100);
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState('');
  const [position, setPosition] = useState({
    top: 0,
    right: 0,
  });

  useEffect(() => {
    const timeLife = setTimeout(() => {
      if (time > 0 && isPlay) {
        setTime(time - 5);
        const positionNew = {
          top: position.top + 10,
          right: position.right + 10,
        };
        setPosition(positionNew);
      }
      if (time === 0 && isPlay) {
        setPlay(false);
        const positionNew = {
          top: 0,
          right: 0,
        };
        setPosition(positionNew);
        setTime(100);
      }
    }, 10);
    return () => {
      clearTimeout(timeLife);
    };
  }, [time, isPlay]);

  const onSetShowShopping = () => {
    dispatch(setShowShopping(!isShowShopping));
  };

  const onClickPlayButton = () => {
    if (turn === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    setPlay(true);
  };

  const onClickCreateWishButton = index => {
    if (turn === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrementTurn());
    setShowPopup(true);
  };

  const onClickSendButton = () => {
    Alert.alert('You send wish success');
    setShowPopup(false);
    setInputText('');
  };

  return (
    <Layout turn={turn}>
      <View style={appStyle.appBar}>
        {isShowShopping ? (
          <TouchableOpacity
            onPress={onSetShowShopping}
            onLongPress={onSetShowShopping}>
            <Text style={appStyle.turn}>Back</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={onSetShowShopping}
            onLongPress={onSetShowShopping}>
            <View style={appStyle.turnView}>
              <Image source={images.home.planet} style={appStyle.shopImage} />
              <Text style={appStyle.turn}>{turn}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      {isShowShopping ? (
        <Buttons />
      ) : (
        <>
          <View style={appStyle.viewCenter}>
            {isPlay && (
              <Animated.Image
                source={images.home.saobang}
                style={[
                  {
                    position: 'absolute',
                    width: 100,
                    height: 50,
                    top: `${position.top} %`,
                    right: `${position.right} %`,
                  },
                ]}
              />
            )}
            {showPopup && (
              <View style={appStyle.popupView}>
                <ImageBackground
                  source={images.home.popup}
                  style={appStyle.popupImage}>
                  <TextInput
                    style={appStyle.input}
                    onChangeText={setInputText}
                    value={inputText}
                    multiline
                    placeholder="Please your wish"
                  />
                </ImageBackground>
                <TouchableOpacity
                  onPress={onClickSendButton}
                  onLongPress={onClickSendButton}>
                  <Image source={images.home.send} style={appStyle.playImage} />
                </TouchableOpacity>
              </View>
            )}
            <View style={appStyle.playView}>
              <TouchableOpacity
                onPress={onClickPlayButton}
                onLongPress={onClickPlayButton}>
                <Image
                  source={images.home.watchingmeteors}
                  style={appStyle.playImage}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onClickCreateWishButton}
                onLongPress={onClickCreateWishButton}>
                <Image
                  source={images.home.createwish}
                  style={appStyle.playImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Layout>
  );
}

App.propTypes = {
  dispatch: PropTypes.func,
  turn: PropTypes.number,
  isShowShopping: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  turn: makeSelectTurn(),
  isShowShopping: makeSelectIsShowShopping(),
});

export default connect(mapStateToProps)(App);
