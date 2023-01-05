import { View, Text } from "react-native";
import React from "react";
import Balance from "../dashboard/Balance";
import Dashboard from "../Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Transaction from "../Transaction";
import Transfer from "../Transfer";
import Withdrawal from "../Withdrawal";
import TopOther from "../TopOther";
import TopSelf from "../TopSelf";
import Register from "../Register";
import Login from "../auth/Login";
import MomoRegister from "../MomoRegister";
import AgentRegister from "../AgentRegister";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RegisterStack from "./RegisterStack";
import FundTransfer from "../FundTransfer";
import Profile from "../Profile";
import ChangePassword from "../ChangePassword";
import DepositFund from "../DepositFund";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const DashboardStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Transaction" component={Transaction} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="Withdraw" component={Withdrawal} />
      <Stack.Screen name="TopSelf" component={TopSelf} />
      <Stack.Screen name="TopOther" component={TopOther} />
      <Stack.Screen name="FundTransfer" component={FundTransfer} />
      <Stack.Screen name="FundWithdraw" component={Withdrawal} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="FundDeposit" component={DepositFund} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
