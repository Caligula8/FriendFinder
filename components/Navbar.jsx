import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const NavBar = () => {
  const navigation = useNavigation();

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Home")}
      >
        <AntDesign name="staro" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Home")}
      >
        <AntDesign name="profile" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("Chats")}
      >
        <Ionicons name="chatbubbles-outline" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleButtonPress("MyProfile")}
      >
        <Ionicons name="person-outline" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 2,
    borderTopColor: "#ccc",
    paddingVertical: 10,
    height: 70,
  },
  button: {
    flex: 1,
    alignItems: "center",
  },
});

export default NavBar;
