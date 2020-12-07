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

const useErrorModalDialog = (initialErrors: Array<string>) => {
  const [needsToShow, setNeedsToShow] = React.useState(true);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    if (errors.length > 0 && needsToShow) {
      setNeedsToShow(false);
      Alert.alert(errors[0], undefined, [
        {
          text: 'OK',
          onPress: () => {
            setErrors(errors.filter((_, index) => index !== 0));
            setNeedsToShow(true);
          },
        },
      ]);
    }
  }, [needsToShow, errors]);

  const addError = (newError: string) => {
    setErrors([...errors, newError]);
  };

  return addError;
};

export default function App() {
  const addError = useErrorModalDialog(['1st', '2nd', '3rd']);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          addError('new error');
        }}
      >
        <Text>generate error</Text>
      </TouchableOpacity>
    </View>
  );
}
