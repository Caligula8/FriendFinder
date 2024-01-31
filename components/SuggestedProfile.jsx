import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const SuggestedProfile = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <View style={styles.profileBox}>
      <Text style={styles.bottomRightText}>{user.displayName}</Text>
      <TouchableOpacity style={styles.circleBottomLeft}>
        <Feather name="x" size={32} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.circleBottomRight}>
        <Ionicons name="chatbubbles-outline" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBox: {
    backgroundColor: "#707070",
    width: "85%",
    height: "90%",
    marginBottom: 16,
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
