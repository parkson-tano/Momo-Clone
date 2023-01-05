import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import React, {useState, useContext, useEffect} from "react";
import { Card, ListItem, Button, Icon} from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../context/AuthContext";
import TopUp from "../TopUp";
import Transfer from "../Transfer";
import Withdraw from "../Withdraw";
import axios from "axios";
import Deposit from "../Deposit";

const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Features = () => {
  const authContext = useContext(AuthContext);
  const phone_number = authContext.authState.phone_number;
  const [acco, setAcco] = useState('')
  const account_url = "https://info307-production.up.railway.app/account/";

  useEffect(() => {
  axios
    .get(account_url)
    .then((response) => {
      setAcco(response.data);
    })
    .catch((error) => console.log(error));
  }, [])


  const account_type = Object.entries(acco).filter(([key, value]) => {
    return value.phone_number === phone_number;
  });

  const accounts = account_type

  let agent_account = false

  if (account_type.length > 0) {
    agent_account = account_type[0][1].momo_agent;

  }

  console.log('accou: ', account_type)
    console.log("my: ", accounts);

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
            {agent_account ? (
              <View style={styles.item}>
                <Deposit />
              </View>
            ) : (
              <View style={styles.item}>
                <Withdraw />
              </View>
            )}

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
