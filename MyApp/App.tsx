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
import { StyleSheet, View, Text, TextInput, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    width: 160,
    height: 32,
    borderWidth: 1,
    padding: 1,
  },
});

const App = () => {
  const ref = useRef<TextInput>(null);

  return (
    <View style={styles.contanier}>
      <TextInput ref={ref} style={styles.input} />
      <Text
        onPress={() => {
          ref?.current?.focus();
        }}
      />
    </View>
  );
};

export default App;
