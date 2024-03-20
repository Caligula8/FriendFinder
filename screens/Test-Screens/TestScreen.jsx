import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDB } from "../../config/firebase.config";
import { useSelector } from "react-redux";
import SelectedPublicProfile from "../SelectedPublicProfile";

const TestScreen = () => {
  const navigation = useNavigation();
  const [userUIDs, setUserUIDs] = useState([]);
  const [selectedUserID, setSelectedUserID] = useState(null);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUserIDs = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestoreDB, "users"));
        const users = querySnapshot.docs.map((doc) => ({
          uid: doc.id,
          displayName: doc.get("displayName"),
        }));
        setUserUIDs(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserIDs();
  }, []);

  const navigateToSelectedProfile = (userID) => {
    setSelectedUserID(userID);
    navigation.navigate("SelectedPublicProfile", { userID });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {userUIDs.map((userData, index) => (
          <TouchableOpacity
            key={index}
            style={styles.userContainer}
            onPress={() => navigateToSelectedProfile(userData.uid)}
          >
            <Text style={styles.usersName}>
              {`${userData.displayName} : ${userData.uid}`}
            </Text>
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
