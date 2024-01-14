import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Screen
import { HomeScreen } from "../pages/HomeScreen";
import { FavoriteScreen } from "../pages/FavoriteScreen";
import { Ionicons } from "@expo/vector-icons";

const home = "Home";
const favorite = "Favorite";

const Tab = createBottomTabNavigator();

export const TabsNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === favorite) {
            iconName = focused ? "heart" : "heart-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={home}
        component={HomeScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name={favorite}
        component={FavoriteScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};
