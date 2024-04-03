import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../components/Navbar";
import MessageCard from "../components/MessageCard";
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../config/firebase.config";

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [chats, setChats] = useState(null);

  useLayoutEffect(() => {
    setIsLoading(true);

    const chatsRef = doc(firestoreDB, "users", user._id, "chats", "user_chats");

    // Subscribe to the document for real-time updates
    const unsubscribe = onSnapshot(
      chatsRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          const chatPromises = Object.entries(chatData).map(
            async ([chatId, metadata]) => {
              try {
                const otherUserDoc = await getDoc(metadata.otherMemberRef);
                const otherUserData = otherUserDoc.exists()
                  ? otherUserDoc.data()
                  : {};
                const lastMessage = metadata.lastContent || "No messages yet";
                const timestamp = metadata.lastTimestamp
                  ? new Date(metadata.lastTimestamp).toISOString()
                  : "No date available";

                return {
                  chatroomId: chatId,
                  lastMessage: {
                    content: lastMessage,
                    timestamp: timestamp,
                  },
                  otherUser: {
                    ...otherUserData,
                    id: otherUserDoc.id,
                  },
                };
              } catch (error) {
                console.error(
                  `Error fetching other user data for chat ${chatId}:`,
                  error
                );
                // Return a fallback structure if the document fetch fails
                return {
                  chatroomId: chatId,
                  lastMessage: {
                    content: "No messages yet",
                    timestamp: "No date available",
                  },
                  otherUser: {
                    id: "Information could not be retrieved",
                    displayName: metadata.otherMemberName,
                    photoURL: null,
                  },
                };
              }
            }
          );

          const resolvedChats = await Promise.all(chatPromises);
          resolvedChats.sort(
            (a, b) =>
              new Date(b.lastMessage.timestamp) -
              new Date(a.lastMessage.timestamp)
          );
          setChats(resolvedChats);
          setIsLoading(false);
        } else {
          // Handle the case where the document does not exist
          setIsLoading(false);
          setChats([]); // Assuming an empty array is appropriate when there are no chats
        }
      },
      (error) => {
        console.error("Failed to subscribe to chat updates", error);
        setIsLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user._id]);

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Chats</Text>
        </View>
      </View>

      <ScrollView style={ggg.contentContainer}>
        {isLoading ? (
          <View style={ggg.pageBodyContainer}>
            <ActivityIndicator size={"large"} color={"#E24E59"} />
          </View>
        ) : (
          chats?.map((room) => (
            <MessageCard
              key={room.chatroomId}
              room={room}
              otherUser={room.otherUser}
              lastMessageContent={
                room.lastMessage?.content || "No messages yet"
              }
              timestamp={room.lastMessage?.timestamp}
            />
          ))
        )}
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
  pageBodyContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default ChatsListScreen;
