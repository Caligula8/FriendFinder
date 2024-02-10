import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import NavBar from "../components/Navbar";
import { globalStyles } from "../styles/globalStyles";

const BrowseCategoriesScreen = () => {
  const navigation = useNavigation();
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
          <Text style={globalStyles.title}>Discover Categories</Text>
        </View>
      </View>
      {/* Content */}
      <ScrollView style={ggg.contentContainer}></ScrollView>

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

export default BrowseCategoriesScreen;
