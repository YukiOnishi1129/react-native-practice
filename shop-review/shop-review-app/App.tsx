import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { StyleSheet, Text, View, FlatList, SafeAreaView } from "react-native";
/* lib */
import { getShops } from "./src/lib/firebase";
/* types */
import { Shop } from "./src/types/shop";
/* components */
import { ShopReviewItem } from "./src/components/ShopReviewItem";

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => (
    <View style={{ margin: 10 }} key={index.toString()}>
      <Text>{shop.name}</Text>
      <Text>{shop.place}</Text>
    </View>
  ));

  return (
    // SafeAreaViewで囲うことで、スマホの上の部分に余白ができる
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // 横並びに何個表示させるか？
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
