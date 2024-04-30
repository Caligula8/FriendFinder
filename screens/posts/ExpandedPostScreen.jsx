import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import NavBar from "../../components/Navbar";
import MessagePromptModal from "../../components/MessagePromptModal";
import ThreeDotsMenu from "../../components/ThreeDotsMenu";
import { globalStyles } from "../../styles/globalStyles";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../../config/firebase.config";

const { height } = Dimensions.get("window");

const ExpandedPostScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const postRefPath = route.params?.postRefPath;
  const { postId, categoryName } = route.params;
  const [post, setPost] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [iconLayout, setIconLayout] = useState(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!postId || !categoryName) {
        console.error("Post ID or Category Name is missing");
        return;
      }

      const postRefPath = `posts/${categoryName}/content/${postId}`;

      try {
        const postRef = doc(firestoreDB, postRefPath);
        const docSnapshot = await getDoc(postRef);
        if (docSnapshot.exists()) {
          //console.log("Fetched post data:", docSnapshot.data());
          setPost(docSnapshot.data());
        } else {
          console.log(`No post found at path: ${postRefPath}`);
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [postId, categoryName]);

  const handleBlockUser = () => {
    console.log("Blocking user...");
  };

  const handleReportUser = () => {
    console.log("Reporting user...");
  };

  const handleViewProfile = () => {
    if (post && post.authorID) {
      const authorUID = post.authorID.id;
      navigation.navigate("SelectedPublicProfile", { userID: authorUID });
    } else {
      console.error("Author ID is missing or invalid");
    }
  };

  const handleDeletePost = () => {
    console.log("Deleting post...");
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const menuOptionHandlers = {
    1: handleBlockUser,
    2: handleReportUser,
    3: handleViewProfile,
    4: handleDeletePost,
  };

  const onOptionSelect = (value) => {
    menuOptionHandlers[value]();
    setMenuOpen(false);
  };

  const onTriggerPress = () => {
    if (iconRef.current) {
      iconRef.current.measure((x, y, width, height, pageX, pageY) => {
        setIconLayout({ x: pageX, y: pageY, width, height });
      });
    }
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <View style={globalStyles.pageContainer}>
      <View style={ggg.hideStatusBarHeader} />
      {/* Header */}
      <ScrollView style={ggg.contentContainer}>
        <View style={ggg.postHeaderContainer}>
          {/* Back Button */}
          <TouchableOpacity
            style={ggg.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
          {/* Options Button */}
          <TouchableOpacity
            ref={iconRef}
            onPress={onTriggerPress}
            style={ggg.optionsButton}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={32}
              color="black"
            />
          </TouchableOpacity>
          {/* Options Menu */}
          <ThreeDotsMenu
            isVisible={isMenuOpen}
            onOptionSelect={onOptionSelect}
            iconLayout={iconLayout}
          />
          {/* Overlay */}
          {isMenuOpen && (
            <TouchableWithoutFeedback onPress={closeMenu}>
              <View style={ggg.overlay} />
            </TouchableWithoutFeedback>
          )}
        </View>
        {/* Content */}
        <View style={ggg.subContentContainer}>
          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Title</Text>
            {post?.title && <Text style={ggg.text}>{post.title}</Text>}
          </View>

          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Body</Text>
            {post?.content && <Text style={ggg.text}>{post.content}</Text>}
          </View>

          {post?.images?.length > 0 && (
            <View style={ggg.postElementContainer}>
              <Text style={ggg.subTitle}>Images</Text>
              <View style={ggg.postImagesContainer}>
                {post.images.map((imageUrl, index) => (
                  <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={ggg.image}
                    resizeMode="cover"
                  />
                ))}
              </View>
            </View>
          )}

          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Author</Text>
            {post?.author && <Text style={ggg.text}>{post.author}</Text>}
          </View>

          {post?.tags?.length > 0 && (
            <View style={ggg.postElementContainer}>
              <Text style={ggg.subTitle}>Tags</Text>
              <Text style={ggg.text}>{post.tags.join(", ")}</Text>
            </View>
          )}
        </View>
        <View style={ggg.postFooter} />
      </ScrollView>

      {/* Open Chat Prompt Button */}
      <TouchableOpacity style={ggg.openChatPromptButton} onPress={toggleModal}>
        <Ionicons name="chatbubbles-outline" size={32} color="white" />
      </TouchableOpacity>

      {/* MessagePromptModal */}
      <MessagePromptModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSend={(messageData) => {
          console.log("Sending message to:", messageData.recipient);
          console.log("Message content:", messageData.message);
        }}
        recipientUsername={post?.author || "This User"}
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
    flex: 1,
  },
  subContentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  postElementContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
    marginTop: 12,
  },
  postImagesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 12,
  },
  image: {
    width: 100,
    height: 160,
    marginRight: 8,
    borderRadius: 8,
  },
  subTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#080808",
  },
  text: {
    fontSize: 18,
    fontWeight: "normal",
    color: "#8D8D8D",
  },
  postHeaderContainer: {
    width: "100%",
    height: 42,
  },
  hideStatusBarHeader: {
    width: "100%",
    height: 28,
  },
  postFooter: {
    width: "100%",
    height: 85,
  },
  backButton: {
    position: "absolute",
    top: 7,
    left: 16,
  },
  optionsButton: {
    position: "absolute",
    top: 7,
    right: 16,
  },
  openChatPromptButton: {
    position: "absolute",
    bottom: 85,
    right: 25,
    width: 75,
    height: 75,
    borderRadius: 100,
    backgroundColor: "#74A253",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height,
    backgroundColor: "transparent",
    zIndex: 1,
  },
});

export default ExpandedPostScreen;
