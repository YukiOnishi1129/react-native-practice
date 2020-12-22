import * as firebase from "firebase";
import "firebase/firestore";
import { Shop } from "../types/shop";
import Constants from "expo-constants";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShops = async () => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("shops")
      // .where("place", "==", "品川")
      .orderBy("score", "desc") // scoreの高い順にソート表示
      .get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    return shops;
  } catch (err) {
    return [];
  }
};
