import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HobbyButton = ({ HobbyName, state = "default" }) => {
  // Default styles
  let buttonStyleChanges = {
    backgroundColor: "#fff",
    borderColor: "#FDDBDD",
  };
  let textStyleChanges = {
    color: "#8D8D8D",
  };

  // Adjust styles for match state
  if (state === "match") {
    buttonStyleChanges = {
      ...buttonStyleChanges,
      borderColor: "#FDDBDD",
      backgroundColor: "#E24E59",
    };
    textStyleChanges.color = "#fff";
  }

  return (
    <View style={[styles.button, buttonStyleChanges]}>
      <Text style={[styles.buttonText, textStyleChanges]}>{HobbyName}</Text>
    </View>
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
    elevation: 4,
    shadowColor: "rgba(203, 31, 44, 0.7)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default HobbyButton;
