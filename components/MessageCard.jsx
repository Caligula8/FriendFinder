import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

const getTimeElapsed = (timestamp) => {
  const now = new Date();
  const dateOfTimestamp = new Date(timestamp);
  const elapsed = now - dateOfTimestamp; // time elapsed in milliseconds

  // convert milliseconds to minutes, hours, and days
  const minutes = Math.floor(elapsed / (1000 * 60));
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));

  if (minutes < 1) {
    return "Just now";
  } else if (hours < 1) {
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  } else if (days < 1) {
    return `${hours} hour${hours > 1 ? "s" : ""}`;
  } else {
    // Format the date depending on whether it's from the current year or a previous year
    const timestampYear = dateOfTimestamp.getFullYear();
    const currentYear = now.getFullYear();

    let dateFormat = "";
    if (currentYear === timestampYear) {
      // Format as mm/dd if it's the current year
      dateFormat = `${
        dateOfTimestamp.getMonth() + 1
      }/${dateOfTimestamp.getDate()}`;
    } else {
      // Format as mm/dd/yy if it's from a previous year
      dateFormat = `${
        dateOfTimestamp.getMonth() + 1
      }/${dateOfTimestamp.getDate()}/${String(timestampYear).slice(2)}`;
    }

    return dateFormat;
  }
};

const MessageCard = ({ lastMessageContent, timestamp, otherUser }) => {
  const elapsed = getTimeElapsed(timestamp);

  return (
    <TouchableOpacity style={ggg.messageCardContainer}>
      {/* Profile Picture */}
      <View style={ggg.messageCardProfileImageContainer}>
        {otherUser.photoURL ? (
          <Image
            source={{ uri: otherUser.photoURL }}
            style={ggg.messageCardProfileImage}
            resizeMode="cover"
          />
        ) : (
          <FontAwesome5 name="users" size={24} color="#555" />
        )}
      </View>
      {/* Content */}
      <View style={ggg.messageCardTextContent}>
        <Text style={ggg.messageCardTitle}>{otherUser.displayName}</Text>
        <Text
          style={ggg.messageCardText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {lastMessageContent}
        </Text>
      </View>

      {/* Time Elapsed */}
      <Text style={ggg.messageCardTimeStampText}>{elapsed}</Text>
    </TouchableOpacity>
  );
};

const ggg = StyleSheet.create({
  messageCardContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 8,
  },
  messageCardProfileImageContainer: {
    width: 32,
    height: 32,
    borderRadius: 9999,
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  messageCardProfileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 9999,
  },
  messageCardTextContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 16,
  },
  messageCardTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  messageCardText: {
    color: "#8D8D8D",
    fontSize: 14,
    fontWeight: "400",
  },
  messageCardTimeStampText: {
    color: "#8D8D8D",
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    fontWeight: "400",
  },
});

export default MessageCard;
