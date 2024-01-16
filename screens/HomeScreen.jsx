import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NavBar from "../components/Navbar";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);
  console.log("Logged User: ", user);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text>Main Content Goes Here</Text>
      </View>

      <View style={styles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    width: "100%",
  },
});

export default HomeScreen;
