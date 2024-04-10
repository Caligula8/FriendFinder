import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
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
import { useSelector } from "react-redux";

const SelectedPublicProfile = ({ route }) => {
  const { userID } = route.params;
  const [selectedUser, setSelectedUser] = useState(null);
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

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

    fetchSelectedUserData();
  }, [userID]);

  const senderID = useSelector((state) => state.user.user._id);
  const senderName = useSelector((state) => state.user.user.displayName);

  const displayName =
    selectedUser && selectedUser.displayName
      ? selectedUser.displayName
      : "Guest";
  const userHobbies =
    selectedUser && selectedUser.hobbies ? selectedUser.hobbies : [];
  const description =
    selectedUser && selectedUser.description ? selectedUser.description : null;
  const hasPrimaryHobbies =
    selectedUser &&
    selectedUser.primaryHobbies &&
    selectedUser.primaryHobbies.length > 0;

  const hobbyButtonLabels = [0, 1, 2].map((index) =>
    hasPrimaryHobbies
      ? selectedUser.primaryHobbies[index] || "Not Selected"
      : "Not Selected"
  );

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isMenuOpen, setMenuOpen] = useState(false);
  const [iconLayout, setIconLayout] = useState(null);
  const iconRef = useRef(null);

  const onBackdropPress = () => {
    setMenuOpen(false);
  };

  const onOptionSelect = (value) => {
    console.log("Selected option:", value);
    setMenuOpen(false);
  };

  const onTriggerPress = () => {
    if (iconRef.current) {
      iconRef.current.measure((x, y, width, height, pageX, pageY) => {
        setIconLayout({ x: pageX, y: pageY, width, height });
      });
    }
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSend = (messageData) => {
    console.log("Sending message to:", messageData.recipient);
    console.log("Message content:", messageData.message);
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={onBackdropPress}>
      <View style={globalStyles.pageContainer}>
        <ScrollView style={ggg.contentContainer}>
          <View
            style={[
              ggg.profileHeaderContainer,
              { height: screenHeight * 0.18 },
            ]}
          >
            <TouchableOpacity
              style={ggg.backButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back-outline" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              ref={iconRef}
              onPress={onTriggerPress}
              style={ggg.optionsButton}
            >
              <MaterialCommunityIcons
                name="dots-vertical"
                size={32}
                color="black"
              />
            </TouchableOpacity>
            {isMenuOpen && (
              <ThreeDotsMenu
                isVisible={isMenuOpen}
                onOptionSelect={onOptionSelect}
                iconLayout={iconLayout}
                closeMenu={closeMenu}
              />
            )}
            <Text style={ggg.profileTitle}>Hi, I'm {displayName}</Text>
          </View>
          {selectedUser?.photoURL && (
            <View style={ggg.profileImageContainer}>
              <Image
                source={{ uri: selectedUser.photoURL }}
                style={{
                  width: screenWidth * 0.5,
                  height: screenWidth * 0.5,
                  borderRadius: 16,
                }}
              />
            </View>
          )}
          <View style={ggg.subContentContainer}>
            {description && (
              <View style={ggg.profileElementContainer}>
                <Text style={ggg.subTitle}>About Me</Text>
                <Text style={ggg.text}>{description}</Text>
              </View>
            )}
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
        <TouchableOpacity
          style={ggg.openChatPromptButton}
          onPress={toggleModal}
        >
          <Ionicons name="chatbubbles-outline" size={32} color="white" />
        </TouchableOpacity>
        <MessagePromptModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          onSend={handleSend}
          recipientUsername={displayName}
          senderID={senderID}
          recipientID={userID}
          senderName={senderName}
        />
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
    position: "relative",
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
  optionsButton: {
    position: "absolute",
    top: 35,
    right: 16,
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
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    zIndex: 1,
  },
});

export default SelectedPublicProfile;
