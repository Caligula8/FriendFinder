import React from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NavBar from "../components/Navbar";
import { globalStyles } from "../styles/globalStyles";
import HobbyCategory from "../components/HobbyCategory";

const BrowseCategoriesScreen = () => {
  const navigation = useNavigation();
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
  ];

  const handleCategoryPress = (category) => {
    navigation.navigate("Posts", { categoryName: category });
  };

  const handleSelectHobbies = () => {
    // navigation.navigate("Register3");
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={globalStyles.hideStatusBarHeader} />
      <ScrollView>
        {/* Header */}
        <View style={ggg.headerContainer}>
          <View style={ggg.titleContainer}>
            <Text style={globalStyles.title}>Discover Categories</Text>
          </View>
          <TouchableOpacity
            style={ggg.headerIconContainerRight}
            onPress={handleSelectHobbies}
          >
            <MaterialCommunityIcons name="tune" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* Content */}
        <View style={ggg.contentContainer}>
          {categories.map((category, index) => (
            <View key={index.toString()} style={ggg.itemContainer}>
              <HobbyCategory
                category={category}
                onPress={() => handleCategoryPress(category)}
              />
            </View>
          ))}
        </View>
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
    flexGrow: 1,
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  itemContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerContainer: {
    width: "100%",
    height: 82,
  },
  titleContainer: {
    flexDirection: "column",
    marginLeft: 24,
    position: "absolute",
    top: 47,
  },
  headerIconContainerRight: {
    position: "absolute",
    top: 47,
    right: 28,
  },
});

export default BrowseCategoriesScreen;
