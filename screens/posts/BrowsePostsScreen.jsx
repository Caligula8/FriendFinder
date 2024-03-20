import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import NavBar from "../../components/Navbar";
import PostCard from "../../components/PostCard";
import { globalStyles } from "../../styles/globalStyles";

const BrowsePostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryName = route.params?.categoryName || "Default Category";

  const handleSearch = () => {
    //navigation.navigate("Register3");
  };
  const handleCreatePost = () => {
    navigation.navigate("CreatePost");
  };
  const handleSelectedPost = () => {
    navigation.navigate("FullScreenPost");
  };

  return (
    <View style={globalStyles.pageContainer}>
      {/* Header */}
      <View style={globalStyles.header}>
        <View style={globalStyles.backButtonContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
        </View>
        {/* Header Title */}
        <View style={globalStyles.titleContainer}>
          <Text style={globalStyles.title}>
            Discover Posts:{"\n"}
            {categoryName}
          </Text>
        </View>
        {/* Header Icons */}
        <TouchableOpacity
          style={globalStyles.headerIconContainerLeft}
          onPress={handleCreatePost}
        >
          <MaterialIcons name="post-add" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={globalStyles.headerIconContainerRight}
          onPress={handleSearch}
        >
          <Ionicons name="search" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView style={ggg.contentContainer}>
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
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
    marginTop: 36,
  },
  pageBodyContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default BrowsePostsScreen;
