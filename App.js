import React, { useState, useEffect } from "react";
import { Button, View, Text, SafeAreaView, RefreshControl } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Service from "./src/components/auth/Services";
import { AuthProvider } from "./src/components/context/AuthContext";
import { AxiosProvider } from "./src/components/context/AxiosContext";
import DashboardStack from "./src/components/navigation/DashboardStacjk";
import * as SplashScreen from "expo-splash-screen";
const Stack = createNativeStackNavigator();

SplashScreen.hideAsync();

function App() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);
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
