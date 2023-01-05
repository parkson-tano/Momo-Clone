import { View, SafeAreaView, ScrollView, RefreshControl } from "react-native";
import React, { useState, useContext } from "react";
import Balance from "./dashboard/Balance";
import Features from "./dashboard/Features";
import { Text } from "@rneui/themed";
import { AuthContext } from "./context/AuthContext";
const Dashboard = ({ route, navigation }) => {
  const authContext = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View>
        <Text
          h4
          style={{
            paddingHorizontal: 10,
            fontWeight: "bold",
            margin: 10,
            backgroundColor: "white",
            width: "100%",
          }}
        >
          Main Account {authContext.authState.account}
        </Text>
      </View>
      <View>
        <Balance />
      </View>
      <View>
        <Features />
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;
