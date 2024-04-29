import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../../components/Navbar";
import { globalStyles } from "../../styles/globalStyles";
import ContinueButton from "../../components/ContinueButton";

const AcctManagement = () => {
  const navigation = useNavigation();

  const handleReSelectHobbies = () => {
    console.log("1");
  };

  const handleViewPublicProfile = () => {
    console.log("2");
  };

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <View style={globalStyles.header}>
        {/* Back Button */}
        <View style={globalStyles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* Header Title */}
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.titleBlk}>Account Management</Text>
        </View>
      </View>
      {/* Content */}
      <ScrollView style={ggg.contentContainer}>
        {/* Buttons */}
        <View style={ggg.buttonContainer}>
          <ContinueButton
            onPress={handleViewPublicProfile}
            buttonText="Delete Account"
            transparency={0.7}
          />
          <ContinueButton
            onPress={handleViewPublicProfile}
            buttonText="Sign out"
            transparency={0.7}
          />
        </View>
      </ScrollView>

      {/* Footer & Navbar */}
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
  pageBodyContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    // marginBottom: 20,
    // position: "absolute",
    // bottom: 0,
  },
});

export default AcctManagement;
