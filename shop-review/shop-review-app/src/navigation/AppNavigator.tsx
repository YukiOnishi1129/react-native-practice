import React from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { MainTabNavigator } from "./MainTabNavigator";
/* screens */
import { AuthScreen } from "../screens/AuthScreen";

export const AppNavigator = () => {
  const user = null;
  return (
    <NavigationContainer>
      {/* スクリーンを表示させる */}
      {/* MainTabNavigator：下に表示されるタブを表示 */}
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
