import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
/* lib */
import { getShops } from "../lib/firebase";
/* types */
import { StackNavigationProp } from "@react-navigation/stack";
import { Shop } from "../types/shop";
import { RootStackParamList } from "../types/navigation";
/* components */
import { ShopReviewItem } from "../components/ShopReviewItem";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const onPressShop = () => {
    // 画面遷移する
    navigation.navigate("Shop");
  };

  return (
    // SafeAreaViewで囲うことで、スマホの上の部分に余白ができる
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={onPressShop} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // 横並びに何個表示させるか？
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
