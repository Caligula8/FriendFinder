import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";

const HobbyCategory = ({ category, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.categoryText}>{category}</Text>
    </TouchableOpacity>
  );
};

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.4,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
    backgroundColor: "gray",
    borderRadius: 16,
    overflow: "hidden",
  },
  categoryText: {
    position: "absolute",
    top: 8,
    right: 8,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "transparent",
  },
});

export default HobbyCategory;
