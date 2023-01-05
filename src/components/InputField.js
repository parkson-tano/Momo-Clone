import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputField({
  label,
  icon,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
  onChange,
  value,
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 20,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={onChange}
          value={value}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          onChangeText={onChange}
          value={value}
          style={{ flex: 1, paddingVertical: 0 }}
        />
      )}
      {/* {!value && (
        <Text style={{ color: "red" }}>Fill this field</Text>
      )} */}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
