import React, { useLayoutEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Diversity2Icon from "../../assets/icons/Diversity2Icon";

import { firebaseAuth, firestoreDB } from "../../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { SET_USER } from "../../context/actions/userActions";
import { useDispatch } from "react-redux";

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log("Splash");

  useLayoutEffect(() => {
    checkLoggedUser();
    // console.log("useLayoutEffect");
  }, []);

  const checkLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred?.uid) {
        getDoc(doc(firestoreDB, "users", userCred?.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              console.log("User Data:", docSnap.data());
              dispatch(SET_USER(docSnap.data()));
            }
          })
          .then(() => {
            setTimeout(() => {
              navigation.replace("Home");
            }, 2000);
          });
      } else {
        navigation.replace("Welcome");
      }
    });
  };

  return (
    <LinearGradient
      colors={["rgba(226, 78, 89, 1)", "rgba(108, 39, 113, 1)"]}
      style={styles.container}
    >
      <View style={styles.container}>
        <Diversity2Icon style={styles.icon} />
      </View>
    </LinearGradient>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
  },
});

export default SplashScreen;
