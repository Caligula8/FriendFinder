import * as React from "react";
import { useState } from "react";
import { UserTextInput } from "../../components";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; //Arrow Back Icon
import ContinueButton from "../../components/ContinueButton";
//Firebase Imports
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
//Redux Imports
import { useDispatch } from "react-redux";
import { SET_USER } from "../../context/actions/userActions";

function Login(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCred) => {
          if (userCred) {
            //console.log("User Id:", userCred?.user.uid);
            getDoc(doc(firestoreDB, "users", userCred.user.uid)).then(
              (docSnap) => {
                if (docSnap.exists()) {
                  //console.log("User Data:", docSnap.data());
                  dispatch(SET_USER(docSnap.data()));
                }
              }
            );
            navigation.navigate("Home");
          }
        })
        .catch((err) => {
          console.log("Error: ", err.message);
          if (err.message.includes("invalid-credential")) {
            setAlert(true);
            setAlertMessage("Invalid Login");
          } else if (err.message.includes("Access to this account")) {
            setAlert(true);
            setAlertMessage("Too Many Login Attempts");
          } else {
            setAlert(true);
            setAlertMessage("Something Went Wrong");
          }
          // Hide Alert After 3.5 Seconds
          const hideAlert = () => {
            setAlert(false);
          };
          setTimeout(hideAlert, 3500);
        });
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password button click
  };

  return (
    <View style={styles.container}>
      {/*Back Button*/}
      <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
        <Ionicons name="arrow-back-outline" size={32} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.label}>Email address</Text>

      {/*Enter Email*/}
      <UserTextInput
        placeholder="Email"
        isPass={false}
        setStatValue={setEmail}
        setGetEmailValidationStatus={setGetEmailValidationStatus}
      />
      {/*Enter Password*/}
      <Text style={styles.label}>Password</Text>
      <UserTextInput
        placeholder="Password"
        isPass={true}
        setStatValue={setPassword}
      />

      {/*Invalid Credential Alert*/}
      {alert && <Text style={styles.errAlertText}>{alertMessage}</Text>}

      {/*Continue Button*/}
      <View style={styles.buttonContainer}>
        <ContinueButton onPress={handleLogin} />
      </View>

      {/*Forgot Password*/}
      <TouchableOpacity
        style={styles.forgotPassword}
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  errAlertText: {
    color: "#e24e59",
    fontSize: 16,
    lineHeight: 24,
    alignSelf: "center",
    marginTop: 9,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
  },
  forgotPassword: {
    color: "#8D8D8D",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    textDecorationLine: "underline",
    alignSelf: "center",
    marginTop: 8,
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
  },
  forgotPasswordText: {
    color: "#8D8D8D",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 20,
    textDecorationLine: "underline",
    alignSelf: "center",
  },
});

export default Login;
