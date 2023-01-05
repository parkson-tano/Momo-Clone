import React, { useState } from "react";
import { Button, View, Text, SafeAreaView, RefreshControl } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterStack from "./src/components/navigation/RegisterStack";
import { AppRegistry } from "react-native";
import Service from "./src/components/auth/Services";
import { AuthProvider } from "./src/components/context/AuthContext";
import { AxiosProvider } from "./src/components/context/AxiosContext";
import DashboardStack from "./src/components/navigation/DashboardStacjk";
import MyTabs from "./src/components/MyTabs";
import Dashboard from "./src/components/Dashboard";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <AuthProvider>
      <AxiosProvider>
        <NavigationContainer initialRouteName="Home">
          <Service />
          {/* <DashboardStack /> */}
        </NavigationContainer>
      </AxiosProvider>
    </AuthProvider>
  );
}

export default App;
