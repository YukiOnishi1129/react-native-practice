import React from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { MainTabNavigator } from "./MainTabNavigator";

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      {/* スクリーンを表示させる */}
      {/* MainTabNavigator：下に表示されるタブを表示 */}
      <MainTabNavigator />
    </NavigationContainer>
  );
};
