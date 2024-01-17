import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  const navigateToPage = (route) => {
    navigation.navigate(route);
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
  },
  settingsIcon: {
    marginRight: 16,
  },
  settingsText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
