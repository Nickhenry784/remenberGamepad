import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { images } from 'assets/images';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SizedBox } from 'sizedbox';
import { makeSelectTurn } from './selectors';
import { appStyle } from './style';
import { decrementTurn, setShowShopping } from './actions';
import GamePadInput from './GamePadInput';
import defaultInputs from './data/inputs';

function GamePad({ dispatch, turn }) {
  const [inputs, setInputs] = useState(defaultInputs);
  const [inputDisable, setInputDisable] = useState(true);

  const onSetShowShopping = () => {
    dispatch(setShowShopping(true));
  };

  const onSaveGamePad = () => {
    if (turn > 0) {
      setInputDisable(false);
      dispatch(decrementTurn());
    } else {
      Alert.alert('Please buy more turn!');
    }
  };

  const onSetInput = (type, value) => {
    const newInputs = { ...inputs };
    newInputs[type] = value;
    setInputs(newInputs);
  };

  const onResetGamePad = () => {
    setInputs(defaultInputs);
    setInputDisable(true);
  };

  return (
    <>
      <ImageBackground
        source={images.home.gamepad}
        style={appStyle.gamepadImage}>
        {Object.keys(inputs).map(inputKey => (
          <GamePadInput
            value={inputs[inputKey]}
            type={inputKey}
            key={inputKey}
            inputDisable={inputDisable}
            onSetInput={onSetInput}
          />
        ))}
      </ImageBackground>
      <SizedBox vertical={30} />
      <View style={appStyle.startResetView}>
        <TouchableOpacity onPress={onSaveGamePad} onLongPress={onSaveGamePad}>
          <ImageBackground
            source={images.home.button}
            style={appStyle.imageButton}>
            <Text style={appStyle.textButton}>Save</Text>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={onResetGamePad} onLongPress={onResetGamePad}>
          <ImageBackground
            source={images.home.button}
            style={appStyle.imageButton}>
            <Text style={appStyle.textButton}>Reset</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <SizedBox vertical={10} />
      <TouchableOpacity
        onPress={onSetShowShopping}
        onLongPress={onSetShowShopping}>
        <ImageBackground
          source={images.home.button}
          style={appStyle.imageButton}>
          <Text style={appStyle.textButton}>Buy</Text>
        </ImageBackground>
      </TouchableOpacity>
    </>
  );
}

GamePad.propTypes = {
  dispatch: PropTypes.func,
  turn: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  turn: makeSelectTurn(),
});

export default connect(mapStateToProps)(GamePad);
