import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, SafeAreaView, View, Image, Alert } from "react-native";
import firebase from "firebase";
import { createReviewRef, uploadImage } from "../lib/firebase";
import { pickImage } from "../lib/image-picker";
import { UserContext } from "../contexts/userContext";
import { ReviewsContext } from "../contexts/reviewsContext";
/* utils */
import { getExtention } from "../utils/file";
/* components */
import { IconButton } from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { StarInput } from "../components/StarInput";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
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
  const { reviews, setReviews } = useContext(ReviewsContext);
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [score, setScore] = useState<number>(3);
  const [imageUri, setImageUri] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const onPickImage = async () => {
    // 画像のuriを取得
    const uri = await pickImage();
    setImageUri(uri);
  };

  const onSubmit = async () => {
    if (!text || !imageUri) {
      Alert.alert("レビューまたは画像がありません");
      return;
    }
    setLoading(true);
    // documentのIDを先に取得
    const reviewDocRef = await createReviewRef(shopId);
    // storageのpathを決定
    const ext = getExtention(imageUri);
    const storagePath = `reviews/${reviewDocRef.id}.${ext}`;
    // 画像をstorageにアップロード
    const downloadUrl = await uploadImage(imageUri, storagePath);
    // reviewドキュメントを作る
    const review = {
      id: reviewDocRef.id,
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
      imageUrl: downloadUrl,
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    } as Review;
    // ドキュメントのrefにsetすることで、画像URLをfirestoreに保存
    await reviewDocRef.set(review);
    // レビュー一覧に即時反映
    setReviews([review, ...reviews]);
    setLoading(false);
    navigation.goBack(); //モーダルを閉じる
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
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
        {!!imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button text="レビューを投稿する" onPress={onSubmit} />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
