import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useState } from "react";
import { SuggestedProfile } from "../components";

const TestScreen = () => {
  {
  }

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <SuggestedProfile />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 50,
    justifyContent: "flex-start",
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    borderColor: "#000",
    borderWidth: 1,
  },
  title: {
    color: "#8D8D8D",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 28,
    marginLeft: 6,
    marginTop: 4,
    alignSelf: "flex-start",
  },

  bodyContainer: {},
});

export default TestScreen;
