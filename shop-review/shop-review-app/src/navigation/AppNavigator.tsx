import React from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { HomeStackNavigator } from "./HomeStackNavigator";

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* スクリーンを表示させる */}
      <HomeStackNavigator />
    </NavigationContainer>
  );
};
