import { View, StyleSheet, RefreshControl, ScrollView } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { Card, ListItem, Button, Icon, Text } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { AuthProvider } from "../context/AuthContext";
import jwt_decode from "jwt-decode";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Balance = () => {
  const navigation = useNavigation();

  const user = jwt_decode(AuthContext._currentValue.authState.access)
  console.log("user:", user);
  const [balance, setBalance] = useState("");
  const [transaction, setTransaction] = useState("");
  // const user_URL = `https://info307-production.up.railway.app/account/{user.id}`;
  const balance_info = `https://info307-production.up.railway.app/accountbalance/${user.user_id}`;
  const last_transact = `https://info307-production.up.railway.app/history/${user.phone_number}`;
  const fxn = () => {
    navigation.navigate("Transaction", { phone_number: user.phone_number });
  };
  useEffect(() => {
    axios
      .get(balance_info)
      .then((response) => {
        setBalance(response.data);
      })
      .catch((error) => console.log("here", error));
  }, []);

  useEffect(() => {
    axios.get(last_transact).then((response) => {
      if (response.status == 200) {
        let len = response.data;
        if (len.length > 0) {
          const las = parseInt(len.length) - 1;
          setTransaction(response.data[las]);
        }
      }
    }, []);
  });

  const [refreshing, setRefreshing] = React.useState(false);

  // const onRefresh = useCallback(async () => {
  //   setRefreshing(true);
  //   wait(2000).then(() => setRefreshing(false));
  // }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if (true) {
      try {
        let response = await fetch(balance_info);
        if (response.status == 200) {
          let fet_transact = await fetch(last_transact);
          if (fet_transact.status == 200) {
            let trans_response = await fet_transact.json();
            let responseJson = await response.json();
            // console.log(responseJson.balance);
            setBalance(responseJson);
            setTransaction(trans_response[trans_response.length - 1]);
            setRefreshing(false);
          }
        }
      } catch (error) {
        console.log("erro 1: ", error);
      }
    } else {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Card containerStyle={{ borderRadius: 15, padding: 20 }}>
          <Card.Title style={{ fontWeight: "bold", fontSize: 15 }}>
            {balance ? balance.balance : "*****"} FCFA
          </Card.Title>
          <View>
            <View style={styles.container}>
              <View style={styles.item1}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: 0,
                  }}
                >
                  Last Transaction
                </Text>
              </View>
              <View style={styles.item2}>
                <Button
                  buttonStyle={{
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 5,
                  }}
                  type="clear"
                  onPress={fxn}
                >
                  <Text
                    style={{
                      color: "orange",
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                  >
                    See More
                  </Text>

                  <Icon name="chevron-right" color="orange" />
                </Button>
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
                />
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={{ fontWeight: "bold", marginBottom: 10, fontSize: 17 }}
                >
                  {transaction
                    ? transaction.type_transact.toUpperCase()
                    : "*****"}
                </Text>
                <Text
                  style={{ marginBottom: 10, textAlign: "left", fontSize: 17 }}
                >
                  {transaction
                    ? transaction.type_transact.toUpperCase()
                    : "*****"}
                </Text>
              </View>
              <View style={{ width: "40%" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "right",
                    fontSize: 17,
                  }}
                >
                  {transaction ? transaction.amount : "*****"} XAF
                </Text>
                <Text
                  style={{ marginBottom: 10, textAlign: "right", fontSize: 17 }}
                >
                  {transaction
                    ? transaction.date_created.slice(11, 16)
                    : "*****"}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </View>
    </ScrollView>
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

export default Balance;
