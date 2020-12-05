/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { ReactNode } from 'react';
import { StyleSheet, View, Text, ViewStyle } from 'react-native';

interface Props {
  backgroundColor: string;
  color: string;
  label: string;
}

const styles = StyleSheet.create({
  label: {
    marginTop: 100,
    padding: 8,
    fontSize: 24,
  },
});

const App = (props: Props) => {
  const { backgroundColor, color, label } = props;

  return <Text style={[styles.label, { backgroundColor, color }]}>{label}</Text>;
};

export default App;

App.defaultProps = {
  backgroundColor: '#008080',
  color: 'white',
  label: 'hello',
};
