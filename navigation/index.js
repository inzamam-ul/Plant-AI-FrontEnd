import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { DefaultTheme, adaptNavigationTheme } from "react-native-paper";
import ChatScreen from "../screen/ChatScreen";
import HomeScreen from "../screen/HomeScreen";
import ChatHeader from "./ChatHeader";
import HomeHeader from "./HomeHeader";

const Stack = createNativeStackNavigator();
const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});
export default function Navigation() {
  return (
    <NavigationContainer theme={LightTheme}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <HomeHeader />,
            headerStyle: {
              backgroundColor: "red",
            },
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            header: () => <ChatHeader />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
