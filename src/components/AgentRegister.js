import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const AgentRegister = ({ route, navigation }) => {
  const { mtn_id } = route.params;
  const momo_URL =
    "https://info307-production.up.railway.app/account/register/";
  const agent_URL =
    "https://info307-production.up.railway.app/account/register-agent/";
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [momoAccount, SetMomoAccount] = useState(mtn_id);
  const [userID, setUserID] = useState("");
  const [agentName, setAgentName] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [mtnAccount, SetMtnAccount] = useState(mtn_id);
  const [submitting, SetSubmitting] = useState(false);
  const [btn, setBtn] = useState(false);
  const [agent, setAgent] = useState(true);
  const [phoneError, SetPhoneError] = useState(false);
  const isSubmitting = () => {
    SetSubmitting(true);
    setBtn(true);
  };
  const create_momo = (event) => {
    event.preventDefault();
    isSubmitting();
    axios
      .post(momo_URL, {
        password: password,
        phone_number: phoneNumber,
        mtn_account: momoAccount,
        momo_agent: true,
      })
      .then((response) => {
        console.log(response.data);
        setUserID(response.data.id);
        axios
          .post(agent_URL, {
            agent_name: agentName,
            agent_code: agentCode,
            mtn_account: momoAccount,
            user: response.data.id,
          })
          .then((response) => {
            console.log(response.data);
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.log(error.response);
            alert(error.response.data.phone_number);
            SetSubmitting(false);
            setBtn(false);
            SetPhoneError(true);
          });
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleSubmit = () => {
    if (password.length != 5) {
      alert("Enter a 5 digit PIN");
    }
  };
  return (
    <SafeAreaView>
      <View style={[s.container]}>
        <Card>
          <Card.Title>Agent Registration</Card.Title>
          <Card.Divider />
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={(e) => setPhoneNumber(e)}
            placeholder="Phone Number"
            keyboardType="numeric"
          />
          {phoneError && (
            <Text style={{ color: "red" }}>Phone Number Must be Unique</Text>
          )}
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={(e) => setPassword(e)}
            placeholder="Password"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={agentName}
            onChangeText={(e) => setAgentName(e)}
            placeholder="Agent Name"
          />
          <TextInput
            style={styles.input}
            value={agentCode}
            onChangeText={(e) => setAgentCode(e)}
            placeholder="Agent Code"
            keyboardType="numeric"
          />
          {submitting && (
            <ActivityIndicator
              size="large"
              color="#0066CC"
              style={{ padding: 10 }}
            />
          )}
          <Button
            title="Register"
            onPress={password.length != 5 ? handleSubmit : create_momo}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default AgentRegister;
