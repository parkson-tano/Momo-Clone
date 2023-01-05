import { View, Text } from "react-native";
import React, { useRef } from "react";
import { Image } from "@rneui/themed";
import RBSheet from "react-native-raw-bottom-sheet";
import TopSelf from "./TopSelf";
import TopOther from "./TopOther";
import { Button } from "@rneui/themed";
import BootstrapStyleSheet from "react-native-bootstrap-styles";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;
const TopUp = () => {
  const navigation = useNavigation();
  const fxn = (link) => {
    navigation.navigate(link);
  };
  const refRBSheet = useRef();
  return (
    <View>
      <Image
        source={{
          uri: "https://images.pexels.com/photos/163007/phone-old-year-built-1955-bakelite-163007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        }}
        style={{ width: 200, height: 100 }}
        onPress={() => refRBSheet.current.open()}
      />
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={150}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent",
            height: 150,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View style={[s.container]}>
          <View style={{ marginBottom: 10 }}>
            <Button
              icon={<Icon name="arrow-right" size={15} color="white" />}
              title="For My Number"
              onPress={() => navigation.navigate("TopSelf")}
            />
          </View>
          <View>
            <Button
              icon={<Icon name="arrow-right" size={25} color="white" />}
              title="For Others"
              onPress={() => navigation.navigate("TopOther")}
            />
          </View>
        </View>
      </RBSheet>
      <Text
        style={{ textAlign: "center", fontWeight: "bold", marginVertical: 5 }}
      >
        Top Up Credit
      </Text>
    </View>
  );
};

export default TopUp;
