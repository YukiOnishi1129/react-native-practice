import * as functions from "firebase-functions";
import admin = require("firebase-admin");
import algoliasearch from "algoliasearch";
import { UserInitail } from "./types/user";
import { Review } from "./types/review";
import { Shop } from "./types/shop";

// firebaseに保存したalgoliaのkeyを取得
const ALGOLIA_ID = functions.config().algolia.id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.key;

// Algoliaの初期設定
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const index = client.initIndex("reviews"); // Algliaで作成した「reviews」のindex

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

exports.onWriteReview = functions
  .region("asia-northeast1")
  .firestore.document("shops/{shopId}/reviews/{reviewId}")
  // onWrite: onCreate、onUpdate または onDelete がトリガーされたときにトリガーされます。
  // https://firebase.google.com/docs/functions/firestore-events
  .onWrite(async (change, context) => {
    const { shopId, reviewId } = context.params;
    const review = change.after.data() as Review;
    const db = admin.firestore();
    try {
      const shopRef = db.collection("shops").doc(shopId);
      const shopDoc = await shopRef.get();
      const shop = shopDoc.data() as Shop;
      // レビューの平均値を計算する処理
      let { score1 = 0, score2 = 0, score3 = 0, score4 = 0, score5 = 0 } = shop;
      if (review.score === 1) {
        score1 += 1;
      } else if (review.score === 2) {
        score2 += 1;
      } else if (review.score === 3) {
        score3 += 1;
      } else if (review.score === 4) {
        score4 += 1;
      } else if (review.score === 5) {
        score5 += 1;
      }

      let aveScore =
        (score1 + score2 * 2 + score3 * 3 + score4 * 4 + score5 * 5) /
        (score1 + score2 + score3 + score4 + score5);
      aveScore = Math.round(aveScore * 100) / 100;

      // shopの更新
      let params = {};
      if (review.score === 1) {
        params = {
          score1: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 2) {
        params = {
          score2: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 3) {
        params = {
          score3: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 3) {
        params = {
          score3: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 4) {
        params = {
          score4: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      } else if (review.score === 5) {
        params = {
          score5: admin.firestore.FieldValue.increment(1),
          score: aveScore,
        };
      }
      // 更新
      await shopRef.update(params);

      // algoliaに保存 (Clound Functionsを用いて、Alglia側にデータを保存させる)
      index.saveObject({
        objectID: reviewId,
        ...review, // レビューデータを展開して保存
      });
    } catch (err) {
      console.log(err);
    }
  });
