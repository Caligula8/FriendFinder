import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HobbySelect = ({ HobbyName }) => {
  const [pressed, setPressed] = useState(true);

  const handlePress = () => {
    setPressed(!pressed);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: pressed ? "#FDDBDD" : "#fff",
          backgroundColor: pressed ? "#fff" : "#e24e59",
        },
      ]}
      onPress={handlePress}
    >
      <Text style={[styles.buttonText, { color: pressed ? "#000" : "#fff" }]}>
        {HobbyName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 0,
    maxWidth: 120,
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 2.5,
    borderColor: "#fff",
    backgroundColor: "#e24e59",
    shadowColor: "rgba(203, 31, 44, 0.0784313753247261)",
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
});

export default HobbySelect;
