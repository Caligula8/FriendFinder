import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import Diversity2Icon from "../../assets/icons/Diversity2Icon";

function WelcomeScreen(props) {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("Login");
  };

  const handleSignUpPress = () => {
    navigation.navigate("Register1");
  };

  return (
    <LinearGradient
      colors={["rgba(226, 78, 89, 1)", "rgba(108, 39, 113, 1)"]}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to{"\n"}FriendFinder</Text>
        </View>

        <View style={styles.iconContainer}>
          <Diversity2Icon style={styles.icon} />
        </View>

        <View style={styles.buttonContainer}>
          {/* Change to continue button component */}
          <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    paddingHorizontal: 7,
    paddingVertical: 5,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    lineHeight: 80,
    maxWidth: "100%",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 40,
    marginHorizontal: 20,
  },
  icon: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#e24e59",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 48,
    width: "100%",
    alignSelf: "stretch",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 36,
  },
});

export default WelcomeScreen;
