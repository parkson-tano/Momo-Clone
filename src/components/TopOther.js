import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import jwt_decode from "jwt-decode";

const bootstrapStyleSheet = new BootstrapStyleSheet();

const { s, c } = bootstrapStyleSheet;
const TopOther = ({ navigation }) => {
  const user = jwt_decode(AuthContext._currentValue.authState.access);
  const authContext = useContext(AuthContext);
  const [balance, setBalance] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [btn, setBtn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberDetail, setNumberDetail] = useState("");
  const search = "https://info307-production.up.railway.app/search/";
  const balance_info = `https://info307-production.up.railway.app/accountbalance/${user.user_id}`;
  const airtime_url = "https://info307-production.up.railway.app/airtime";
  const pin = authContext.authState.password;

  const mtn_acc =
    "https://info307-production.up.railway.app/account/mtn-account/1";
  const [submitting, setSubmitting] = useState(false);
  const isSubmitting = () => {
    setSubmitting(true);
    setBtn(true);
  };
  useEffect(() => {
    axios
      .get(balance_info)
      .then((response) => {
        setBalance(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get(search + `${phoneNumber}`)
      .then((response) => {
        setNumberDetail(response.data);
        console.log(numberDetail);
      })
      .catch((error) => console.log("errre ", error.response));
  }, []);

  const new_ba = parseInt(balance.balance) - parseInt(amount);

  const collect = () => {
    Alert.prompt(
      "Enter PIN",
      `Enter your your to buy airtime`,

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async (password) => {
            if (password == pin) {
              isSubmitting();
              axios.post(airtime_url, {
                number: phoneNumber,
                amount: amount,
                user: user.user_id,
              });
              navigation.navigate("Home");

              axios.patch(balance_info, {
                balance: new_ba,
              });
              Alert.alert("Airtime Sent: Ok");
              navigation.navigate("Home");
            } else {
              alert("Wrong PIN");
            }
          },
        },
      ],
      "secure-text"
    );
  };

  const buy_credit = async () => {
    isSubmitting();
    axios.post(airtime_url, {
      number: phoneNumber,
      amount: amount,
      user: user.user_id,
    });
    navigation.navigate("Home");
    Alert.alert("Airtime Sent: Ok");
    axios.patch(balance_info, {
      balance: new_ba,
    });
    // axios.patch(mtn_acc, {
    //   balance: new_credit,
    // });
  };

  return (
    <View style={[s.container]}>
      <Card>
        <Card.Title>Buy Credit for You</Card.Title>
        <Card.Divider />
        <Card.Title style={{ fontSize: 18 }}>{balance.balance}</Card.Title>
        <Input
          placeholder="Enter Phone Number"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={phoneNumber}
          onChangeText={(e) => setPhoneNumber(e)}
        />
        <Input
          placeholder="Enter Amount"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={amount}
          onChangeText={(e) => setAmount(e)}
        />
        {amount > balance.balance ? (
          <Text style={{ color: "red" }}>Insufficient amount</Text>
        ) : (
          ""
        )}
        {submitting && (
          <ActivityIndicator
            size="large"
            color="#0066CC"
            style={{ padding: 10 }}
          />
        )}
        <Button
          title={"Buy Credit"}
          onPress={collect}
          disabled={amount > balance.balance ? true : false || btn}
        />
      </Card>
    </View>
  );
};

export default TopOther;
