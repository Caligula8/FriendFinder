import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
  const [chats, setChats] = useState([]);

  useLayoutEffect(() => {
    setIsLoading(true);

    const chatsRef = doc(firestoreDB, "users", user._id, "chats", "user_chats");

    const unsubscribe = onSnapshot(
      chatsRef,
      async (docSnap) => {
        if (docSnap.exists()) {
          const chatData = docSnap.data();
          // Map through the chats to fetch other user's photoURL from their profile
          const chatPromises = Object.entries(chatData).map(
            async ([chatId, metadata]) => {
              let otherUserPhotoURL = null;

              // Fetch the other user's photoURL using otherMemberID
              const otherUserProfileRef = doc(
                firestoreDB,
                "users",
                metadata.otherMemberID
              );
              const otherUserProfileSnap = await getDoc(otherUserProfileRef);
              if (otherUserProfileSnap.exists()) {
                otherUserPhotoURL = otherUserProfileSnap.data().photoURL;
              }

              return {
                chatroomId: chatId,
                lastMessage: {
                  content: metadata.lastContent || "No messages yet",
                  timestamp: metadata.lastTimestamp
                    ? new Date(metadata.lastTimestamp).toISOString()
                    : "No date available",
                },
                otherUser: {
                  id: metadata.otherMemberID,
                  displayName: metadata.otherMemberName,
                  photoURL: otherUserPhotoURL,
                },
              };
            }
          );

          // Resolve all the chat promises and sort them by the timestamp
          const resolvedChats = (await Promise.all(chatPromises)).sort(
            (a, b) =>
              new Date(b.lastMessage.timestamp) -
              new Date(a.lastMessage.timestamp)
          );

          setChats(resolvedChats);
          setIsLoading(false);
        } else {
          // No chats found, set empty array and remove loading state
          setChats([]);
          setIsLoading(false);
        }
      },
      (error) => {
        console.error("Failed to subscribe to chat updates", error);
        setIsLoading(false);
      }
    );

    // Cleanup the subscription on unmount
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
        ) : chats.length === 0 ? (
          <View style={ggg.centeredMessageContainer}>
            <Text style={ggg.centeredMessageText}>No Chats Yet</Text>
          </View>
        ) : (
          chats.map((room) => (
            <MessageCard
              key={room.chatroomId}
              room={room}
              chatroomId={room.chatroomId}
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
  centeredMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  centeredMessageText: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default ChatsListScreen;
