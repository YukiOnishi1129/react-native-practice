import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import md5 from 'md5';

const styles = StyleSheet.create({
  label: {
    height: 400,
  },
  separator: {
    height: 1,
    backgroundColor: 'gray',
  },
});

const data = [
  { id: 'first', title: 'ひとつめ' },
  { id: 'second', title: 'ふたつめ' },
  { id: 'third', title: 'みっつめ' },
];

export default function App() {
  console.log(data);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text style={styles.label}>{item.title}</Text>}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      keyExtractor={item => md5(JSON.stringify(item))}
    />
  );
}
