import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { globalStyles } from "../styles/globalStyles";

const ChatsListScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyles.header}>
      <View style={globalStyles.backButtonContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.titleContainer}>
        <Text style={globalStyles.title}>FriendFinder</Text>
      </View>
    </View>
  );
};

export default ChatsListScreen;
