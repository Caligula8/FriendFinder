import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB, firebaseAuth } from "../config/firebase.config";
/*import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector } from "react-redux";*/

const TestScreen = () => {
  const navigation = useNavigation();
  const [userUIDs, setUserUIDs] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchUserIDs = async () => {
      const querySnapshot = await getDocs(collection(firestoreDB, "users"));
      const uids = querySnapshot.docs.map((doc) => doc.id);
      setUserUIDs(uids);
    };

    fetchUserIDs();
  }, []);

  const createNewChat = async () => {
    if (selectedUser && user) {
      console.log("user.id:", user._id);
      console.log("selectedUser:", selectedUser);
      console.log("selectedUserEmail:", selectedUser);

      const chatMembers = {
        [user._id]: true,
        [selectedUser]: true,
      };

      // Create a unique chat ID
      const chatID = `${user._id}_${selectedUser}`;

      // Add a new document to the chats collection
      const chatDocRef = await setDoc(doc(firestoreDB, "chats", chatID), {
        members: chatMembers,
        createdAt: serverTimestamp(),
      });

      // Add chat reference to both users
      const userChatRef = doc(firestoreDB, "users", user._id);
      const selectedUserChatRef = doc(firestoreDB, "users", selectedUser);

      await updateDoc(userChatRef, {
        chats: {
          [selectedUser]: chatID,
        },
      });

      await updateDoc(selectedUserChatRef, {
        chats: {
          [user._id]: chatID,
        },
      });

      navigation.replace("Chats");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        {userUIDs.map((uid, index) => (
          <TouchableOpacity
            key={index}
            style={styles.userContainer}
            onPress={() => setSelectedUser(uid)}
          >
            <Text style={styles.usersName}>{uid}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer & Navbar */}
      <View style={styles.footer}>
        <NavBar />
      </View>

      {/* Message Input Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedUser !== null}
        onRequestClose={() => setSelectedUser(null)}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1}
          onPress={() => setSelectedUser(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                Send a message to {selectedUser}
              </Text>
              <TextInput
                style={styles.messageInput}
                onChangeText={(text) => setMessage(text)}
                value={message}
                placeholder="Type your message here"
              />
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  createNewChat();
                  setSelectedUser(null); // Reset selected user
                  setMessage(""); // Clear the message input
                }}
              >
                <Text style={styles.modalButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  footer: {
    width: "100%",
  },
  userContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  usersName: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
    marginLeft: 16,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  messageInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "100%",
  },
  modalButton: {
    padding: 10,
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

export default TestScreen;
