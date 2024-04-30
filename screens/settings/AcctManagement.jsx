import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../../components/Navbar";
import { globalStyles } from "../../styles/globalStyles";
import ContinueButton from "../../components/ContinueButton";
import { useDispatch } from "react-redux";
import { SET_USER_NULL } from "../../context/actions/userActions";
import { firebaseAuth } from "../../config/firebase.config";

const ConfirmationModal = ({ onCancel, onConfirm, text }) => (
  <TouchableWithoutFeedback onPress={onCancel}>
    <View style={ggg.modalContainer}>
      <View style={ggg.modalContent}>
        <Text style={ggg.modalText}>{text}</Text>
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

const AcctManagement = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch(); // For Redux
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [isSignOutModalVisible, setSignOutModalVisible] = useState(false);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDeleteAccount = async () => {
    const user = firebaseAuth.currentUser;
    await user
      .delete()
      .then(() => {
        dispatch(SET_USER_NULL()); // Clear user data in Redux
        navigation.replace("Welcome");
      })
      .catch((error) => {
        console.error("Failed to delete user account:", error);
      });
    setDeleteModalVisible(false);
  };

  const handleSignOut = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigation.replace("Welcome");
    });
    setSignOutModalVisible(false);
  };

  const handleToggleNotifications = (newValue) => {
    setNotificationsEnabled(newValue);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.header}>
        <View style={globalStyles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.titleBlk}>Account Management</Text>
        </View>
      </View>
      <ScrollView style={ggg.contentContainer}>
        <View style={ggg.toggleContainer}>
          <Text style={ggg.toggleLabel}>Toggle Notifications</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#767577" }}
            thumbColor={notificationsEnabled ? "#e24e58" : "#e24e58"}
            onValueChange={handleToggleNotifications}
            value={notificationsEnabled}
          />
        </View>
        <View style={ggg.buttonContainer}>
          <ContinueButton
            onPress={() => setSignOutModalVisible(true)}
            buttonText="Sign out"
            transparency={0.7}
          />
          <ContinueButton
            onPress={() => setDeleteModalVisible(true)}
            buttonText="Delete Account"
            transparency={0.7}
          />
        </View>
      </ScrollView>
      {isSignOutModalVisible && (
        <ConfirmationModal
          onCancel={() => setSignOutModalVisible(false)}
          onConfirm={handleSignOut}
          text="Are you sure you want to sign out?"
        />
      )}
      {isDeleteModalVisible && (
        <ConfirmationModal
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={handleDeleteAccount}
          text="Are you sure you want to delete your account?"
        />
      )}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

const ggg = StyleSheet.create({
  contentContainer: {
    width: "100%",
    padding: 12,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
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

export default AcctManagement;
