import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import axios from "axios";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Transaction = ({ route }) => {
  const { phone_number } = route.params;
  const [transactions, setTransactions] = useState("");
  const transact_url = `https://info307-production.up.railway.app/history/${phone_number}`;
  useEffect(() => {
    axios
      .get(transact_url)
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (true) {
      try {
        let response = await fetch(transact_url);
        let responseJson = await response.json();
        // console.log(responseJson.balance);
        setTransactions(responseJson);
        setRefreshing(false);
      } catch (error) {
        // console.error(error);
      }
    } else {
      setRefreshing(false);
    }
  }, [refreshing]);
  return (
    <View>
      <Card>
        <Card.Title>My Transaction</Card.Title>
        <Card.Divider />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={transactions}
          renderItem={({ item }) => (
            <View style={{ marginBottom: 20 }}>
              <View style={styles.container}>
                <View style={{ width: "20%" }}>
                  <Icon
                    type="evilicon"
                    name="user"
                    color="purple"
                    raised
                    reverse
                    size="large"
                  />
                </View>
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item.type_transact.toUpperCase()}
                  </Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item.amount} FCFA{" "}
                  </Text>
                </View>
              </View>
              <View style={styles.container}>
                <View style={{ width: "20%" }}>
                  <Icon
                    type="evilicon"
                    name="user"
                    color="purple"
                    raised
                    reverse
                    size="large"
                  />
                </View>
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item.type_transact.toUpperCase()}
                  </Text>
                </View>
                <View style={{ width: "40%" }}>
                  <Text
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      fontSize: 18,
                    }}
                  >
                    {item.date_created.slice(11, 16)}
                  </Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.date_created}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item1: {
    width: "60%",
    marginVertical: 10,
    // is 50% of container width
  },
  item2: {
    width: "40%",
    marginVertical: 10,
    // is 50% of container width
  },
});

export default Transaction;
