import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import { globalStyles } from "../styles/globalStyles";
import { firebaseAuth } from "../config/firebase.config";
import { useSelector, useDispatch } from "react-redux";
import { SET_USER_NULL } from "../context/actions/userActions";

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
      //need to fix back button un-sign out
    });
    setSignOutModalVisible(false);
  };

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
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

      {/* Body */}
      <View style={globalStyles.contentContainer}>
        {/* Settings Items */}
        <TouchableOpacity
          style={ggg.settingsItem}
          onPress={() => navigateToPage("AccountManagement")}
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
          onPress={() => navigateToPage("Notifications")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="black"
            style={ggg.settingsIcon}
          />
          <Text style={ggg.settingsText}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ggg.settingsItem}
          onPress={() => navigateToPage("PreviousPosts")}
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
            name="ios-close-circle-outline"
            size={24}
            color="black"
            style={ggg.settingsIcon}
          />
          <Text style={ggg.settingsText}>Manage Blocked List</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ggg.settingsItem}
          onPress={() => navigateToPage("TermsOfService")}
        >
          <Ionicons
            name="file-tray-full-outline"
            size={24}
            color="black"
            style={ggg.settingsIcon}
          />
          <Text style={ggg.settingsText}>Terms of Service</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ggg.settingsItem}
          onPress={() => navigateToPage("PrivacyPolicy")}
        >
          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="black"
            style={ggg.settingsIcon}
          />
          <Text style={ggg.settingsText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ggg.settingsItem}
          onPress={() => navigateToPage("ContactSupport")}
        >
          <Ionicons
            name="help-buoy-outline"
            size={24}
            color="black"
            style={ggg.settingsIcon}
          />
          <Text style={ggg.settingsText}>Contact Support</Text>
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
      </View>

      {/* Sign Out Confirmation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isSignOutModalVisible}
        onRequestClose={() => setSignOutModalVisible(false)}
      >
        <View style={ggg.modalContainer}>
          <View style={ggg.modalContent}>
            <Text style={ggg.modalText}>
              Are you sure you want to sign out?
            </Text>
            <View style={ggg.modalButtons}>
              <TouchableOpacity
                style={ggg.modalButton}
                onPress={() => setSignOutModalVisible(false)}
              >
                <Text style={ggg.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={ggg.modalButton}
                onPress={() => handleSignOut()}
              >
                <Text style={ggg.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Footer & Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
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
