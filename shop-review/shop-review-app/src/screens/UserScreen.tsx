import React, { useState, useContext } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import firebase from "firebase";
import { updateUser } from "../lib/firebase";
/* conponents */
import { Form } from "../components/Form";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
/* cnotexts */
import { UserContext } from "../contexts/userContext";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { user, setUser } = useContext(UserContext);
  const userName = !!user ? user.name : "";
  const userId = !!user && user.id ? user.id : "";
  const [name, setName] = useState<string>(userName);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    // 更新日を更新
    const updatedAt = firebase.firestore.Timestamp.now();
    await updateUser(userId, { name, updatedAt });
    !!user && setUser({ ...user, name, updatedAt });
    setLoading(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
