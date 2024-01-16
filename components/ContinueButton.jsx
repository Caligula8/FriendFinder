import React from "react";
import { TouchableOpacity, Text } from "react-native";

const ContinueButton = ({ onPress }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "#e24e59",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 16,
      marginVertical: 3,
      marginHorizontal: 16,
      justifyContent: "justify-center",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <Text className="py-2 text-white text-xl font-bold">Continue</Text>
  </TouchableOpacity>
);

export default ContinueButton;
