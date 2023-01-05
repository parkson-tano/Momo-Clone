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
const MomoRegister = ({ route, navigation }) => {
  const { mtn_id, first_name, last_name } = route.params;
  const momo_URL =
    "https://info307-production.up.railway.app/account/register/";

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [momoAccount, SetMomoAccount] = useState(mtn_id);
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [phoneError, SetPhoneError] = useState(false);
  const [submitting, SetSubmitting] = useState(false);
  const [btn, setBtn] = useState(false);

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
        momo_agent : false,
        // first_name: firstName,
        // last_name: lastName,
      })
      .then((response) => {
        console.log(response.data);
        navigation.navigate("Login");
      })
      .catch((error) => {
        console.log(error.response.data);
        alert(error.response.data.phone_number);
        SetSubmitting(false);
        setBtn(false);
        SetPhoneError(true);
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
          <Card.Title>Momo Registration</Card.Title>
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
          <View>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={(e) => setPassword(e)}
              placeholder="Password"
              keyboardType="numeric"
            />
            {password.length != 5 && (
              <Text style={{ color: "red" }}>5 Digit PIN</Text>
            )}
          </View>
          {submitting && (
            <ActivityIndicator
              size="large"
              color="#0066CC"
              style={{ padding: 10 }}
            />
          )}
          <View style={{ margin: 10 }}>
            <Button
              title="Register"
              onPress={password.length != 5 ? handleSubmit : create_momo}
              style={{ marginBottom: 10 }}
              disabled={btn}
            />
          </View>

          <View style={{ margin: 10 }}>
            <Button
              title="Register as Agent"
              onPress={() =>
                navigation.navigate("AgentRegister", { mtn_id: mtn_id })
              }
            />
          </View>
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
export default MomoRegister;
