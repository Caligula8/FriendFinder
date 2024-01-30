import React from "react";
import { useState } from "react";
import { UserTextInput } from "../../components";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ContinueButton from "../../components/ContinueButton";
//Firebase Imports
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const Register1 = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const handleContinue = async () => {
    if (getEmailValidationStatus && email !== "") {
      try {
        const userCred = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        const data = {
          _id: userCred.user.uid,
          providerData: userCred.user.providerData[0],
        };

        await setDoc(doc(firestoreDB, "users", userCred.user.uid), data);

        console.log("User document created successfully:", userCred.user.uid);
        navigation.navigate("Register2");
      } catch (error) {
        console.error("Error creating user document: ", error);
      }
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign up</Text>
        <Text style={styles.stepText}>Step 1/3</Text>
      </View>

      {/*Email Input Box*/}
      <Text style={styles.label}>Email address</Text>
      <UserTextInput
        placeholder="Email"
        isPass={false}
        setStatValue={setEmail}
        setGetEmailValidationStatus={setGetEmailValidationStatus}
      />
      {/*Password Input Box*/}
      <Text style={styles.label}>Password</Text>
      <UserTextInput
        placeholder="Password"
        isPass={true}
        setStatValue={setPassword}
      />

      {/*Confirm Password Input Box*/}
      <Text style={styles.label}>Confirm Password</Text>
      <UserTextInput
        placeholder="Confirm Password"
        isPass={true}
        setStatValue={setConfirmPassword}
      />

      {/*Password Requirements*/}
      <View className="w-full py-2 flex-row items-center justify-center space-x-2">
        <Text>+ 8 characters</Text>
        <Text>+ 1 uppercase</Text>
        <Text>+ 1 number</Text>
      </View>

      {/*Continue Button*/}
      {/*onPress={handleSignUp}*/}
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

export default Register1;
