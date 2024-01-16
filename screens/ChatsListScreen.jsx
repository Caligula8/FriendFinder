import React, { useState } from "react";
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
import { globalStyles } from "../styles/globalStyles";
import { useSelector } from "react-redux";

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <View style={globalStyles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>

        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Chats</Text>
        </View>
      </View>

      <ScrollView style={globalStyles.bodyContainer}>
        <Text style={globalStyles.title}>testing</Text>
        {isLoading ? (
          <>
            <View style={ggg.subBodyContainer}>
              <ActivityIndicator size={"large"} color={"#E24E59"} />
            </View>
          </>
        ) : (
          <>
            <MessageCard />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const MessageCard = () => {
  return (
    <View>
      <Text>Hi</Text>
    </View>
  );
};

const ggg = StyleSheet.create({
  subBodyContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: "#000",
    fontSize: 24,
    fontWeight: "bold",
    lineHeight: 28,
    marginLeft: 16,
    marginTop: 4,
  },
});

export default ChatsListScreen;
