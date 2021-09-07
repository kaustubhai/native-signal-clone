import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screen/login";
import Register from "./screen/register";
import Home from "./screen/home";

export default function App() {
  const Stack = createStackNavigator();

  const globalScreen = {
    headerStyle: {
      backgroundColor: "#3977f0",
    },
    headerTitleStyle: {
      color: "white",
      textAlign: "center",
    },
    headerTintColor: "white",
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={globalScreen}>
        <Stack.Screen
          name="Login"
          options={{ title: "Login to Signal" }}
          component={Login}
        />
        <Stack.Screen
          name="Register"
          options={{ title: "Signup with Signal" }}
          component={Register}
        />
        <Stack.Screen
          name="Home"
          options={{ title: "Welcome" }}
          component={Home}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
