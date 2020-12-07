import React, { useState, useCallback, useRef, useEffect } from 'react';
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
  Alert,
  AppState,
} from 'react-native';
import md5 from 'md5';
// import useControlledComponent from './lib/hooks';

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
  const [state, setState] = useState<string>(AppState.currentState);
  const setAppState = (newState: string) => {
    setState(newState);
    if (newState === 'active') {
      Alert.alert('active');
    }
  };

  useEffect(() => {
    AppState.addEventListener('change', setAppState);
    return () => {
      AppState.removeEventListener('change', setAppState);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>{state}</Text>
    </View>
  );
}
