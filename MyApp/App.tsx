/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useRef } from 'react';
import { StyleSheet, View, Text, TextInput, Image, ImageBackground, PixelRatio } from 'react-native';

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    width: 400,
    height: 210,
  },
});

const App = () => {
  return (
    <View style={styles.contanier}>
      <ImageBackground source={{ uri: 'logo' }} style={styles.image}>
        <Text>React Native</Text>
      </ImageBackground>
    </View>
  );
};

export default App;
