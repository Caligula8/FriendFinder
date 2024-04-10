import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/Navbar";
import HobbyButton from "../components/HobbyButton";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";

const MyPublicProfileScreen = () => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  const user = useSelector((state) => state.user.user);
  const displayName = user && user.displayName ? user.displayName : "Guest";
  const userHobbies = user && user.hobbies ? user.hobbies : [];
  const description = user && user.description ? user.description : null;
  const hasPrimaryHobbies =
    user && user.primaryHobbies && user.primaryHobbies.length > 0;

  const hobbyButtonLabels = [0, 1, 2].map((index) =>
    hasPrimaryHobbies
      ? user.primaryHobbies[index] || "Not Selected"
      : "Not Selected"
  );

  return (
    <View style={globalStyles.pageContainer}>
      <ScrollView style={ggg.contentContainer}>
        <View
          style={[ggg.profileHeaderContainer, { height: screenHeight * 0.18 }]}
        >
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

        {/* Profile Image */}
        {user.photoURL && (
          <View style={ggg.profileImageContainer}>
            <Image
              source={{ uri: user.photoURL }}
              style={{
                width: screenWidth * 0.5,
                height: screenWidth * 0.5,
                borderRadius: 16,
              }}
            />
          </View>
        )}

        {/* Content */}
        <View style={ggg.subContentContainer}>
          {/* About Me */}
          {description && (
            <View style={ggg.profileElementContainer}>
              <Text style={ggg.subTitle}>About Me</Text>
              <Text style={ggg.text}>{description}</Text>
            </View>
          )}

          {/* Primary Hobbies */}
          {hasPrimaryHobbies && (
            <View style={ggg.profileElementContainer}>
              <Text style={ggg.subTitle}>I'm Most Interested In</Text>

              <View style={ggg.primaryHobbiesContainer}>
                {hobbyButtonLabels.map(
                  (label, index) =>
                    label !== "Not Selected" && (
                      <View key={index} style={ggg.primaryHobby}>
                        <Text style={ggg.primaryHobbyText}>{label}</Text>
                      </View>
                    )
                )}
              </View>
            </View>
          )}

          {/* All Hobbies */}
          <View style={ggg.profileElementContainer}>
            <Text style={ggg.subTitle}>
              {hasPrimaryHobbies ? "But I Also Like" : "My Hobbies"}
            </Text>
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
    position: "relative",
    alignItems: "center",
    // borderColor: "green",
    // borderWidth: 1,
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
    bottom: 8,
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
  primaryHobbiesContainer: {
    width: "100%",
    flexDirection: "column",
  },
  primaryHobby: {
    height: 64,
    width: "100%",
    borderWidth: 2.5,
    borderRadius: 10,
    borderColor: "#fddbdd",
    padding: 10,
    marginTop: 16,
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
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 6,
    marginBottom: 6,
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 14,
  },
});

export default MyPublicProfileScreen;
