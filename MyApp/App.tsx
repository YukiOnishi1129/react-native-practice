import React, { useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, TextInput } from 'react-native';
import md5 from 'md5';
import useControlledComponent from './lib/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  const familyName = useControlledComponent('');
  const personalName = useControlledComponent('');
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} {...familyName} />
      <TextInput style={styles.input} {...personalName} />
      <Text>
        {familyName.value}
        {personalName.value}
      </Text>
    </View>
  );
}
