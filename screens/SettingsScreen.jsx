import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import { globalStyles } from "../styles/globalStyles";
import { firebaseAuth } from "../config/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER_NULL } from "../context/actions/userActions";

const SignOutConfirmation = ({ onCancel, onConfirm }) => (
  <TouchableWithoutFeedback onPress={onCancel}>
    <View style={ggg.modalContainer}>
      <View style={ggg.modalContent}>
        <Text style={ggg.modalText}>Are you sure you want to sign out?</Text>
        <View style={ggg.modalButtons}>
          <TouchableOpacity style={ggg.modalButton} onPress={onCancel}>
            <Text style={ggg.modalButtonText}>No</Text>
          </TouchableOpacity>
          <TouchableOpacity style={ggg.modalButton} onPress={onConfirm}>
            <Text style={ggg.modalButtonText}>Yes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </TouchableWithoutFeedback>
);

const SettingsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [isSignOutModalVisible, setSignOutModalVisible] = useState(false);

  const navigateToPage = (route) => {
    if (route === "SignOut") {
      setSignOutModalVisible(true);
    } else {
      navigation.navigate(route);
    }
  };

  const handleSignOut = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigation.replace("Welcome");
    });
    setSignOutModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setSignOutModalVisible(false)}>
      <View style={globalStyles.pageContainer}>
        <View style={globalStyles.header}>
          <View style={globalStyles.backButtonContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-outline" size={32} color="black" />
            </TouchableOpacity>
          </View>

          <View style={globalStyles.titleContainer}>
            <Text style={globalStyles.title}>Settings</Text>
          </View>
        </View>

        <View style={globalStyles.contentContainer}>
          <TouchableOpacity
            style={ggg.settingsItem}
            onPress={() => navigateToPage("AcctManagement")}
          >
            <Ionicons
              name="person-outline"
              size={24}
              color="black"
              style={ggg.settingsIcon}
            />
            <Text style={ggg.settingsText}>Account Management</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ggg.settingsItem}
            onPress={() => navigateToPage("MyPosts")}
          >
            <Ionicons
              name="document-text-outline"
              size={24}
              color="black"
              style={ggg.settingsIcon}
            />
            <Text style={ggg.settingsText}>Your Previous Posts</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ggg.settingsItem}
            onPress={() => navigateToPage("BlockedList")}
          >
            <Ionicons
              name="ban-outline"
              size={24}
              color="black"
              style={ggg.settingsIcon}
            />
            <Text style={ggg.settingsText}>Manage Blocked List</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ggg.settingsItem}
            onPress={() => navigateToPage("SignOut")}
          >
            <Ionicons
              name="log-out-outline"
              size={24}
              color="black"
              style={ggg.settingsIcon}
            />
            <Text style={ggg.settingsText}>Sign Out</Text>
          </TouchableOpacity>

          {isSignOutModalVisible && (
            <SignOutConfirmation
              onCancel={() => setSignOutModalVisible(false)}
              onConfirm={handleSignOut}
            />
          )}
        </View>

        <View style={globalStyles.footer}>
          <NavBar />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ggg = StyleSheet.create({
  settingsItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  settingsIcon: {
    marginRight: 16,
  },
  settingsText: {
    fontSize: 18,
  },
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginTop: -globalStyles.header.height,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#e24e59",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
