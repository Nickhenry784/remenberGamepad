import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { images } from 'assets/images';
import { connect } from 'react-redux';
import { appStyle, layoutStyle } from './style';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function PlayPage({ onClickBackButton }) {
  const [score, setScore] = useState(0);
  const [right, setRight] = useState(0);
  const [topPos, setTopPos] = useState(windowHeight * 0.8);

  useEffect(() => {
    const timeLife = setTimeout(() => {
      if (right !== 100) {
        setRight(right + 10);
      }
      if (right === 30) {
        setTopPos(windowHeight * 0.75);
        setScore(score + 1);
      }
      if (right === 40) {
        setTopPos(windowHeight * 0.8);
      }
      if (right === 100) {
        setRight(-10);
      }
    }, 1000);
    return () => {
      clearTimeout(timeLife);
    };
  }, [right]);

  return (
    <>
      <Image source={images.home.background} style={layoutStyle.background} />
      <View style={appStyle.playView}>
        <Text style={appStyle.scoreText}>{score}</Text>
        <TouchableOpacity
          onPress={onClickBackButton}
          onLongPress={onClickBackButton}>
          <Image source={images.home.exit} style={appStyle.playImage} />
        </TouchableOpacity>
        <Animated.Image
          source={images.home.sheep}
          style={[
            {
              position: 'absolute',
              top: topPos,
              right: `${right} %`,
              width: windowWidth * 0.1,
              height: windowHeight * 0.06,
            },
          ]}
        />
      </View>
    </>
  );
}

PlayPage.propTypes = {
  onClickBackButton: PropTypes.func,
};

export default connect()(PlayPage);
