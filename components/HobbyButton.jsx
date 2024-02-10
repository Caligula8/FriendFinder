import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

const HobbyButton = ({ HobbyName }) => {
  return (
    <View style={styles.button}>
      <Text style={styles.buttonText}>{HobbyName}</Text>
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
    borderColor: "#FDDBDD",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "rgba(203, 31, 44, 0.7)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 5,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8D8D8D",
    textAlign: "center",
  },
});

export default HobbyButton;
