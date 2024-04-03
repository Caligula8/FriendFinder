import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firestoreDB } from "../config/firebase.config";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  writeBatch,
} from "firebase/firestore";

const MessagePromptModal = ({
  isVisible,
  onClose,
  recipientUsername,
  senderID,
  recipientID,
  senderName,
}) => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (isSending) return; // Prevent sending multiple messages if send is pressed repeatedly

    setErrorMessage("");
    setIsSending(true);

    // Check if the message is empty
    if (message.trim() === "") {
      setErrorMessage("Message cannot be empty");
      setIsSending(false);
      setTimeout(() => setErrorMessage(""), 2000);
      return;
    }

    // Reference to sender's and recipient's user_chats document
    const senderChatsRef = doc(
      firestoreDB,
      "users",
      senderID,
      "chats",
      "user_chats"
    );
    const recipientChatsRef = doc(
      firestoreDB,
      "users",
      recipientID,
      "chats",
      "user_chats"
    );

    try {
      // Fetch the sender's chat document to check for existing chats
      const senderChatsDoc = await getDoc(senderChatsRef);
      let chatExists = false;

      if (senderChatsDoc.exists()) {
        const chats = senderChatsDoc.data();
        // Look through chat metadata to see if a chat already exists
        chatExists = Object.keys(chats).some((key) => key === recipientID);
      }

      // If chat exists display error message
      if (chatExists) {
        setErrorMessage("You have already messaged this user");
        setIsSending(false);
        setTimeout(() => setErrorMessage(""), 2000);
        return;
      }

      // Define IDs and references for the chatroom and the initial message
      const chatroomDocId = `${senderID}_${recipientID}`;
      const chatroomRef = doc(firestoreDB, "chats", chatroomDocId);
      const unixTimestamp = Date.now();
      const dateIdentifier = new Date(unixTimestamp)
        .toISOString()
        .split("T")[0];
      const messageRef = doc(
        firestoreDB,
        "chats",
        chatroomDocId,
        "messages",
        dateIdentifier
      );

      // Prepare initial message data
      const messageData = {
        [`${unixTimestamp}_${senderID}`]: {
          content: message,
          senderID: senderID,
          timestamp: unixTimestamp,
        },
      };

      // Prepare chat metadata for the sender and recipient
      const senderChatMetadata = {
        chatroomID: chatroomRef.id,
        lastContent: message,
        lastSenderID: senderID,
        lastTimestamp: unixTimestamp,
        otherMemberName: recipientUsername,
        otherMemberRef: recipientChatsRef,
      };

      const recipientChatMetadata = {
        chatroomID: chatroomRef.id,
        lastContent: message,
        lastSenderID: senderID,
        lastTimestamp: unixTimestamp,
        otherMemberName: senderName,
        otherMemberRef: senderChatsRef,
      };

      // Start a batch to perform Firestore operations atomically
      const batch = writeBatch(firestoreDB);

      // Set the chatroom document
      batch.set(
        chatroomRef,
        { members: [senderID, recipientID] },
        { merge: true }
      );

      // Add the initial message to the chatroom
      batch.set(messageRef, messageData, { merge: true });

      // Update the user_chats document for both the sender and recipient
      batch.set(
        senderChatsRef,
        { [recipientID]: senderChatMetadata },
        { merge: true }
      );
      batch.set(
        recipientChatsRef,
        { [senderID]: recipientChatMetadata },
        { merge: true }
      );

      // Commit the batch operation
      await batch.commit();

      // Reset state and close modal after successful operation
      setMessage("");
      setIsSending(false);
      onClose();
    } catch (error) {
      // Handle any errors that occur during Firestore operations
      console.error("Error sending message: ", error);
      setErrorMessage("Failed to send message. Please try again later.");
      setIsSending(false);
      setTimeout(() => setErrorMessage(""), 2000);
    }
  };

  useEffect(() => {
    // Reset message state, sending status, and error message when modal visibility changes
    if (!isVisible) {
      setMessage("");
      setIsSending(false);
      setErrorMessage("");
    }
  }, [isVisible]);

  return (
    isVisible && (
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalText}>
                Send a Message to {recipientUsername}
              </Text>
              <View style={styles.inputAndSendContainer}>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.messageInput}
                    placeholder="Type your message..."
                    multiline
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    placeholderTextColor="#8D8D8D"
                  />
                </View>
                <TouchableOpacity
                  style={styles.sendButton}
                  onPress={handleSend}
                >
                  <MaterialCommunityIcons
                    name="send-circle-outline"
                    size={32}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
              {errorMessage !== "" && (
                <Text style={styles.errorMessage}>{errorMessage}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    )
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  modalContent: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputAndSendContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputContainer: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FDDBDD",
    backgroundColor: "white",
    paddingHorizontal: 10,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    elevation: 4,
  },
  messageInput: {
    flexGrow: 1,
    minHeight: 40,
    maxHeight: 160,
    paddingVertical: 8,
    color: "black",
  },
  sendButton: {
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 8,
    backgroundColor: "#e24e59",
  },
  errorMessage: {
    color: "#8D8D8D",
  },
});

export default MessagePromptModal;
