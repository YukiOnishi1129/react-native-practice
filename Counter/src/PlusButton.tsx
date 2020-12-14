import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#008080',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

interface Props {
  count: number;
  setCounter: (count: number) => void;
}

export default function PlusButton(props: Props) {
  const {count, setCounter} = props;
  const addCounter = React.useCallback(() => {
    setCounter(count + 1);
  }, [count, setCounter]);

  return (
    <TouchableOpacity style={styles.button} onPress={addCounter}>
      <Text style={styles.buttonText}>+</Text>
    </TouchableOpacity>
  );
}
