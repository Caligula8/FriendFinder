import React from "react";
import { useState } from "react";
import { UserTextInput } from "../../components";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DoBInput from "../../components/DoBInput";
import ContinueButton from "../../components/ContinueButton";

import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const Register2 = () => {
  console.log("this is Register2");
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [DoB, setDob] = useState("");

  const handleContinue = async () => {
    try {
      console.log("testing testing. uid is ", firebaseAuth.currentUser.uid);

      const userRef = firestoreDB
        .collection("users")
        .doc(firebaseAuth.currentUser.uid);
      const data = {
        displayName: name,
        dateOfBirth: DoB,
      };
      await userRef.update(data);
      navigation.navigate("Register3");
    } catch (error) {
      console.error("Error updating user document (Register2): ", error);
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Register1")}>
          <Ionicons name="arrow-back-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.stepText}>Step 2/3</Text>
      </View>

      {/*Name Input Box*/}
      <Text style={styles.label}>Name</Text>
      <UserTextInput
        placeholder="Enter your first name"
        isPass={false}
        setStatValue={setName}
      />

      {/*Date of Birth Input*/}
      <Text style={styles.label}>Date of Birth</Text>
      <DoBInput setStatValue={setDob} />

      {/*Continue Button*/}
      <View style={styles.buttonContainer}>
        <ContinueButton onPress={handleContinue} buttonText="Continue" />
      </View>

      {/*Redirect to login*/}
      <View style={styles.loginRedirectContainer}>
        <Text style={{ fontSize: 16, color: "black" }}>
          Already have an account?
        </Text>
        <TouchableOpacity onPress={handleLoginRedirect}>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
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
  label: {
    color: "#8D8D8D",
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "center",
    marginTop: 9,
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    bottom: 60,
  },
  loginRedirectContainer: {
    width: "100%",
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  stepText: {
    color: "#e24e59",
    fontSize: 13,
    marginRight: 16,
  },
});

export default Register2;
