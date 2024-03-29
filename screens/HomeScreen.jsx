import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import SuggestedProfile from "../components/SuggestedProfile";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";
import MessagePromptModal from "../components/MessagePromptModal";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const userLimit = 10; // Adjust as needed
  const userCollection = collection(firestoreDB, "users");
  const loggedInUser = useSelector((state) => state.user.user);

  const fetchSelectedUser = async (loggedInUserUID, currentSelectedUser) => {
    try {
      const selectedUserQuery = query(
        userCollection,
        orderBy("displayName"),
        limit(userLimit)
      );

      const querySnapshot = await getDocs(selectedUserQuery);
      const selectedUsers = querySnapshot.docs.map((doc) => ({
        uid: doc.id,
        displayName: doc.get("displayName"),
        hobbies: doc.get("hobbies"),
      }));

      // Filter out the logged-in user and the current selected user
      const filteredUsers = selectedUsers.filter(
        (user) =>
          user.uid !== loggedInUserUID &&
          user.displayName !== currentSelectedUser
      );

      if (filteredUsers.length === 0) {
        // Handle the case where there are no suitable users
        return null;
      }

      // Randomly select a user from the filtered users
      const randomIndex = Math.floor(Math.random() * filteredUsers.length);
      const newSelectedUser = filteredUsers[randomIndex];

      return newSelectedUser;
    } catch (error) {
      console.error("Error fetching selected user:", error);
      throw error;
    }
  };

  const fetchAndSetSelectedUser = async () => {
    try {
      setLoading(true);
      const newSelectedUser = await fetchSelectedUser(
        loggedInUser?._id, //causes (caught) error: [TypeError: Cannot read property '_id' of null]
        selectedUser
      );
      if (newSelectedUser !== null) {
        setLoading(false);
        setSelectedUser(() => newSelectedUser);
      } else {
        console.warn("No suitable users available");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error handling new user:", error);
      setLoading(false);
    }
  };

  const handlePressMessage = () => {
    setModalVisible(true);
  };

  const handleSend = async (messageData) => {
    try {
      console.log("Sending message to:", messageData.recipient);
      console.log("Message content:", messageData.message);

      await fetchAndSetSelectedUser();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    // Fetch the initial selected user when the component mounts
    fetchAndSetSelectedUser();
  }, []); // Empty dependency array = runs once when the component mounts

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Discover Profiles</Text>
        </View>
      </View>

      <View style={globalStyles.suggestedProfileContainer}>
        {selectedUser && (
          <SuggestedProfile
            displayName={selectedUser.displayName}
            hobbies={selectedUser.hobbies}
            onPressMessage={handlePressMessage}
            onPressNextUser={fetchAndSetSelectedUser}
            onPressProfile={() =>
              navigation.navigate("SelectedPublicProfile", {
                userID: selectedUser.uid,
              })
            }
            disabled={loading}
          />
        )}
      </View>

      <MessagePromptModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSend={handleSend}
        recipientUsername={selectedUser?.displayName || ""}
      />

      {/* Footer/Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

export default HomeScreen;
