import React, { useState, useCallback, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import md5 from 'md5';
// import useControlledComponent from './lib/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  button: {
    backgroundColor: 'red',
    width: 300,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  input: {
    borderWidth: 1,
    width: 256,
    padding: 4,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="small" color="white" />
    </View>
  );
}
