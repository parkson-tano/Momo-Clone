import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { Card, ListItem, Button, Icon} from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import TopUp from "../TopUp";
import Transfer from "../Transfer";
import Withdraw from "../Withdraw";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Features = () => {
  return (
    <SafeAreaView>
      <Card containerStyle={{ backgroundColor: "none" }}>
        <Card.Title
          style={{ textAlign: "left", fontWeight: "bold", fontSize: 20 }}
        >
          My Service
        </Card.Title>
        <Card.Divider />

        <View style={[s.container]}>
          <View style={styles.container}>
            <View style={styles.item}>
              <TopUp />
            </View>
            <View style={styles.item}>
              <Transfer />
            </View>
            <View style={styles.item}>
              <Withdraw />
            </View>
          </View>
        </View>
      </Card>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    width: "33%",
    marginVertical: 10,
    padding: 10,
    // is 50% of container width
  },
});
export default Features;
