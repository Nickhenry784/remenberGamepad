import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
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
  const [indexBroken, setIndexBroken] = useState(-1);
  const [isPlay, setPlay] = useState(false);
  const numCol = 2;

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
    if (index === 5) {
      setIndexBroken(randomIntFromInterval(0, 4));
      return false;
    }
    setIndexBroken(index);
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
            <Image source={images.home.hole1} style={appStyle.turnImage} />
            <Text style={appStyle.turn}>{turn}</Text>
          </View>
        )}
        {!isShowShopping && (
          <TouchableOpacity
            onPress={onSetShowShopping}
            onLongPress={onSetShowShopping}>
            <Image source={images.home.buy} style={appStyle.shopImage} />
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
            <FlatList
              data={brokenData}
              numColumns={numCol}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() => onClickItemBroken(index)}
                  onLongPress={() => onClickItemBroken(index)}
                  style={appStyle.brokenButton}>
                  <Image source={item.image} style={appStyle.brokenImage} />
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={onClickPlayButton}
              onLongPress={onClickPlayButton}>
              <Image source={images.home.ok} style={appStyle.playImage} />
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
