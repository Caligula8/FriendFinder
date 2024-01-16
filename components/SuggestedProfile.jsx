import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const SuggestedProfile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Text style={styles.bottomRightText}>Paul</Text>
        <TouchableOpacity style={styles.circleBottomLeft}>
          <FontAwesome name="user" size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.circleBottomRight}>
          <FontAwesome name="user" size={32} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileBox: {
    backgroundColor: "#707070",
    width: 300,
    height: 500,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bottomRightText: {
    position: "absolute",
    bottom: 0,
    left: 0,
    marginLeft: 16,
    marginBottom: 56,
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  circleBottomLeft: {
    position: "absolute",
    bottom: -25,
    left: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#e24e59",
    justifyContent: "center",
    alignItems: "center",
  },
  circleBottomRight: {
    position: "absolute",
    bottom: -25,
    right: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#74A253",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SuggestedProfile;
