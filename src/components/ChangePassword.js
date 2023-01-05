import React, {useContext, useState} from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Input, Card, Button } from "@rneui/themed";
import { AxiosContext } from "./context/AxiosContext";
import { AuthContext } from "./context/AuthContext";
import * as Keychain from "react-native-keychain";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
// export const PasswordContext = createContext({ password });
const ChangePassword = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const phone_number =
    authContext.authState.phone_number
  const password =authContext.authState.password;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [btn, setBtn] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const isSubmitting = () => {
    setSubmitting(true);
    setBtn(true);
  };
  const change_url =
    `https://info307-production.up.railway.app/account/change_password/${phone_number}/`;

  const change = () => {
   isSubmitting();
   if (oldPassword == password) {
    axios.patch(change_url, {
    old_password: oldPassword,
    new_password: newPassword
   });
      Alert.alert("PIN Successfully changed");
   authContext.logout();

   }
   else {
    alert("Old Password is incorrect")
   }
   
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Change Password
        </Text>

        <Input
          placeholder="Old Password"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={oldPassword}
          onChangeText={(e) => setOldPassword(e)}
          secureTextEntry
        />
        <Input
          placeholder="New Password"
          rightIcon={{ type: "font-awesome", name: "chevron-right" }}
          keyboardType="numeric"
          value={newPassword}
          onChangeText={(e) => setNewPassword(e)}
          secureTextEntry
        />
        {submitting && (
          <ActivityIndicator
            size="large"
            color="#0066CC"
            style={{ padding: 10 }}
          />
        )}
        <Button
          title="Change Password"
          onPress={() => change()}
          style={{ marginBottom: 10 }}
          disabled={submitting ? true : false}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;
