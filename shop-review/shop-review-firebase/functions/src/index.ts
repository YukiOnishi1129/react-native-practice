import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import { UserInitail } from "./types/user";

// 最初にfirebaseの処理を初期化
admin.initializeApp();

exports.onUpdateUser = functions
  .region("asia-northeast1")
  // どのドキュメントが更新されたかを定義 (更新された後に非同期で実行)
  .firestore.document("users/{userId}")
  // onUpdate: すでに存在するドキュメントの値が変更されたときにトリガーされます。
  // https://firebase.google.com/docs/functions/firestore-events
  .onUpdate(async (change, context) => {
    const { userId } = context.params;
    // 更新後のuserId change.after.data()で更新前のデータを取得できる
    const newUser = change.after.data() as UserInitail;

    //   revirewドキュメントの更新処理
    const db = admin.firestore();
    try {
      // コレクショングループ
      // ドキュメントを一括検索する
      // https://firebase.google.com/docs/firestore/query-data/queries#collection-group-query
      const snapshot = await db
        .collectionGroup("reviews")
        .where("user.id", "==", userId)
        .get();

      // reviewsドキュメントの更新
      // バッチ処理で更新
      // https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
      const batch = db.batch();
      snapshot.docs.forEach((reviewDoc) => {
        //   「...reviewDoc.data().user」で既存のデータを展開し、name: newUser.nameでユーザーの名前だけを上書きする
        const user = { ...reviewDoc.data().user, name: newUser.name };
        //   reviewsドキュメントを更新
        batch.update(reviewDoc.ref, { user });
      });
      // 最後に処理を確定させる
      await batch.commit();
    } catch (err) {
      console.log(err);
    }
  });
