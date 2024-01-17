import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import NavBar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";
import { useSelector } from "react-redux";

const TestScreen = () => {
  const [userUIDs, setUserUIDs] = useState([]);

  useEffect(() => {
    const fetchUserUIDs = async () => {
      const querySnapshot = await getDocs(collection(firestoreDB, "users"));
      const uids = querySnapshot.docs.map((doc) => doc.id);
      setUserUIDs(uids);
    };

    fetchUserUIDs();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {userUIDs.map((uid, index) => (
          <TouchableOpacity
            key={index}
            style={styles.userContainer}
            onPress={() => console.log("UID clicked:", uid)}
          >
            <Text style={styles.usersName}>{uid}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer & Navbar */}
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
    width: "100%",
  },
  footer: {
    width: "100%",
  },
  userContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  usersName: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    marginLeft: 16,
  },
});

export default TestScreen;
