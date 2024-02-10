import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import HobbyButton from "../components/HobbyButton";
import MessagePromptModal from "../components/MessagePromptModal";
import ThreeDotsMenu from "../components/ThreeDotsMenu";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles } from "../styles/globalStyles";
import { getDoc, doc } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const SelectedPublicProfile = ({ route }) => {
  const { userID } = route.params;
  const [selectedUser, setSelectedUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchSelectedUserData = async () => {
      try {
        const userDoc = await getDoc(doc(firestoreDB, "users", userID));
        if (userDoc.exists()) {
          setSelectedUser(userDoc.data());
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userID) {
      fetchSelectedUserData();
    }
  }, [userID]);

  const displayName = selectedUser?.displayName || "Guest";
  const userHobbies = selectedUser?.hobbies || [];

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);

  const onBackdropPress = () => {
    setMenuOpen(false);
  };

  const onOptionSelect = (value) => {
    // Handle option select logic here
    console.log("Selected option:", value);
    setMenuOpen(false);
  };

  const onTriggerPress = () => {
    setMenuOpen(true);
  };

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
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
            {/* Options Button */}
            {/* <TouchableOpacity
            style={ggg.optionsButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={32}
              color="black"
            />
          </TouchableOpacity> */}
            <ThreeDotsMenu
              isOpen={isMenuOpen}
              onBackdropPress={onBackdropPress}
              onOptionSelect={onOptionSelect}
              onTriggerPress={onTriggerPress}
            />
            <Text style={ggg.profileTitle}>Hi, I'm {displayName}</Text>
          </View>
          {/* Content */}
          <View style={ggg.subContentContainer}>
            {/* About Me */}
            <View style={ggg.profileElementContainer}>
              <Text style={ggg.subTitle}>About Me</Text>
              <Text style={ggg.text}>
                {selectedUser?.description || "No information available"}
              </Text>
            </View>
            {/* Primary Hobbies */}
            <View style={ggg.profileElementContainer}>
              <Text style={ggg.subTitle}>I'm Most Interested In</Text>
              <View style={ggg.primaryHobbiesContainer}>
                <View style={ggg.primaryHobby}>
                  <Text style={ggg.primaryHobbyText}>Hobby 1</Text>
                </View>
                <View style={ggg.primaryHobby}>
                  <Text style={ggg.primaryHobbyText}>Hobby 2</Text>
                </View>
                <View style={ggg.primaryHobby}>
                  <Text style={ggg.primaryHobbyText}>Hobby 3</Text>
                </View>
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

        <TouchableOpacity
          style={ggg.openChatPromptButton}
          onPress={toggleModal}
        >
          <Ionicons name="chatbubbles-outline" size={32} color="white" />
        </TouchableOpacity>

        <MessagePromptModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          onSend={(messageData) => {
            // Add logic for sending the message
            console.log("Sending message to:", messageData.recipient);
            console.log("Message content:", messageData.message);
          }}
          recipientUsername="Username" // Replace with recipient
        />

        {/* Footer & Navbar */}
        <View style={globalStyles.footer}>
          <NavBar />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  },
  openChatPromptButton: {
    position: "absolute",
    bottom: 85,
    right: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#74A253",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SelectedPublicProfile;
