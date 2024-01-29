import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
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

  const renderCategory = ({ item }) => (
    <View style={ggg.itemContainer}>
      <HobbyCategory
        category={item}
        onPress={() => handleCategoryPress(item)}
      />
    </View>
  );

  const handleCategoryPress = (category) => {
    navigation.navigate("Posts", { categoryName: category });
  };
  const handleSelectHobbies = () => {
    //navigation.navigate("Register3");
  };

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <View style={globalStyles.header}>
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>Discover Categories</Text>
        </View>
        <TouchableOpacity
          style={globalStyles.headerIconContainerRight}
          onPress={handleSelectHobbies}
        >
          <MaterialCommunityIcons name="tune" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={ggg.contentContainer}
      />

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
  },
  itemContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 16,
  },
});

export default BrowseCategoriesScreen;
