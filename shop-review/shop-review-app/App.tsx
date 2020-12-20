import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as firebase from "firebase";
import "firebase/firestore";
import { StyleSheet, Text, View } from "react-native";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyAqXU1-j7af224IKDODhOu43hvnoPSAG6A",
    authDomain: "shop-review-736f1.firebaseapp.com",
    projectId: "shop-review-736f1",
    storageBucket: "shop-review-736f1.appspot.com",
    messagingSenderId: "1058416559099",
    appId: "1:1058416559099:web:00448012e683816499815e",
    measurementId: "G-4E38HR2KPV",
  };
  firebase.initializeApp(firebaseConfig);
}

type Shop = {
  name: string;
  place: string;
};

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);
  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const snapshot = await firebase.firestore().collection("shops").get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    setShops(shops);
  };

  const shopItems = shops.map((shop, index) => (
    <View style={{ margin: 10 }} key={index.toString()}>
      <Text>{shop.name}</Text>
      <Text>{shop.place}</Text>
    </View>
  ));

  return <View style={styles.container}>{shopItems}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
