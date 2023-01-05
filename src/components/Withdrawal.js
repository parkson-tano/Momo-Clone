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
const Withdrawal = () => {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const [amount, setAmount] = useState("");
  const [fee, setFee] = useState("");
  const [agentNumber, setAgentNumber] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [balance, setBalance] = useState("");
  const [agentbalance, setAgentBalance] = useState("");
  const [agentUserId, setAgentUserId] = useState("");
  const [btn, setBtn] = useState(false);
  const withdraw_url = "https://info307-production.up.railway.app/withdraw";
  const user = jwt_decode(AuthContext._currentValue.authState.access);
  const balance_url = `https://info307-production.up.railway.app/accountbalance/`;
  const agent_url =
    "https://info307-production.up.railway.app/account/agent-account/";
  const pin = authContext.authState.password;

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
  const new_bal = parseInt(agentbalance.balance) + parseInt(amount);

  const withdraw_momo = async () => {
    axios.post(withdraw_url, {
      amount: amount,
      momo_agent: agentCode,
      user: user.user_id,
    });
    axios.patch(balance_url, {
      balance: new_ba,
    });
    const response = await fetch(agent_url + `${agentUserId}`);

    const dat = await response.json();
    const bal = parseInt(dat.balance) + parseInt(amount);
    axios.patch(agent_url + `${dat.id}`, {
      balance: bal,
    });
    navigation.navigate("Home");
  };

  const collect = async () => {
    isSubmitting();
    const res = await fetch(agent_url + `${agentCode}`);
    if (res.status !== 200) {
      Alert.alert(`Invalid Code`);
    }
    const data = await res.json();
    console.log("here 1: ", data);
    if (agentNumber !== data.user.phone_number) {
      Alert.alert("Number is Incorrect");
    } else {
      Alert.prompt(
        "Enter PIN",
        `Enter your your to withdraw ${amount} from ${data.agent_name} ${data.agent_code}`,
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
                withdraw_momo();
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
          placeholder="Enter Merchant Code"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={agentCode}
          onChangeText={(e) => setAgentCode(e)}
        />
        <Input
          placeholder="Enter Merchant Number"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={agentNumber}
          onChangeText={(e) => setAgentNumber(e)}
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

export default Withdrawal;
