import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import { Shop } from "../types/shop";
import Constants from "expo-constants";
import { User, initialUser } from "../types/user";
import { Review } from "../types/review";

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
    const shops = snapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as Shop)
    );
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

export const updateUser = async (userId: string, params: any) => {
  await firebase.firestore().collection("users").doc(userId).update(params);
};

export const addReview = async (shopId: string, review: Review) => {
  await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .add(review);
};
