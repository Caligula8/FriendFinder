import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { Ionicons } from "@expo/vector-icons";
import ContinueButton from "../components/ContinueButton";
import NavBar from "../components/Navbar";
import { useSelector } from "react-redux";

const MyProfileScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const [aboutMeText, setAboutMeText] = useState("");

  const handleSettingsRedirect = () => {
    navigation.navigate("Settings");
  };

  const handleSelectHobbies = () => {
    //navigation.navigate("Register3");
  };

  const handleViewPublicProfile = () => {
    //navigation.navigate("Register3");
  };

  // Check if the profile image exists
  const hasProfileImage =
    user?.profilePic !== undefined && user?.profilePic !== null;

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>FriendFinder</Text>
        </View>
        <TouchableOpacity
          style={globalStyles.headerIconContainerRight}
          onPress={handleSettingsRedirect}
        >
          <Ionicons name="settings-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* Body */}
      <View style={globalStyles.contentContainer}>
        {/* Profile Image */}
        <View style={ggg.profileImageContainer}>
          {hasProfileImage ? (
            <Image
              source={{ uri: user?.profilePic }}
              style={ggg.profileImage}
              resizeMode="cover"
            />
          ) : (
            <View style={ggg.profileImage}>
              <Ionicons name="person" size={110} color="grey" />
            </View>
          )}
        </View>

        {/* Profile Options */}
        <View style={globalStyles.subContentContainer}>
          {/* Profile Description */}
          <Text style={globalStyles.subTitle}>About Me</Text>
          <TextInput
            style={ggg.textInput}
            placeholder="Write about yourself..."
            multiline
            value={aboutMeText}
            onChangeText={(text) => setAboutMeText(text)}
          />
          {/* Primary Hobbies */}
          <Text style={globalStyles.subTitle}>Primary Hobbies</Text>
          <View style={ggg.hobbiesButtonContainer}>
            <TouchableOpacity style={ggg.hobbiesButton}>
              <Text style={ggg.hobbiesButtonText}>Hobby 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ggg.hobbiesButton}>
              <Text style={ggg.hobbiesButtonText}>Hobby 2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ggg.hobbiesButton}>
              <Text style={ggg.hobbiesButtonText}>Hobby 3</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}
        <View style={ggg.buttonContainer}>
          <ContinueButton
            onPress={handleSelectHobbies}
            buttonText="Select Hobbies"
            transparency={0.7}
          />
          <ContinueButton
            onPress={handleViewPublicProfile}
            buttonText="View Public Profile"
            transparency={0.7}
          />
        </View>
      </View>
      {/* Footer/Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

const ggg = StyleSheet.create({
  profileImageContainer: {
    alignItems: "center",
    paddingTop: 18,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 16,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d3d3d3",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
    position: "absolute",
    bottom: 0,
  },
  textInput: {
    width: "100%",
    height: 64,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginVertical: 10,
  },
  hobbiesButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  hobbiesButton: {
    flex: 1,
    height: 64,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  hobbiesButtonText: {
    color: "#8D8D8D",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default MyProfileScreen;
