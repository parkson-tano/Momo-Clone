import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import { AuthProvider } from "./context/AuthContext";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { AxiosContext } from "./context/AxiosContext";
import jwt_decode from "jwt-decode";

const bootstrapStyleSheet = new BootstrapStyleSheet();

const { s, c } = bootstrapStyleSheet;

const FundTransfer = () => {
  const navigation = useNavigation();
  const user = jwt_decode(AuthContext._currentValue.authState.access);
  const authContext = useContext(AuthContext);
  const [balance, setBalance] = useState("");
  const [rbalance, setRBalance] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [amount, setAmount] = useState("");
  const [password, setPassword] = useState("");
  const [momo, setMomo] = useState("");
  const [btn, setBtn] = useState(false);
  const balance_info = `https://info307-production.up.railway.app/accountbalance/${user.user_id}`;
  const receiver_info = `https://info307-production.up.railway.app/accountbalance/`;
  const transfer_url = "https://info307-production.up.railway.app/transfer";
  const search = "https://info307-production.up.railway.app/search/";
  const { publicAxios } = useContext(AxiosContext);
  const [receiver, setReceiver] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const pin = authContext.authState.password;
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

  const collect = async () => {
    const res = await fetch(
      `https://info307-production.up.railway.app/search/${momo}`
    );
    if (res.status !== 200) {
      Alert.alert(`${momo} is not a register momo number`);
    }
    const data = await res.json();
    console.log("data:", data);
    Alert.prompt(
      "Enter PIN",
      `Enter your your to transfer ${amount} to ${data.first_name} ${data.last_name}`,

      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (password) => {
            setPassword(password);
            if (password == pin) {
              send_momo();
            } else {
              alert("wrong PIN");
            }
          },
        },
      ],
      "secure-text"
    );

    console.log(password);
  };
  const new_ba = parseInt(balance.balance) - parseInt(amount);
  const new_bal = parseInt(rbalance.balance) + parseInt(amount);
  const send_momo = async () => {
    isSubmitting();
    const res = await fetch(
      `https://info307-production.up.railway.app/search/${momo}`
    );
    if (res.status !== 200) {
      Alert.alert(`${momo} is not a register momo number`);
    }
    const data = await res.json();
    Alert.prompt(
      "Enter PIN",
      `Enter your your to transfer ${amount} to ${data.first_name} ${data.last_name}`,

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
              axios.post(transfer_url, {
                sender: user.phone_number,
                amount: amount,
                fee: 100,
                sender: user.user_id,
                receiver: data.id,
              });
              axios.patch(balance_info, {
                balance: new_ba,
              });
              const response = await fetch(receiver_info + `${data.id}`);
              if (response.status !== 200) {
                Alert.alert(`${momo} is not a register momo number`);
              }
              const dat = await response.json();
              const bal = parseInt(dat.balance) + parseInt(amount);
              axios.patch(receiver_info + `${data.id}`, {
                balance: bal,
              });
              navigation.navigate("Home");
            } else {
              alert("wrong PIN");
            }
          },
        },
      ],
      "secure-text"
    );
  };

  // const confirm = () => {
  //   collect()
  //   Alert.prompt(
  //       "Enter PIN",
  //       `Enter your your to transfer ${amount} to ${momo}`,
  //       [
  //         {
  //           text: "Cancel",
  //           onPress: () => console.log("Cancel Pressed"),
  //           style: "cancel"
  //         },
  //         {
  //           text: "OK",
  //           onPress: password => console.log("OK Pressed, password: " + password)
  //         }
  //       ],
  //       "secure-text"
  //     );
  // }

  return (
    <View style={[s.container]}>
      <Card>
        <Card.Title>Transfer Money </Card.Title>
        <Card.Divider />
        <Card.Title>{balance.balance}</Card.Title>
        <Card.Divider />
        <Input
          placeholder="Enter Momo Number"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={momo}
          onChangeText={(e) => setMomo(e)}
        />
        <Input
          placeholder="Enter Amount"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={amount}
          onChangeText={(e) => setAmount(e)}
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
          onPress={send_momo}
          disabled={amount > balance.balance ? true : false || btn}
        />
      </Card>
    </View>
  );
};

export default FundTransfer;
