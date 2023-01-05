import { View, Text, Button } from "react-native";
import React, { useRef } from "react";
import { Image } from "@rneui/themed";
import TopSelf from "./TopSelf";
import TopOther from "./TopOther";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Withdraw = () => {
  const navigation = useNavigation();
  const fxn = () => {
    navigation.navigate("FundWithdraw");
  };
  return (
    <View>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/163007/phone-old-year-built-1955-bakelite-163007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
        style={{ width: 200, height: 100 }}
        onPress={fxn}
      />
      <Text
        style={{ textAlign: "center", fontWeight: "bold", marginVertical: 5 }}
      >
        Withdraw Money
      </Text>
    </View>
  );
};

export default Withdraw;
