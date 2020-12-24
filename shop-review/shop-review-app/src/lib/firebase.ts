import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { Shop } from "../types/shop";
import Constants from "expo-constants";
import { User, initialUser } from "../types/user";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firebase);
}

export const getShops = async () => {
  try {
    const snapshot = await firebase
      .firestore()
      .collection("shops")
      .orderBy("score", "desc") // scoreの高い順にソート表示
      .get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    return shops;
  } catch (err) {
    return [];
  }
};

export const siginin = async () => {
  // firebaseの匿名ログインが実行される
  const userCredential = await firebase.auth().signInAnonymously();
  // @ts-ignore
  const { uid } = userCredential.user;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid,
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User;
  }
};
