import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";
import tw from "twrnc";
import axios from "axios";
import InputField from "./InputField";
import { Input, Card, Button } from "@rneui/themed";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;

const Register = ({ navigation }) => {
  const momo_URL =
    "https://info307-production.up.railway.app/account/register/";
  const mtn_URL =
    "https://info307-production.up.railway.app/account/register-mtn/";
  const age_URL =
    "https://info307-production.up.railway.app/account/register-agent/";
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [btn, setBtn] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setFrontImage(result.assets[0].uri);
    }
  };
  const pickImage2 = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setBackImage(result.assets[0].uri);
    }
  };
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [idNum, setIdNum] = useState("");
  const [mtnId, setMtnId] = useState("");

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    setDate(date);
    hideDatePicker();
  };
  const isSubmitting = () => {
    setSubmitting(true);
    setBtn(true);
  };
  const create_mtn = (event) => {
    event.preventDefault();
    isSubmitting();
    axios
      .post(mtn_URL, {
        profile_pic: null,
        id_num: idNum,
        date_of_birth: null,
        place_of_birth: date,
        address: address,
        first_name: firstName,
        last_name: lastName,
        front_pic: null,
        rear_pic: null,
        balance: 0,
        verified: true,
      })
      .then((response) => {
        console.log(response.data);
        setMtnId(response.data.id);
        console.log(mtnId);

        navigation.navigate("MomoRegister", {
          mtn_id: response.data.id,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={[s.container]}>
      <Card>
        <Card.Title>Create Account</Card.Title>
        <Card.Divider />
        <View>
          <InputField
            label={"First Name"}
            value={firstName}
            onChange={(e) => setFirstName(e)}
          />
          {!firstName && <Text style={{ color: "red" }}>Enter first name</Text>}
        </View>

        <InputField
          label={"Last Name"}
          value={lastName}
          onChange={(e) => setLastName(e)}
        />
        {!lastName && <Text style={{ color: "red" }}>Enter Last name</Text>}
        <InputField
          label={"Id Num"}
          value={idNum}
          onChange={(e) => setIdNum(e)}
        />
        {!idNum && <Text style={{ color: "red" }}>Enter ID Number</Text>}
        <InputField
          label={"Address"}
          value={address}
          onChange={(e) => setAddress(e)}
        />
        <InputField
          label={"Place of Birth"}
          value={placeOfBirth}
          onChange={(e) => setPlaceOfBirth(e)}
        />
        {!placeOfBirth && (
          <Text style={{ color: "red" }}>Enter Place of Birth</Text>
        )}
        <View style={{ margin: 10 }}>
          <Text>Date of Birth</Text>
          <Button title={date.toDateString()} onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            // display="calender"
            themeVariant="light"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
        </View>
        {!date && <Text style={{ color: "red" }}>Select Date of Birth</Text>}
        <View style={{ margin: 10 }}>
          <Button
            title="Front Of ID"
            onPress={pickImage}
            style={{ marginTop: 10 }}
          />
          {frontImage && (
            <Image
              source={{ uri: frontImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <View style={{ margin: 10 }}>
          <Button
            title="Back Of ID"
            onPress={pickImage2}
            style={{ marginTop: 10 }}
          />
          {backImage && (
            <Image
              source={{ uri: backImage }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            borderBottomColor: "#ccc",
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 30,
          }}
        ></View>

        {submitting && (
          <ActivityIndicator
            size="large"
            color="#0066CC"
            style={{ padding: 10 }}
          />
        )}
        <Button
          title={"Register"}
          onPress={create_mtn}
          disabled={firstName && lastName ? false : true}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "#AD40AF", fontWeight: "700" }}> Login</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </ScrollView>
  );
};

export default Register;
