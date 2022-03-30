import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableOpacity, Alert } from 'react-native';
import { images } from 'assets/images';
import { connect } from 'react-redux';
import { appStyle, brokenPlayImage } from './style';
import { brokenData } from './data/broken';

function PlayPage({ dispatch, index, onClickBackButton }) {
  const [positionImage, setPositionImage] = useState([]);
  const [clickState, setClickState] = useState(false);

  const handlePress = evt => {
    setClickState(true);
    const list = [...positionImage];
    list.push({
      top: evt.nativeEvent.locationY,
      left: evt.nativeEvent.locationX,
    });
    setPositionImage(list);
  };

  return (
    <TouchableOpacity
      onPress={evt => handlePress(evt)}
      style={appStyle.playView}>
      <TouchableOpacity
        onPress={onClickBackButton}
        onLongPress={onClickBackButton}>
        <Text style={appStyle.backText}>Back</Text>
      </TouchableOpacity>
      {clickState &&
        positionImage.map((item, indexBrroken) => (
          <Image
            key={indexBrroken}
            source={brokenData[index].image}
            style={brokenPlayImage(item.top, item.left)}
          />
        ))}
    </TouchableOpacity>
  );
}

PlayPage.propTypes = {
  dispatch: PropTypes.func,
  index: PropTypes.number,
  onClickBackButton: PropTypes.func,
};

export default connect()(PlayPage);
