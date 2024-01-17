import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { globalStyles } from "../styles/globalStyles";
import NavBar from "../components/Navbar";
import { SuggestedProfile } from "../components";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Discover Profiles</Text>
        </View>
      </View>

      <View style={globalStyles.suggestedProfileContainer}>
        <SuggestedProfile />
      </View>

      {/* Footer/Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

export default HomeScreen;
