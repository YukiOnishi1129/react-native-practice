import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CreateReviewScreen } from "../screens/CreateReviewScreen";
/* type */
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();
const RouteStack = createStackNavigator<RootStackParamList>();

/**
 * タブを生成
 */
const MianStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "#000", // ヘッダータブの戻るボタンの色を黒くする
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Shop" component={ShopScreen} />
    </Stack.Navigator>
  );
};

export const HomeStackNavigator = () => {
  return (
    //   mode="midal"にてモーダル形式で表示される
    <RouteStack.Navigator mode="modal">
      <RouteStack.Screen
        name="Main"
        component={MianStack}
        options={{ headerShown: false }}
      />
      <RouteStack.Screen name="CreateReview" component={CreateReviewScreen} />
    </RouteStack.Navigator>
  );
};
