import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NavBar from "../components/Navbar";
import MessagePromptModal from "../components/MessagePromptModal";
import { globalStyles } from "../styles/globalStyles";

const ExpandedPostScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // Dummy image data
  const images = [
    {
      id: "1",
      uri: "https://cdn.elebase.io/dbcc75a2-4b9f-4a0e-8e4b-cfa273624e10/48d2fdcb-4240-45fb-a5ec-5904c6a79e3a-vtmafaafa49c8ff135ec.jpg",
    },
    {
      id: "2",
      uri: "https://townsquare.media/site/698/files/2023/05/attachment-RS47844_GettyImages-1090819944-scr-2.jpg?w=980&q=75",
    },
    {
      id: "3",
      uri: "https://dianeatwood.com/wp-content/uploads/2017/07/11903872_10153608145004489_4489792579975984556_n.jpg",
    },
  ];

  return (
    <View style={globalStyles.pageContainer}>
      <View style={ggg.hideStatusBarHeader} />
      {/* Header */}
      <ScrollView style={ggg.contentContainer}>
        {/* Back Button */}
        <View style={ggg.postHeaderContainer}>
          <TouchableOpacity
            style={ggg.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back-outline" size={32} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={ggg.optionsButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="dots-vertical"
              size={32}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {/* Content */}
        <View style={ggg.subContentContainer}>
          {/* Title */}
          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Title</Text>
            <Text style={ggg.text}>The five boxing wizards jump quickly</Text>
          </View>
          {/* Text Body */}
          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Body</Text>
            <Text style={ggg.text}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
          {/* Images */}
          <View style={ggg.postElementContainer}>
            <View style={ggg.postImagesContainer}>
              {images.map((item) => (
                <Image
                  key={item.id}
                  source={{ uri: item.uri }}
                  style={ggg.image}
                  resizeMode="cover"
                />
              ))}
            </View>
          </View>
          {/* Author */}
          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Author</Text>
            <Text style={ggg.text}>Somebody</Text>
          </View>
          {/* Tags */}
          <View style={ggg.postElementContainer}>
            <Text style={ggg.subTitle}>Tags</Text>
            <Text style={ggg.text}>Hiking, Rock Climbing</Text>
          </View>
        </View>
        <View style={ggg.postFooter} />
      </ScrollView>

      <TouchableOpacity
        style={ggg.postOpenChatPromptButton}
        onPress={toggleModal}
      >
        <Ionicons name="chatbubbles-outline" size={32} color="white" />
      </TouchableOpacity>

      <MessagePromptModal
        isVisible={isModalVisible}
        onClose={toggleModal}
        onSend={(messageData) => {
          // Add logic for sending the message
          console.log("Sending message to:", messageData.recipient);
          console.log("Message content:", messageData.message);
        }}
        recipientUsername="Username" // Replace with recipient
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
  postOpenChatPromptButton: {
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
});

export default ExpandedPostScreen;
