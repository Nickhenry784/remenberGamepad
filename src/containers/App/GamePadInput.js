import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { appStyle } from './style';

function GamePadInput({ type, value, inputDisable, onSetInput }) {
  let style = {};
  switch (type) {
    case 'right':
      style = appStyle.inputRightButton;
      break;
    case 'left':
      style = appStyle.inputLeftButton;
      break;
    case 'bottom':
      style = appStyle.inputBottomButton;
      break;
    case 'top':
      style = appStyle.inputTopButton;
      break;
    case 'green':
      style = appStyle.inputGreenButton;
      break;
    case 'blue':
      style = appStyle.inputBlueButton;
      break;
    case 'yellow':
      style = appStyle.inputYellowButton;
      break;
    case 'red':
      style = appStyle.inputRedButton;
      break;
    default:
      break;
  }

  return (
    <TextInput
      style={style}
      onChangeText={text => onSetInput(type, text)}
      editable={inputDisable}
      maxLength={1}
      value={String(value)}
    />
  );
}

GamePadInput.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onSetInput: PropTypes.func,
  inputDisable: PropTypes.bool,
};

export default connect()(memo(GamePadInput));
