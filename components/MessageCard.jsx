import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

const MessageCard = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <TouchableOpacity style={ggg.messageCardContainer}>
      {/* Profile Pic */}
      <View style={ggg.messageCardProfileImageContainer}>
        {/* <Image
          source={{ uri: user?.profilePic }}
          style={ggg.messageCardProfileImage}
          resizeMode="cover"
        /> */}
        <FontAwesome5 name="users" size={24} color="#555" />
      </View>
      {/* Content */}
      <View style={ggg.messageCardTextContent}>
        <Text style={ggg.messageCardTitle}>Message Title</Text>

        <Text
          style={ggg.messageCardText}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          Lorem ipsum dolor sit amet consec tetur adipis adip isicing icing elit
          Lorem ipsum dolor sit amet consec tetur adipis adip isicing icing elit
        </Text>
      </View>

      {/* Time Text */}
      <Text style={ggg.messageCardTimeStampText}>27 min</Text>
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
