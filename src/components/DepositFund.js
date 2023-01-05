import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./context/AuthContext";
import { AxiosContext } from "./context/AxiosContext";
import jwt_decode from "jwt-decode";
const bootstrapStyleSheet = new BootstrapStyleSheet();

const { s, c } = bootstrapStyleSheet;
const DepositFund = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState("");
  const [momoNumber, setMomoNumber] = useState("");
  const [balance, setBalance] = useState("");
  const [useBalance, setUserBalance] = useState("");
  const [userId, setUserId] = useState("");
  const [btn, setBtn] = useState(false);
  const deposit_url = "https://info307-production.up.railway.app/deposit";
  const user = jwt_decode(AuthContext._currentValue.authState.access);
  const balance_url = `https://info307-production.up.railway.app/accountbalance/`;
  const agent_url =
    "https://info307-production.up.railway.app/account/agent-account/";
  const pin = authContext.authState.password;

  const account_url = "https://info307-production.up.railway.app/account/";

  const [submitting, setSubmitting] = useState(false);

  const isSubmitting = () => {
    setSubmitting(true);
    setBtn(true);
  };
  useEffect(() => {
    axios
      .get(balance_url + `${user.user_id}`)
      .then((response) => {
        setBalance(response.data);
      })
      .catch((error) => console.log("here a", error));
  }, []);

  const new_ba = parseInt(balance.balance) - parseInt(amount);

  const deposit_momo = async () => {
    await axios.post(deposit_url, {
      amount: amount,
      momo_agent: user.user_id,
      recipient: momoNumber,
      
    });
    await console.log("respose: ", response.data);
    await axios.patch(balance_url + `${user.user_id}`, {
      balance: new_ba,
    });
    await navigation.navigate("Home");
  };

  const collect = async () => {
    isSubmitting();

    const response = await fetch(account_url);
    const data_response = await response.json();
    const data_res = await data_response.filter(
      (account) => account.phone_number == momoNumber
    );
    if (data_res.length == 0) {
      Alert.alert("Number Not Found");
      setSubmitting(false);
      setBtn(false);
    } else {
      const data = await data_res[0];
      const balance_response = await fetch(balance_url + `${data.id}`);
      const data_balance = await balance_response.json();

      const new_bal = (await parseInt(data_balance.balance)) + parseInt(amount);

      Alert.prompt(
        "Enter PIN",
        `Enter your your to Deposit ${amount} to ${data.first_name} ${data.last_name}`,
        [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Pressed");
              setSubmitting(false);
              setBtn(false);
            },
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async (password) => {
              if (password == pin) {
              await axios.post(deposit_url, {
                amount: amount,
                momo_agent: user.user_id,
                recipient: data.id,
              });
              await console.log("respose: ", response.data);
              await axios.patch(balance_url + `${user.user_id}`, {
                balance: new_ba,
              });
              await navigation.navigate("Home");
                await axios.patch(balance_url + `${data.id}`, {
                  balance: new_bal,
                });
                navigation.navigate("Home");
                setSubmitting(false);
                setBtn(false);
              } else {
                alert("Wrong PIN");
                setSubmitting(false);
                setBtn(false);
              }
            },
          },
        ],
        "secure-text"
      );
    }
  };

  return (
    <View style={[s.container]}>
      <Card>
        <Card.Title>Withdraw Money</Card.Title>
        <Card.Divider />
        <Card.Title>{balance.balance} </Card.Title>
        <Card.Divider />
        <Input
          placeholder="Enter Amount"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={amount}
          onChangeText={(e) => setAmount(e)}
        />
        <Input
          placeholder="Enter Momo Number"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={momoNumber}
          onChangeText={(e) => setMomoNumber(e)}
        />
        {submitting && (
          <ActivityIndicator
            size="large"
            color="#0066CC"
            style={{ padding: 10 }}
          />
        )}
        <Button
          title={"Proceed"}
          onPress={collect}
          disabled={amount > balance.balance ? true : false || btn}
        />
      </Card>
    </View>
  );
};

export default DepositFund;
