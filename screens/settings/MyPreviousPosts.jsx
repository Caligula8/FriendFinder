import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavBar from "../../components/Navbar";
import PostCard from "../../components/PostCard";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/globalStyles";
import { useSelector } from "react-redux";
import { firestoreDB } from "../../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";

const MyPosts = () => {
  const navigation = useNavigation();
  const currentUserID = useSelector((state) => state.user.user._id);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const userProfileRef = doc(firestoreDB, "users", currentUserID);
        const userProfileSnapshot = await getDoc(userProfileRef);

        if (userProfileSnapshot.exists()) {
          const userPostsPaths = userProfileSnapshot.data().posts || [];
          const postsData = await Promise.all(
            userPostsPaths.map((postPath) => {
              const postRef = doc(firestoreDB, postPath);
              return getDoc(postRef);
            })
          );

          const userPosts = postsData
            .filter((docSnapshot) => docSnapshot.exists())
            .map((docSnapshot) => ({
              id: docSnapshot.id,
              ...docSnapshot.data(),
            }));

          setPosts(userPosts);
        } else {
          console.log("No user profile found.");
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, [currentUserID]);

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
          <Text style={globalStyles.title}>My Created Posts</Text>
        </View>
      </View>

      {/* Content */}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : posts.length > 0 ? (
        <ScrollView style={styles.contentContainer}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              timestamp={post.timestamp}
              onPress={() => {
                navigation.navigate("FullScreenPost", {
                  postId: post.id,
                });
              }}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.centeredMessageContainer}>
          <Text style={styles.centeredMessageText}>No Posts Yet</Text>
        </View>
      )}

      {/* Footer & Navbar */}
      <View style={globalStyles.footer}>
        <NavBar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 12,
  },
  centeredMessageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
  },
  centeredMessageText: {
    fontWeight: "bold",
    fontSize: 22,
  },
});

export default MyPosts;
