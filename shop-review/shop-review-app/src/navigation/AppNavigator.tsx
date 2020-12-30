import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
/* navigator */
import { MainTabNavigator } from "./MainTabNavigator";
/* screens */
import { AuthScreen } from "../screens/AuthScreen";
import { UserContext } from "../contexts/userContext";

export const AppNavigator = () => {
  const { user } = useContext(UserContext);
  return (
    <NavigationContainer>
      {/* スクリーンを表示させる */}
      {/* MainTabNavigator：下に表示されるタブを表示 */}
      {!user ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
