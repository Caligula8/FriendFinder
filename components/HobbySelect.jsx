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
    elevation: 5,
    shadowColor: "rgba(203, 31, 44, 0.7)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 5,
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
