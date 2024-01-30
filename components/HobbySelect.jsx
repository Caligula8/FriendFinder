import React, { memo } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HobbySelect = ({ HobbyName, onSelect, isSelected }) => {
  const handlePress = () => {
    onSelect(!isSelected);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: isSelected ? "#fff" : "#FDDBDD",
          backgroundColor: isSelected ? "#e24e59" : "#fff",
        },
      ]}
      onPress={handlePress}
    >
      <Text
        style={[styles.buttonText, { color: isSelected ? "#fff" : "#000" }]}
      >
        {HobbyName}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 0,
    maxWidth: 150,
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
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
