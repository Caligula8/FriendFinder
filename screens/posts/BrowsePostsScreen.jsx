import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import NavBar from "../../components/Navbar";
import PostCard from "../../components/PostCard";
import { globalStyles } from "../../styles/globalStyles";
import { doc, onSnapshot } from "firebase/firestore";
import { firestoreDB } from "../../config/firebase.config";

const BrowsePostsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const categoryName = route.params?.categoryName || "Default Category";
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const categoryRef = doc(firestoreDB, "posts", categoryName);

    // Listener setup
    const unsubscribe = onSnapshot(
      categoryRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const postSummaries = Object.entries(docSnapshot.data()).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );

          // Sort by timestamp
          postSummaries.sort(
            (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
          );
          setPosts(postSummaries);
        } else {
          console.log("No such document");
        }
      },
      (error) => {
        console.error("Error listening to post summaries: ", error);
      }
    );

    // Cleanup function unsubscribe on component unmount
    return () => unsubscribe();
  }, [categoryName]);

  const handleSearch = () => {
    //navigation.navigate("Register3");
  };
  const handleCreatePost = () => {
    navigation.navigate("CreatePost", { categoryName });
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
        {posts.map((postSummary) => {
          const postId = postSummary.reference?.id; // Use post ID from DocumentReference object/path
          return (
            <PostCard
              key={postId}
              title={postSummary.title}
              timestamp={postSummary.timestamp}
              onPress={() =>
                navigation.navigate("FullScreenPost", {
                  // Path constructed in FullScreenPost
                  postId: postId,
                  categoryName: categoryName,
                })
              }
            />
          );
        })}
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
});

export default BrowsePostsScreen;
