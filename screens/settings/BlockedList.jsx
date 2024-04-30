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

const BlockedList = () => {
  const navigation = useNavigation();

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
          <Text style={globalStyles.title}>Blocked Users</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={ggg.contentContainer}
        contentContainerStyle={ggg.centerContent}
      >
        {/* This Text only shows if there are no blocked users */}
        <Text style={ggg.noUsersText}>No Blocked Users Yet</Text>
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
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noUsersText: {
    textAlign: "center",
    fontSize: 18,
    color: "gray",
  },
});

export default BlockedList;
