import algoliasearch, { SearchClient } from "algoliasearch";
import Constants from "expo-constants";

// app.jsonから取得
const client: SearchClient = algoliasearch(
  Constants.manifest.extra.algolia.appId,
  Constants.manifest.extra.algolia.searchApiKey
);

export const searchReview = async (query: string) => {
  const index = client.initIndex("reviews");
  return await index.search(query);
};
