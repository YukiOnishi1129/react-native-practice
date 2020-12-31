import React, { useEffect, useContext } from "react";
import { StyleSheet, SafeAreaView, FlatList } from "react-native";
import { getReviews } from "../lib/firebase";
import { ReviewsContext } from "../contexts/reviewsContext";
/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { ReviewItem } from "../components/ReviewItem";
/* type */
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">; // Homeからshopのデータを受け取るためのrouteの型
};

export const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
  // Home画面から渡ってきたshopのデータを取得
  const { shop } = route.params;
  const shopId = !!shop && shop.id ? shop.id : "";
  const { reviews, setReviews } = useContext(ReviewsContext);
  useEffect(() => {
    navigation.setOptions({ title: shop.name }); // ヘッダータブのタイトルに店名を表示させる
    const fetchReviews = async () => {
      const reviews = await getReviews(shopId);
      setReviews(reviews);
    };
    fetchReviews();
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(item) => item.id}
      />
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate("CreateReview", { shop })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
});
