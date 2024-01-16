import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";

const UserTextInput = ({
  placeholder,
  isPass,
  setStatValue,
  setGetEmailValidationStatus,
}) => {
  const [value, setValue] = useState("");
  const [showPass, setShowPass] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleTextChanged = (text) => {
    setValue(text);
    setStatValue(text);

    if (placeholder === "Email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const status = emailRegex.test(value);
      setIsEmailValid(status);
      setGetEmailValidationStatus(status);
    }
  };

  return (
    <View
      className={`border rounded-2xl px-4 py-6 flex-row items-center justify-between space-x-4 my-2 ${
        !isEmailValid && placeholder == "Email" && value.length > 0
          ? "border-red-500"
          : "border-gray-200"
      }`}
    >
      <TextInput
        className="flex-1 text-base text-primaryText font-semibold -mt-1"
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChanged}
        secureTextEntry={isPass && showPass}
        autoCapitalize="none"
      />

      {isPass && (
        <TouchableOpacity onPress={() => setShowPass(!showPass)}>
          <Entypo
            name={`${showPass ? "eye" : "eye-with-line"}`}
            size={24}
            color={"#6c6d82"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserTextInput;
