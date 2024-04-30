import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const HobbyCategory = ({ category, onPress, index }) => {
  const colorSchemes = [
    {
      gradient: ["#ce747a", "#d2a0d6c7"],
      bottomColor: "#e3a1a5",
    },
    { gradient: ["#b0b5ed", "#fbc2eb"], bottomColor: "#DBCDF0" },
    { gradient: ["#da99da", "#f6e9b0"], bottomColor: "#e1a6e1" },
    { gradient: ["#83a4d4", "#b6fbff"], bottomColor: "#90d5ec" },
    { gradient: ["#99d1d1", "#e6f8f6"], bottomColor: "#99d1d1" },
    { gradient: ["#fa9bcf", "#ffe8ec"], bottomColor: "#fa9bcf" },
  ];
  const colors = colorSchemes[index % colorSchemes.length];

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={colors.gradient}
        style={styles.fullSize}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View
          style={[styles.bottomColor, { backgroundColor: colors.bottomColor }]}
        />
        <View style={styles.diagonalLine} />
        <Text style={styles.categoryText}>{category}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get("window").width;
const containerSize = screenWidth * 0.4;

const styles = StyleSheet.create({
  container: {
    width: containerSize,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 16,
    overflow: "hidden",
  },
  fullSize: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },
  bottomColor: {
    position: "absolute",
    left: 0,
    top: "50%",
    width: "160%",
    height: "80%",
    backgroundColor: "blue",
    transform: [{ translateY: -containerSize * 0.05 }, { skewY: "-45deg" }],
  },
  diagonalLine: {
    position: "absolute",
    left: 0,
    top: "50%",
    width: "160%",
    height: 2,
    backgroundColor: "black",
    transform: [{ translateY: -containerSize * 0.05 }, { rotate: "-45deg" }],
  },
  categoryText: {
    position: "absolute",
    top: 8,
    right: 8,
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
  },
});

export default HobbyCategory;
