import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Context as UiContext, Status } from '../../../contexts/ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function UserInfo() {
  const { setApplicationState } = React.useContext(UiContext);
  return (
    <View style={styles.container}>
      <Text>UserInfo</Text>
      <TouchableOpacity onPress={() => setApplicationState(Status.UN_AUTHORIZED)}>
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}
