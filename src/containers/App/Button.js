import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import { buttonStyle } from './style';
import dataBuys from './data/buys';

function Button({ type, item, onClick }) {
  const onPressButton = () => {
    onClick(item.sku);
  };

  return (
    <View style={buttonStyle.button}>
      <View style={buttonStyle.buttonText}>
        <TouchableOpacity onPress={onPressButton} onLongPress={onPressButton}>
          <>
            <Text style={buttonStyle.text}>{item.description}</Text>
            <Text style={buttonStyle.textSmall}>{item.localizedPrice}</Text>
          </>
        </TouchableOpacity>
      </View>
    </View>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(['TURN']),
  item: PropTypes.object,
  onClick: PropTypes.func,
};

export default Button;
