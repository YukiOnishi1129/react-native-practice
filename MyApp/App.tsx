import React, { useState, useCallback, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import md5 from 'md5';

const styles = StyleSheet.create({
  container: {
    marginTop: 44,
  },
  label: {
    // width: 200
    height: 400,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
});

interface Item {
  id: string;
  title: string;
}

const data = [
  { id: 'first', title: 'ひとつめ' },
  { id: 'second', title: 'ふたつめ' },
  { id: 'third', title: 'みっつめ' },
  { id: 'fourth', title: '四つめ' },
  { id: 'fifth', title: '5つめ' },
  { id: 'sixth', title: '6つめ' },
  { id: 'seventh', title: '7つめ' },
];

export default function App() {
  const list = useRef<FlatList<Item>>(null);
  const scrollToThird = useCallback(() => {
    list?.current?.scrollToIndex({ index: 2 });
  }, [list]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={scrollToThird}>
        <Text>Scroll to third</Text>
      </TouchableOpacity>
      <FlatList ref={list} data={data} renderItem={({ item }) => <Text style={styles.label}>{item.title}</Text>} />
    </View>
  );
}
