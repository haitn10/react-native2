import React from "react";
import { TabsNavigator } from "./TabsNavigator";
import { createStackNavigator } from "@react-navigation/stack";

// Screen
import { DetailScreen } from "../pages/DetailScreen";

const Root = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Root.Navigator>
      <Root.Screen
        name="Tabs"
        component={TabsNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Root.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Root.Navigator>
  );
};
