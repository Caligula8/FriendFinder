import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PostCard = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={ggg.postCardContainer}
      onPress={() => navigation.navigate("FullScreenPost")}
    >
      {/* Content */}
      <View style={ggg.postCardTextContent}>
        <Text style={ggg.postCardTitle} numberOfLines={1} ellipsizeMode="tail">
          The quick brown fox jumps over the lazy dog
        </Text>
      </View>

      {/* Time Text */}
      <Text style={ggg.postCardTimeStampText}>10/20/23</Text>
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
