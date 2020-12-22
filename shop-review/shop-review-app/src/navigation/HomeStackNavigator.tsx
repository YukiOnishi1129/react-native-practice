import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
/* screens */
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
/* type */
import { RootStackParamList } from "../types/navigation";

const Stack = createStackNavigator<RootStackParamList>();

/**
 * タブを生成
 */
export const HomeStackNavigator = () => {
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
