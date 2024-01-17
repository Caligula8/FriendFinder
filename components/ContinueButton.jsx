import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ContinueButton = ({ onPress, buttonText, transparency = 1 }) => (
  <TouchableOpacity
    style={{
      backgroundColor: `rgba(226, 78, 89, ${transparency})`,
      paddingVertical: 12,
      borderRadius: 16,
      marginVertical: 3,
      marginHorizontal: 16,
      justifyContent: "justify-center",
      alignItems: "center",
      width: "90%",
    }}
    onPress={onPress}
  >
    <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
      {buttonText}
    </Text>
  </TouchableOpacity>
);

export default ContinueButton;
