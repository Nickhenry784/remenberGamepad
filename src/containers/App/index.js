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
import { setShowShopping, decrementTurn } from './actions';
import PlayPage from './PlayPage';

const key = 'App';

function App({ dispatch, turn, isShowShopping }) {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const [isPlay, setIsPlay] = useState(false);

  const onSetShowShopping = () => {
    dispatch(setShowShopping(!isShowShopping));
  };
  const handleClickBackButton = () => {
    setIsPlay(false);
  };

  const onClickPlayButton = () => {
    if (turn === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrementTurn());
    setIsPlay(true);
  };

  return isPlay ? (
    <PlayPage onClickBackButton={handleClickBackButton} />
  ) : (
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
              <Image source={images.home.turn} style={appStyle.shopImage} />
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
            <TouchableOpacity
              onPress={onClickPlayButton}
              onLongPress={onClickPlayButton}>
              <Image source={images.home.play} style={appStyle.playImage} />
            </TouchableOpacity>
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
