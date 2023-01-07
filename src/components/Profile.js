import { View, Text } from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "./context/AuthContext";
import { AxiosContext } from "./context/AxiosContext";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const Profile = ({ navigation }) => {

  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  return (
    <View style={[s.container]}>
      <Card>
        <Card.Title>My Profile</Card.Title>
        <Card.Divider />
        <Card.Title>{authContext.authState.phone_number}</Card.Title>
        <Card.Divider />
        <Button
          title="Change Password"
          onPress={() => navigation.navigate("ChangePassword")}
          style={[s.py5]}
        />
        <Button
          title="Logout"
          onPress={() => authContext.logout()}
          style={[s.py5]}
          buttonStyle={{
            borderColor: "rgba(78, 116, 289, 1)",
            marginTop:20
          }}
        />
      </Card>
    </View>
  );
};

export default Profile;
