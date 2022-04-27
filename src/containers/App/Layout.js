import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, View } from 'react-native';
import { images } from 'assets/images';
import { layoutStyle } from './style';

function Layout({ children }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timeChange = setTimeout(() => {
      if (index === 3) {
        setIndex(0);
      }
      if (index !== 3) {
        setIndex(index + 1);
      }
    }, 8000);

    return () => {
      clearTimeout(timeChange);
    };
  }, [index]);

  return (
    <ImageBackground
      source={
        index === 0
          ? images.home.background1
          : index === 1
          ? images.home.background2
          : images.home.background3
      }
      style={layoutStyle.background}>
      <View style={layoutStyle.children}>{children}</View>
    </ImageBackground>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
