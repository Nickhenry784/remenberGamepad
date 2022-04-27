import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ImageBackground, Image, View } from 'react-native';
import { images } from 'assets/images';
import { layoutStyle } from './style';

function Layout({ children }) {
  return (
    <>
      <Image source={images.home.background} style={layoutStyle.background} />
      <View style={layoutStyle.children}>{children}</View>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
