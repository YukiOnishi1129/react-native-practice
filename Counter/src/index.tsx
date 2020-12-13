import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
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
  disabledButton: {
    backgroundColor: 'gray',
  },
  textContainer: {
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default function Counter() {
  const [count, setCounter] = React.useState(0);
  const addCounter = React.useCallback(() => {
    setCounter(count + 1);
  }, [count]);
  const reduceCounter = React.useCallback(() => {
    setCounter(count - 1);
  }, [count]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={addCounter}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {count >= 10 && <Text>you're great!</Text>}
        <Text style={styles.text}>{count}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, count <= 0 && styles.disabledButton]}
        onPress={reduceCounter}
        disabled={count <= 0}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
    </View>
  );
}
