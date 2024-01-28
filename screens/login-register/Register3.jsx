import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Accordion } from "../../components";
import ContinueButton from "../../components/ContinueButton";

import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const Register3 = () => {
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("Home");
  };
  const handleBackButton = () => {
    navigation.navigate("Register2");
  };

  const hobbiesData = [
    {
      title: "Music",
      hobbies: ["Guitar", "Piano", "Drums"],
    },
    {
      title: "Sports",
      hobbies: ["Soccer", "Basketball", "Tennis"],
    },
    {
      title: "Technology & Gaming",
      hobbies: ["TV Shows", "Games", "Reading"],
    },
    {
      title: "Nature & Science",
      hobbies: ["Max Width Test", "Max Width Test", "Max Width Test"],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Register2")}>
          <Ionicons name="arrow-back-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Interests</Text>
        <Text style={styles.stepText}>Step 3/3</Text>
      </View>
      {/* Accordions */}
      <ScrollView style={styles.accordionContainer}>
        {/* Fill & List Accordions */}
        {hobbiesData.map((data, index) => (
          <Accordion key={index} title={data.title} hobbies={data.hobbies} />
        ))}
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <ContinueButton onPress={handleContinue} buttonText="Continue" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 50,
  },
  backButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  accordionContainer: {
    flex: 1,
    backgroundColor: "white",
    marginBottom: 80,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 60,
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    marginLeft: 16,
    marginTop: 4,
  },
  stepText: {
    color: "#e24e59",
    fontSize: 13,
    marginRight: 16,
  },
});

export default Register3;
