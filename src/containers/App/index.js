import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, Image, Alert } from 'react-native';
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
  const [indexBroken, setIndexBroken] = useState(-1);
  const [isPlay, setPlay] = useState(false);

  const onSetShowShopping = () => {
    dispatch(setShowShopping(!isShowShopping));
  };

  const handleClickBackButtonPlay = () => {
    setPlay(false);
    setIndexBroken(-1);
  };

  const onClickPlayButton = () => {
    if (turn === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    if (indexBroken === -1) {
      Alert.alert('Please choose your broken');
      return false;
    }
    dispatch(decrementTurn());
    setPlay(true);
  };

  const onClickItemBroken = index => {
    setIndexBroken(index);
  };

  const onClickRandomButton = () => {
    setIndexBroken(randomIntFromInterval(0, 4));
  };

  return isPlay ? (
    <Layout turn={turn}>
      <PlayPage
        index={indexBroken}
        onClickBackButton={handleClickBackButtonPlay}
      />
    </Layout>
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
          <View style={appStyle.turnView}>
            <Image source={images.home.turn} style={appStyle.turnImage} />
            <Text style={appStyle.turn}>{turn}</Text>
          </View>
        )}
        {!isShowShopping && (
          <TouchableOpacity
            onPress={onSetShowShopping}
            onLongPress={onSetShowShopping}>
            <Image source={images.home.shop} style={appStyle.shopImage} />
          </TouchableOpacity>
        )}
      </View>
      {isShowShopping ? (
        <Buttons />
      ) : (
        <>
          <View style={appStyle.viewCenter}>
            <Text style={appStyle.chooseOptionText}>
              Choose your option and play
            </Text>
            <Image source={images.home.phone} style={appStyle.phoneImage} />
          </View>
          {brokenData.map((broken, index) => (
            <TouchableOpacity
              key={broken.id}
              onPress={() => onClickItemBroken(index)}
              onLongPress={() => onClickItemBroken(index)}
              style={brokenButton(broken.top, broken.left)}>
              <Image source={broken.image} style={appStyle.brokenImage} />
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={onClickRandomButton}
            onLongPress={onClickRandomButton}
            style={brokenButton('70%', '60%')}>
            <Text style={appStyle.randomText}>Random</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onClickPlayButton}
            onLongPress={onClickPlayButton}
            style={appStyle.playButton}>
            <Image source={images.home.play} style={appStyle.playImage} />
          </TouchableOpacity>
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
