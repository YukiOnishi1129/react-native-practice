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

/**
 * shopドキュメントのrefを取得
 * @param shopId
 */
export const createReviewRef = async (shopId: string) => {
  return await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .doc(); // 自動採番のドキュメントのrefが取得できる
};

/**
 * 画像アップロード処理
 * @param uri
 * @param path
 * @return downloadUrl string 画像URL
 */
export const uploadImage = async (uri: string, path: string) => {
  // uriをblob形式に変換
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  // storageにupload
  const ref = firebase.storage().ref().child(path);

  let downloadUrl = "";
  try {
    // 画像アップロード処理
    await ref.put(blob);
    // アップロード後のURLを取得(後ほどfirestoreに保存する)
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};
