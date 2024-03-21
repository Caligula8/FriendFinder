import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const month = date.getMonth() + 1; // +1 because getMonth() returns 0 for January
  const day = date.getDate();
  const year = date.getFullYear();
  const currentYear = new Date().getFullYear();

  // Format the year as yy
  const yearFormatted = year.toString().substr(-2);

  // Include the year in the format only if it's not the current year
  if (year === currentYear) {
    return `${month}/${day}`;
  } else {
    return `${month}/${day}/${yearFormatted}`;
  }
};

const PostCard = ({ title, timestamp, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={ggg.postCardContainer} onPress={onPress}>
      {/* Content */}
      <View style={ggg.postCardTextContent}>
        <Text style={ggg.postCardTitle} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>

      {/* Time Text */}
      <Text style={ggg.postCardTimeStampText}>{formatDate(timestamp)}</Text>
    </TouchableOpacity>
  );
};

const ggg = StyleSheet.create({
  postCardContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 16,
    borderColor: "#F3F3F3",
    borderWidth: 1,
  },
  postCardTextContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginLeft: 16,
  },
  postCardTitle: {
    color: "#333",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  postCardTimeStampText: {
    color: "#8D8D8D",
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    fontWeight: "400",
  },
});
export default PostCard;
