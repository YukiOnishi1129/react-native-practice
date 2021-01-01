import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
/* navigators */
import { HomeStackNavigator } from "./HomeStackNavigator";
/* screens */
import { UserScreen } from "../screens/UserScreen";
import { SearchScreen } from "../screens/SearchScreen";

const Tab = createBottomTabNavigator();

/**
 * 下のタブを表示
 */
export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#900",
        inactiveTintColor: '"999',
      }}
    >
      {/* デフォルトで */}
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
