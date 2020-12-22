import React, { useEffect } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
/* components */
import { ShopDetail } from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
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
  useEffect(() => {
    navigation.setOptions({ title: shop.name }); // ヘッダータブのタイトルに店名を表示させる
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop} />
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
