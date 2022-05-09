import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { images } from 'assets/images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { makeSelectIsShowShopping, makeSelectTurn } from './selectors';
import { appStyle } from './style';
import saga from './saga';
import reducer from './reducer';
import Layout from './Layout';
import Payment from './Payment';
import { setShowShopping, decrementTurn, setTurn } from './actions';
import PlayPage from './PlayPage';

const key = 'App';
const STORAGE_TURN = '@turn';

function App({ dispatch, turn, isShowShopping }) {
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });

  const [isPlay, setIsPlay] = useState(false);

  const readData = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_TURN);
      console.log(value);

      if (value === null) {
        dispatch(setTurn(10));
      }

      if (value !== null) {
        dispatch(setTurn(value));
      }
    } catch (e) {
      alert('Failed to fetch the input from storage');
    }
  };

  useEffect(() => {
    readData();
  }, []);

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
            <Text style={appStyle.back}>Back</Text>
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
        <Payment />
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
  turn: PropTypes.any,
  isShowShopping: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  turn: makeSelectTurn(),
  isShowShopping: makeSelectIsShowShopping(),
});

export default connect(mapStateToProps)(App);
