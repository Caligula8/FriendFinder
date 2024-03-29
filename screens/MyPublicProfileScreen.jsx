import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NavBar from "../components/Navbar";
import HobbyButton from "../components/HobbyButton";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";

const MyPublicProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);

  const displayName = user && user.displayName ? user.displayName : "Guest";
  const userHobbies = user && user.hobbies ? user.hobbies : [];
  const description =
    user && user.description ? user.description : "No description available";
  const hobbyButtonLabels = [0, 1, 2].map((index) =>
    user && user.primaryHobbies
      ? user.primaryHobbies[index] || "Not Selected"
      : "Not Selected"
  );

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <ScrollView style={ggg.contentContainer}>
        <View style={ggg.profileHeaderContainer}>
          {/* Back Button */}
          <TouchableOpacity
            style={ggg.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
          {/* Title */}
          <Text style={ggg.profileTitle}>Hi, I'm {displayName}</Text>
        </View>
        {/* Content */}
        <View style={ggg.subContentContainer}>
          {/* About Me */}
          {/* Hide if no description */}
          <View style={ggg.profileElementContainer}>
            <Text style={ggg.subTitle}>About Me</Text>
            <Text style={ggg.text}>{description}</Text>
          </View>
          {/* Primary Hobbies */}
          {/* Need to hide if no primary hobbies */}
          <View style={ggg.profileElementContainer}>
            <Text style={ggg.subTitle}>Im Most Interested In</Text>
            <View style={ggg.primaryHobbiesContainer}>
              {hobbyButtonLabels.map((label, index) => (
                <View key={index} style={ggg.primaryHobby}>
                  <Text style={ggg.primaryHobbyText}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
          {/* All Hobbies */}
          <View style={ggg.profileElementContainer}>
            <Text style={ggg.subTitle}>But I Also Like</Text>
            <View style={ggg.hobbiesContainer}>
              {userHobbies.map((hobby, index) => (
                <HobbyButton key={index} HobbyName={hobby} />
              ))}
            </View>
          </View>
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
    flex: 1,
  },
  subContentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  profileHeaderContainer: {
    width: "100%",
    height: 110,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  profileElementContainer: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    marginTop: 14,
    marginBottom: 14,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#080808",
    position: "absolute",
    top: 65,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#080808",
  },
  text: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#8D8D8D",
  },
  backButton: {
    position: "absolute",
    top: 35,
    left: 16,
  },
  optionsButton: {
    position: "absolute",
    top: 35,
    right: 16,
  },
  primaryHobbiesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  primaryHobby: {
    flex: 1,
    height: 64,
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "rgba(203, 31, 44, 0.7)",
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 5,
  },
  primaryHobbyText: {
    color: "#8D8D8D",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  hobbiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
    //borderColor: "green",
    //borderWidth: 1,
  },
});

export default MyPublicProfileScreen;
