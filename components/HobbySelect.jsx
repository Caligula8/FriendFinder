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
    maxWidth: 160,
    minHeight: 46,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
    marginRight: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 22,
    borderWidth: 2.2,
    borderColor: "#fff",
    backgroundColor: "#e24e59",
    elevation: 5,
    shadowColor: "rgba(203, 31, 44, 0.7)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },
});

export default HobbySelect;
