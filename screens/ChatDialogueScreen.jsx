import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { doc, collection, writeBatch, onSnapshot } from "firebase/firestore";

import { firestoreDB } from "../config/firebase.config";

const ChatDialogueScreen = ({ route }) => {
  const navigation = useNavigation();
  const { chatroomId, otherMemberID, otherMemberName } = route.params;
  const currentUserID = useSelector((state) => state.user.user._id);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onSnapshot(
      collection(firestoreDB, "chats", chatroomId, "messages"),
      (querySnapshot) => {
        let allMessages = [];
        querySnapshot.forEach((docSnapshot) => {
          const dateMessages = docSnapshot.data();
          const dateMessagesArray = Object.entries(dateMessages).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );
          allMessages = allMessages.concat(dateMessagesArray);
        });

        allMessages.sort((a, b) => a.timestamp - b.timestamp);
        setMessages(allMessages);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chatroomId]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      console.log("Message cannot be empty"); //needs location for error message
      return;
    }

    const unixTimestamp = Date.now();
    const dateIdentifier = new Date(unixTimestamp).toISOString().split("T")[0];

    const messageDocRef = doc(
      firestoreDB,
      "chats",
      chatroomId,
      "messages",
      dateIdentifier
    );
    const currentUserChatsRef = doc(
      firestoreDB,
      "users",
      currentUserID,
      "chats",
      "user_chats"
    );
    const otherUserChatsRef = doc(
      firestoreDB,
      "users",
      otherMemberID,
      "chats",
      "user_chats"
    );

    const batch = writeBatch(firestoreDB);

    try {
      // Construct the new message object
      const newMessage = {
        content: message,
        senderID: currentUserID,
        timestamp: unixTimestamp,
      };

      // Set the new message
      batch.set(
        messageDocRef,
        { [`${unixTimestamp}_${currentUserID}`]: newMessage },
        { merge: true }
      );

      // Update the last message metadata for both users
      const metadataUpdate = {
        lastContent: message,
        lastSenderID: currentUserID,
        lastTimestamp: unixTimestamp,
      };

      // Update the user_chats document for the current user
      batch.update(currentUserChatsRef, {
        [`${chatroomId}.lastContent`]: message,
        [`${chatroomId}.lastSenderID`]: currentUserID,
        [`${chatroomId}.lastTimestamp`]: unixTimestamp,
      });

      // Update the user_chats document for the other user
      batch.update(otherUserChatsRef, {
        [`${chatroomId}.lastContent`]: message,
        [`${chatroomId}.lastSenderID`]: currentUserID,
        [`${chatroomId}.lastTimestamp`]: unixTimestamp,
      });

      // Commit the batch
      await batch.commit();

      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const elapsedTime = now - messageDate;

    // Helper function to format single digits with leading zero
    const zeroPad = (num) => String(num).padStart(2, "0");

    // Time formatting
    let hours = messageDate.getHours();
    const minutes = zeroPad(messageDate.getMinutes());
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours || 12; // the hour '0' should be '12'
    const timeString = `${hours}:${minutes} ${ampm}`;

    // Date formatting
    const daysDifference = (now - messageDate) / (1000 * 3600 * 24);
    if (elapsedTime < 60 * 1000) {
      return "Just Now";
    } else if (
      elapsedTime < 24 * 60 * 60 * 1000 &&
      messageDate.getDate() === now.getDate()
    ) {
      return timeString;
    } else if (daysDifference < 7) {
      const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const weekday = weekdays[messageDate.getDay()];
      return `${weekday} at ${timeString}`;
    } else {
      const year =
        messageDate.getFullYear() === now.getFullYear()
          ? ""
          : `/${messageDate.getFullYear().toString().substr(-2)}`;
      const date =
        zeroPad(messageDate.getMonth() + 1) +
        "/" +
        zeroPad(messageDate.getDate());
      return `${date}${year} at ${timeString}`;
    }
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
          {isLoading ? <></> : <Text style={ggg.title}>{otherMemberName}</Text>}
        </View>
      </View>
      {/* Content */}
      {isLoading ? (
        <View style={ggg.centeredContent}>
          <ActivityIndicator size="large" color="#E24E59" />
        </View>
      ) : (
        <ScrollView style={ggg.contentContainer}>
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                ggg.messageContainer,
                msg.senderID === currentUserID
                  ? ggg.messageContainerRight
                  : ggg.messageContainerLeft,
              ]}
            >
              <Text style={ggg.messageTimestamp}>
                {formatTimestamp(msg.timestamp)}
              </Text>
              <View
                style={[
                  ggg.messageBubble,
                  msg.senderID === currentUserID
                    ? ggg.messageBubbleRight
                    : ggg.messageBubbleLeft,
                ]}
              >
                <Text style={ggg.messageText}>{msg.content}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
      {/* Message Input Area */}
      {!isLoading && (
        <View style={ggg.inputAndSendContainer}>
          <View style={ggg.inputContainer}>
            <TextInput
              style={ggg.messageInput}
              placeholder="Type your message..."
              multiline
              value={message}
              onChangeText={setMessage}
              placeholderTextColor="#8D8D8D"
            />
          </View>
          <TouchableOpacity style={ggg.sendButton} onPress={handleSendMessage}>
            <MaterialCommunityIcons
              name="send-circle-outline"
              size={32}
              color="white"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const ggg = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: "#FFF9F0",
  },
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  inputAndSendContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },
  inputContainer: {
    flex: 1,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 12,
  },
  messageInput: {
    minHeight: 48,
    maxHeight: 120,
  },
  sendButton: {
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    width: 42,
    borderRadius: 12,
    backgroundColor: "#e24e59",
  },
  pageBodyContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  messageContainer: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: 4,
    // paddingVertical: 4,
    // paddingHorizontal: 8,
  },
  messageContainerRight: {
    alignItems: "flex-end",
  },
  messageContainerLeft: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    borderRadius: 16,
    padding: 8,
    //marginVertical: 4,
  },
  messageBubbleRight: {
    backgroundColor: "#40413e",
    alignSelf: "flex-end",
  },
  messageBubbleLeft: {
    backgroundColor: "#e24e59",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#ccc",
  },
  messageTimestamp: {
    alignSelf: "center",
    fontSize: 12,
    marginBottom: 4,
  },
});

export default ChatDialogueScreen;
