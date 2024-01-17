import React, { useState } from "react";
import {
  View,
  Text,
  Image,
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

const ChatsListScreen = () => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={globalStyles.pageContainer}>
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

      <ScrollView style={ggg.contentContainer}>
        {/* When Chats Loading */}
        {isLoading ? (
          <>
            <View style={ggg.pageBodyContainer}>
              <ActivityIndicator size={"large"} color={"#E24E59"} />
            </View>
          </>
        ) : (
          <>
            <MessageCard />
          </>
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
