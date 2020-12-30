import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import firebase, { firestore } from "firebase";
import { addReview } from "../lib/firebase";
import { UserContext } from "../contexts/userContext";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";
import { Review } from "../types/review";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { user } = useContext(UserContext);
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);

  const userId = !!user && user.id ? user.id : "";
  const userName = !!user ? user.name : "";
  const shopId = shop.id ? shop.id : "";

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        //   navigation.goBack()で戻る
        <IconButton name="x" onPress={() => navigation.goBack()} />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    const review = {
      user: {
        id: userId,
        name: userName,
      },
      shop: {
        name: shop.name,
        id: shopId,
      },
      text,
      score,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    await addReview(shopId, review);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        value={text}
        onChangeText={(text) => {
          setText(text);
        }}
        label="レビュー"
        placeholder="レビューを書いてください。"
      />
      <Button text="レビューを投稿する" onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
