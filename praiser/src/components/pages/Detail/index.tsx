import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Button, TextField } from '../../atoms';
import { useControlledComponent } from '../../../lib/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  textField: {
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});

// interface TodoEditActions {
//   chageTodo: (
//     id: string,
//     newValue: {
//       title: string;
//       detail: string;
//     },
//   ) => void;
// }

// interface Props {
//   actions: TodoEditActions;
// }

interface Params {
  id: string;
  isEditable: boolean;
  title: string;
  detail: string;
}

export default function Detail() {
  const { goBack } = useNavigation();
  // 画面遷移の際に渡されるパラメータを受け取る
  const { params } = useRoute<RouteProp<Record<string, Params>, string>>();
  const { isEditable, title: titleInitailValue, detail: detailInitialValue } = params;

  const title = useControlledComponent(titleInitailValue);
  const detail = useControlledComponent(detailInitialValue);

  const onSubmit = React.useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <View style={styles.container}>
      <TextField
        disabled={!isEditable}
        label="title"
        value={title.value}
        onChangeText={title.onChangeText}
        style={styles.textField}
      />
      <TextField
        disabled={!isEditable}
        label="detail"
        value={detail.value}
        onChangeText={detail.onChangeText}
        style={styles.textField}
      />
      {isEditable && <Button onPress={onSubmit} label="Submit" style={styles.button} />}
    </View>
  );
}
